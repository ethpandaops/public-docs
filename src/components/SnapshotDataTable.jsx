import React, { useEffect, useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

// Add CSS-in-JS styles for the loading spinner
const styles = {
  loadingContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '5px solid white',
    borderRadius: '50%',
    borderTopColor: 'var(--tw-prose-links, #3182ce)',
    animation: 'spin 1s linear infinite',
    margin: '20px auto',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

// Add global style for the keyframes animation
const injectGlobalStyles = () => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }
  return () => {};
};

export default function SnapshotDataTable({ network }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [networkData, setNetworkData] = useState(null);

  // Inject global styles on mount
  useEffect(() => {
    const cleanup = injectGlobalStyles();
    return cleanup;
  }, []);

  const networks = ["mainnet", "sepolia", "hoodi", "holesky"];
  const clients = ["besu", "erigon", "geth", "nethermind", "reth"];

  // Ensure we have a valid network
  const validNetwork = network && networks.includes(network) ? network : "mainnet";

  async function fetchWithCheck(url) {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    return 'just now';
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  function formatBytes(bytes) {
    if (!bytes) return 'N/A';
    if (bytes === 0) return '0 GB';
    return Math.round(bytes / Math.pow(1024, 3), 2) + ' GB';
  }

  async function fetchNetworkData(network) {
    try {
      let results = { 
        network, 
        display: network.charAt(0).toUpperCase() + network.slice(1),
        blockNumbers: [],
        clientData: [],
        allSame: true 
      };

      // Fetch block data for all clients in parallel
      const blockDataPromises = clients.map(async client => {
        try {
          const blockData = await fetchWithCheck(`https://snapshots.ethpandaops.io/${network}/${client}/latest/_snapshot_eth_getBlockByNumber.json`);
          const blockNumber = blockData.result.number ? parseInt(blockData.result.number, 16).toString() : "N/A";
          const blockHash = blockData.result.hash || "N/A";
          return { client, blockData, blockNumber, blockHash };
        } catch (error) {
          console.error(`Error fetching block data for ${client}: ${error}`);
          return { client, error: true };
        }
      });

      const blockResults = await Promise.all(blockDataPromises);

      blockResults.forEach(result => {
        if (!result.error) {
          results.blockNumbers.push({number: result.blockNumber, hash: result.blockHash});
          if (results.blockNumbers.length > 1 && 
              (results.blockNumbers[0].number !== result.blockNumber || 
               results.blockNumbers[0].hash !== result.blockHash)) {
            results.allSame = false;
          }
        } else {
          results.blockNumbers.push({number: "N/A", hash: "N/A"});
          results.allSame = false;
        }
      });

      // Fetch detailed data for all clients in parallel
      const clientDataPromises = clients.map(async (client, index) => {
        try {
          const [blockData, clientVersionData] = await Promise.all([
            fetchWithCheck(`https://snapshots.ethpandaops.io/${network}/${client}/latest/_snapshot_eth_getBlockByNumber.json`),
            fetchWithCheck(`https://snapshots.ethpandaops.io/${network}/${client}/latest/_snapshot_web3_clientVersion.json`)
          ]);

          const blockNumber = blockData.result.number ? parseInt(blockData.result.number, 16).toString() : "N/A";
          const blockHash = blockData.result.hash ? blockData.result.hash.slice(0, 8) : "N/A";
          const timestampUnix = blockData.result.timestamp ? parseInt(blockData.result.timestamp, 16) * 1000 : null;
          const timestamp = timestampUnix ? formatDate(timestampUnix) : "N/A";
          const timeAgoStr = timestampUnix ? timeAgo(new Date(timestampUnix)) : "N/A";

          const clientVersion = clientVersionData.result || "unknown";
          const clientVersionUrl = `https://snapshots.ethpandaops.io/${network}/${client}/latest/_snapshot_web3_clientVersion.json`;
          const explorerUrl = `https://${network === "mainnet" ? "" : network + "."}etherscan.io/block/${blockNumber}`;
          const downloadUrl = `https://snapshots.ethpandaops.io/${network}/${client}/latest/snapshot.tar.zst`;

          // Fetch file size
          let fileSize = 'N/A';
          try {
            const response = await fetch(downloadUrl, { method: 'HEAD' });
            if (response.ok) {
              fileSize = formatBytes(response.headers.get('content-length'));
            }
          } catch (error) {
            console.error(`Error fetching file size for ${client}: ${error}`);
          }

          return {
            client,
            blockNumber,
            blockHash,
            timestamp,
            timeAgoStr,
            clientVersion,
            clientVersionUrl,
            explorerUrl,
            downloadUrl,
            fileSize
          };
        } catch (error) {
          console.error(`Error fetching data for ${client}: ${error}`);
          return {
            client,
            error: true
          };
        }
      });

      results.clientData = await Promise.all(clientDataPromises);
      return results;
    } catch (error) {
      console.error(`Error fetching network data for ${network}:`, error);
      return { network, error: true };
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchNetworkData(validNetwork);
        setNetworkData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [validNetwork]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p>Loading snapshot data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{color: 'red', textAlign: 'center', padding: '20px'}}>
        Error loading data: {error}. Please try again later.
      </div>
    );
  }

  if (!networkData) {
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        No data available for this network.
      </div>
    );
  }

  return (
    <div className="snapshot-tab-content">
      {!networkData.allSame && (
        <div style={{
          backgroundColor: '#e85d04',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <strong>Warning:</strong> Not all client snapshots are at the same block height. Some may be more outdated than others.
        </div>
      )}
      
      <div className="snapshot-table-container">
        <table className="snapshot-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Block #</th>
              <th>Time</th>
              <th>Size</th>
              <th>Version</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {networkData.clientData.map((client, idx) => (
              client.error ? (
                <tr key={idx}>
                  <td style={{textTransform: 'capitalize', fontWeight: '500'}}>{client.client}</td>
                  <td colSpan="5" style={{color: 'var(--ifm-color-danger)', fontStyle: 'italic'}}>
                    Data not available
                  </td>
                </tr>
              ) : (
                <tr key={idx}>
                  <td style={{textTransform: 'capitalize', fontWeight: '500'}}>{client.client}</td>
                  <td>
                    <a href={client.explorerUrl} target="_blank" rel="noopener noreferrer" style={{
                      color: 'var(--ifm-color-primary)',
                      textDecoration: 'none'
                    }}>
                      {client.blockNumber} 
                      <span style={{color: 'var(--ifm-color-emphasis-600)', fontSize: '0.85em'}}> ({client.blockHash}...)</span>
                    </a>
                  </td>
                  <td>
                    {client.timestamp} 
                    <div style={{fontSize: '0.85em', color: 'var(--ifm-color-emphasis-600)'}}>{client.timeAgoStr}</div>
                  </td>
                  <td>{client.fileSize}</td>
                  <td>
                    <a href={client.clientVersionUrl} target="_blank" rel="noopener noreferrer" style={{
                      color: 'var(--ifm-color-primary)',
                      textDecoration: 'none',
                      fontSize: '0.85em',
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%'
                    }}>
                      {client.clientVersion.length > 40 
                        ? client.clientVersion.substring(0, 40) + '...' 
                        : client.clientVersion}
                    </a>
                  </td>
                  <td>
                    <a 
                      href={client.downloadUrl} 
                      className="button button--primary button--sm" 
                      style={{
                        fontSize: '0.85em',
                        padding: '6px 12px',
                        whiteSpace: 'nowrap',
                        fontWeight: '500',
                        float: 'right'
                      }}
                    >
                      Download
                    </a>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
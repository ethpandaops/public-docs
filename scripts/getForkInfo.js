const https = require('https');
const fs = require('fs');
const path = require('path');

// URL to fetch Ethereum network config from The Lab
const LAB_CONFIG_URL = 'https://lab-api.primary.production.platform.ethpandaops.io/lab-data/config.json';

// Function to fetch data from URL
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error('Error parsing JSON: ' + error.message));
        }
      });
    }).on('error', (error) => {
      reject(new Error('Error fetching data: ' + error.message));
    });
  });
}

// Function to get network fork announcements
function getNextForkAnnouncement(labData) {
  try {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const networks = labData.ethereum.networks;
    
    let nextForks = [];
    
    // Loop through networks
    for (const [network, networkData] of Object.entries(networks)) {
      // Skip testnets if not needed
      if (network !== 'mainnet') continue;
      
      // Check all consensus layer forks
      if (networkData.forks && networkData.forks.consensus) {
        for (const [forkName, forkData] of Object.entries(networkData.forks.consensus)) {
          // Skip if no epoch information
          if (!forkData.epoch) continue;
          
          // Calculate approximate fork time (genesis time + epoch * seconds per epoch)
          const secondsPerEpoch = 32 * 12; // 32 slots per epoch * 12 seconds per slot
          const estimatedForkTime = networkData.genesis_time + (forkData.epoch * secondsPerEpoch);
          
          // If fork is in the future, add to our list
          if (estimatedForkTime > now) {
            const forkDate = new Date(estimatedForkTime * 1000);
            const formattedDate = forkDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            nextForks.push({
              network,
              name: forkName,
              time: estimatedForkTime,
              formattedDate,
              epoch: forkData.epoch
            });
          }
        }
      }
    }
    
    // Sort forks by time (earliest first)
    nextForks.sort((a, b) => a.time - b.time);
    
    // If we have any upcoming forks, return announcement for the next one
    if (nextForks.length > 0) {
      const nextFork = nextForks[0];
      return {
        content: `Ethereum ${capitalize(nextFork.network)} ${capitalize(nextFork.name)} fork coming on ${nextFork.formattedDate}. 🎉 Get prepared with ethPandaOps tools!`,
        backgroundColor: '#00a550',
        textColor: '#fff'
      };
    }
    
    // Default announcement if no upcoming forks found
    return {
      content: 'Get prepared for upcoming Ethereum network upgrades with ethPandaOps tools! 🎉',
      backgroundColor: '#00a550',
      textColor: '#fff'
    };
  } catch (error) {
    console.error('Error processing fork data:', error);
    // Fallback announcement
    return {
      content: 'Explore Ethereum infrastructure tools by ethPandaOps! 🐼',
      backgroundColor: '#00a550',
      textColor: '#fff'
    };
  }
}

// Helper function to capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Main function
async function main() {
  try {
    // Fetch data from The Lab
    const labData = await fetchData(LAB_CONFIG_URL);
    
    // Get announcement for next fork
    const announcement = getNextForkAnnouncement(labData);
    
    // Save to file for docusaurus.config.ts to use
    const outputPath = path.join(__dirname, '..', 'announcement-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(announcement, null, 2));
    
    console.log('Announcement data saved:', announcement.content);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run script
main(); 
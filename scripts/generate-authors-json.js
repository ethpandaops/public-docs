const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Path to authors.yml in the blog directory
const authorsYamlPath = path.join(__dirname, '../blog/authors.yml');
// Path to output authors.json in the static/data directory
const outputDir = path.join(__dirname, '../static/data');
const authorsJsonPath = path.join(outputDir, 'authors.json');

// Read the YAML file
try {
  console.log('Reading authors from:', authorsYamlPath);
  const yamlContent = fs.readFileSync(authorsYamlPath, 'utf8');
  const authorsData = yaml.load(yamlContent);

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created directory:', outputDir);
  }

  // Write the JSON file
  fs.writeFileSync(authorsJsonPath, JSON.stringify(authorsData, null, 2));
  console.log('Generated authors.json successfully at:', authorsJsonPath);
} catch (error) {
  console.error('Error generating authors.json:', error);
  process.exit(1);
} 
const fs = require('fs');
const path = require('path');

const swaggerSpec = require('../config/swagger');

const outputPath = path.join(__dirname, '../docs/openapi.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify(swaggerSpec, null, 2)
);

console.log('✅ OpenAPI specification generated successfully!');
console.log(`Saved to: ${outputPath}`);
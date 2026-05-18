// scripts/generate-pdf-list.js
const fs = require('fs');
const path = require('path');

const pdfDirectory = path.join(process.cwd(), 'public', 'Test Dictionary');
const outputPath = path.join(process.cwd(), 'data', 'pdf-list.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Check if PDF directory exists
if (!fs.existsSync(pdfDirectory)) {
  console.log('⚠️ PDF directory not found, creating empty list');
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  console.log('✅ Created empty PDF list for production');
  process.exit(0);
}

try {
  const files = fs.readdirSync(pdfDirectory)
    .filter(file => file.toLowerCase().endsWith('.pdf'))
    .map(file => ({
      name: path.basename(file, '.pdf'),
      fileName: file,
      path: `/Test Dictionary/${file}`,
      displayName: path.basename(file, '.pdf').replace(/[-_]/g, ' ').toUpperCase()
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2));
  console.log(`✅ Generated PDF list with ${files.length} files`);
} catch (error) {
  console.error('❌ Error generating PDF list:', error);
  // Create empty list as fallback
  fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
  process.exit(0); // Exit with success to allow build to continue
}
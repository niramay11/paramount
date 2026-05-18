// utils/getPdfFiles.ts
import fs from 'fs';
import path from 'path';

export interface PdfFile {
  name: string;
  fileName: string;
  path: string;
  displayName: string;
}

export async function getPdfFiles(): Promise<PdfFile[]> {
  try {
    const pdfDirectory = path.join(process.cwd(), 'public', 'Test Dictionary');
    const files = fs.readdirSync(pdfDirectory)
      .filter(file => file.toLowerCase().endsWith('.pdf'))
      .map(file => {
        const baseName = path.basename(file, '.pdf');
        return {
          name: baseName,
          fileName: file,
          path: `/Test Dictionary/${file}`,
          displayName: baseName.replace(/[-_]/g, ' ').toUpperCase()
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    return files;
  } catch (error) {
    console.error('Error reading PDF directory:', error);
    return [];
  }
}
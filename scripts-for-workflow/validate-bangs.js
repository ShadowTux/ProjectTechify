#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BANG_FILE_PATH = path.join(__dirname, '..', 'src', 'bang.ts');

/**
 * Validate the bang.ts file
 */
function validateBangFile() {
  try {
    console.log('Validating bang.ts file...');
    
    // Check if file exists
    if (!fs.existsSync(BANG_FILE_PATH)) {
      throw new Error('bang.ts file not found');
    }
    
    // Read the file
    const content = fs.readFileSync(BANG_FILE_PATH, 'utf8');
    
    // Check if it's a valid TypeScript file
    if (!content.includes('export const bangs = [')) {
      throw new Error('File does not contain "export const bangs = ["');
    }
    
    if (!content.includes('];')) {
      throw new Error('File does not end with "];"');
    }
    
    // Count the bangs
    const bangMatches = content.match(/\{\s*t:\s*"[^"]+"/g);
    if (!bangMatches) {
      throw new Error('No bang entries found');
    }
    
    const bangCount = bangMatches.length;
    console.log(`Found ${bangCount} bang entries`);
    
    // Check for basic structure
    if (bangCount < 100) {
      console.warn('Warning: Very few bangs found. This might indicate an issue.');
    }
    
    // Validate a few entries
    const lines = content.split('\n');
    let validEntries = 0;
    let invalidEntries = 0;
    
    for (const line of lines) {
      if (line.trim().startsWith('t: "')) {
        // Check if this entry has all required fields
        const hasT = line.includes('t: "');
        const hasS = content.includes('s: "', content.indexOf(line));
        const hasU = content.includes('u: "', content.indexOf(line));
        const hasD = content.includes('d: "', content.indexOf(line));
        
        if (hasT && hasS && hasU && hasD) {
          validEntries++;
        } else {
          invalidEntries++;
        }
      }
    }
    
    console.log(`Valid entries: ${validEntries}`);
    if (invalidEntries > 0) {
      console.warn(`Warning: ${invalidEntries} potentially invalid entries found`);
    }
    
    console.log('✅ bang.ts file validation passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  const isValid = validateBangFile();
  process.exit(isValid ? 0 : 1);
}

// Run the script
main();

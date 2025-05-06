// This is a Node.js script to help you place your SVG files in the letters folder
// To use this script:
// 1. Install Node.js if you don't have it already
// 2. Place your SVG files in a folder on your computer
// 3. Update the SOURCE_FOLDER variable below to point to that folder
// 4. Run this script using: node place_svgs.js

const fs = require('fs');
const path = require('path');

// CHANGE THIS: Set this to the folder where your SVG files are located
const SOURCE_FOLDER = 'C:/Path/To/Your/SVG/Files';
const TARGET_FOLDER = path.join(__dirname, 'letters');

// Make sure the letters directory exists
if (!fs.existsSync(TARGET_FOLDER)) {
  fs.mkdirSync(TARGET_FOLDER, { recursive: true });
  console.log(`Created letters directory at: ${TARGET_FOLDER}`);
}

// Function to copy SVG files
function copyFiles() {
  try {
    // Read source directory
    const files = fs.readdirSync(SOURCE_FOLDER);
    
    // Filter to only include SVG files
    const svgFiles = files.filter(file => 
      file.toLowerCase().endsWith('.svg') || file.toLowerCase().endsWith('.svgz')
    );
    
    if (svgFiles.length === 0) {
      console.log('No SVG files found in the source folder.');
      return;
    }
    
    // Copy each SVG file to the letters folder
    svgFiles.forEach(file => {
      const sourceFile = path.join(SOURCE_FOLDER, file);
      const targetFile = path.join(TARGET_FOLDER, file);
      
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`Copied: ${file}`);
    });
    
    console.log(`\nSuccessfully copied ${svgFiles.length} SVG files to the letters folder.`);
    console.log(`You can now use these SVG files in your lab report cover page creator.`);
    
  } catch (error) {
    console.error('Error copying SVG files:', error.message);
  }
}

console.log('SVG File Placement Helper');
console.log('========================');
console.log(`Source folder: ${SOURCE_FOLDER}`);
console.log(`Target folder: ${TARGET_FOLDER}`);
console.log('');

// Check if source folder exists
if (!fs.existsSync(SOURCE_FOLDER)) {
  console.error(`ERROR: Source folder does not exist: ${SOURCE_FOLDER}`);
  console.log('Please update the SOURCE_FOLDER variable in this script to point to your SVG files.');
} else {
  copyFiles();
} 
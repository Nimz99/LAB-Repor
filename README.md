# Lab Report Cover Page Creator

This web application allows you to create custom lab report cover pages using custom SVG letters.

## Features

- Real-time display of custom SVG letters as you type
- 1mm spacing between letters
- Download options as PNG or PDF
- Responsive design
- Support for custom SVG naming patterns

## How to Use

1. Open `index.html` in your web browser
2. Type your text in the input field
3. The custom SVG letters will display below
4. Click the "Download as PNG" or "Download as PDF" button to save your cover page

## Adding Your SVG Files

### Method 1: Using the Copy Helper (Windows)

1. Double-click `copy_svgs.bat` to run it
2. Enter the full path to the folder containing your SVG files
3. The script will copy all SVG files to the `letters/` folder

### Method 2: Manual Copying

1. Create a `letters` folder in the project directory (if it doesn't exist)
2. Copy your SVG files to the `letters` folder

### Supported SVG Naming Formats

The app now supports multiple SVG file naming formats:

- `A-10.SVG`, `B-10.SVG`, etc. (your custom format)
- `A.svg`, `B.svg`, etc. (standard format)

The app will try to load your custom format first, then fall back to the standard format if needed.

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Uses html2canvas for PNG export
- Uses jsPDF for PDF export

## Deployment

### Vercel Deployment

This application is ready to be deployed on Vercel. To deploy:

1. Push this repository to GitHub (repository name: LAB-Repor)
2. Visit [Vercel](https://vercel.com) and sign in with your GitHub account
3. Click "New Project" and select the GitHub repository
4. Vercel will automatically detect the correct settings for the static site
5. Click "Deploy" to publish your application

## Requirements

- Modern web browser with JavaScript enabled
- No server-side components required 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main script loaded');
    
    const studentName = document.getElementById('student-name');
    const regNumber = document.getElementById('reg-number');
    const groupNumber = document.getElementById('group-number');
    const semester = document.getElementById('semester');
    const date = document.getElementById('date');
    
    const downloadPngBtn = document.getElementById('download-png');
    const downloadPdfBtn = document.getElementById('download-pdf');
    
    // Opacity control slider
    const opacitySlider = document.getElementById('opacity-slider');
    const opacityValue = document.getElementById('opacity-value');
    
    // Function to handle opacity changes
    function updateOpacity(value) {
        // Convert to decimal for CSS
        const opacityDecimal = value / 100;
        console.log(`Updating opacity to ${value}% (${opacityDecimal} decimal)`);
        
        // Target all elements with the opacity-controlled class
        const opacityControlledElements = document.querySelectorAll('.opacity-controlled');
        console.log(`Found ${opacityControlledElements.length} opacity-controlled elements`);
        opacityControlledElements.forEach(element => {
            element.style.opacity = opacityDecimal;
        });
        
        // Also update specific element types for backward compatibility
        
        // Update SVG letters (both direct and through container)
        const allLetterContainers = document.querySelectorAll('.letter-container');
        console.log(`Found ${allLetterContainers.length} letter containers`);
        allLetterContainers.forEach(container => {
            container.style.opacity = opacityDecimal;
        });
        
        // Update letter SVGs if they exist
        const allLetterSvgs = document.querySelectorAll('.letter-svg');
        console.log(`Found ${allLetterSvgs.length} letter SVGs`);
        allLetterSvgs.forEach(svg => {
            svg.style.opacity = opacityDecimal;
        });
        
        // Update all underlines
        const allUnderlines = document.querySelectorAll('.underline-wrapper div');
        console.log(`Found ${allUnderlines.length} underlines`);
        allUnderlines.forEach(underline => {
            underline.style.opacity = opacityDecimal;
        });
        
        // Update all SVG images directly
        const allSvgImages = document.querySelectorAll('.letter-container img');
        console.log(`Found ${allSvgImages.length} SVG images`);
        allSvgImages.forEach(img => {
            img.style.opacity = opacityDecimal;
        });
        
        // Also try to update letter wrapper
        const allLetterWrappers = document.querySelectorAll('.letter-wrapper');
        console.log(`Found ${allLetterWrappers.length} letter wrappers`);
        allLetterWrappers.forEach(wrapper => {
            wrapper.style.opacity = opacityDecimal;
        });
        
        // Update border of cover page inner
        const coverPageInner = document.querySelector('.cover-page-inner');
        if (coverPageInner) {
            coverPageInner.style.borderColor = `rgba(0, 0, 0, ${opacityDecimal})`;
            console.log('Updated cover page border opacity');
        }
        
        // Update the displayed value
        if (opacityValue) {
            opacityValue.textContent = value;
        }
        
        // Set a global CSS variable for opacity
        document.documentElement.style.setProperty('--text-opacity', opacityDecimal);
        
        console.log(`Opacity update complete to ${value}%`);
    }
    
    // Add event listener for opacity slider
    if (opacitySlider) {
        console.log('Adding opacity slider event listener');
        
        // Use immediate function to ensure event is properly bound
        (function() {
            // Log the initial properties of the slider
            console.log(`Opacity slider: min=${opacitySlider.min}, max=${opacitySlider.max}, value=${opacitySlider.value}, step=${opacitySlider.step}`);
            
            // Ensure we have proper values
            if (!opacitySlider.value) opacitySlider.value = "100";
            if (!opacitySlider.min) opacitySlider.min = "10";
            if (!opacitySlider.max) opacitySlider.max = "100";
            if (!opacitySlider.step) opacitySlider.step = "5";
            
            // Try different event binding methods
            
            // Method 1: Traditional event listener
            opacitySlider.addEventListener('input', function() {
                console.log(`Slider input event: ${this.value}`);
                updateOpacity(this.value);
            });
            
            // Method 2: Direct property assignment
            opacitySlider.oninput = function() {
                console.log(`Slider oninput event: ${this.value}`);
                updateOpacity(this.value);
            };
            
            // Method 3: Change event
            opacitySlider.addEventListener('change', function() {
                console.log(`Slider change event: ${this.value}`);
                updateOpacity(this.value);
            });
            
            // Also bind to mouseup, mousedown, and click for more reliability
            opacitySlider.addEventListener('mouseup', function() {
                console.log(`Slider mouseup event: ${this.value}`);
                updateOpacity(this.value);
            });
        })();
        
        // Initialize with default value
        console.log(`Initial opacity set to ${opacitySlider.value}%`);
        setTimeout(function() {
            updateOpacity(opacitySlider.value);
        }, 500);
    } else {
        console.error('Opacity slider not found in the document');
        // If slider not found, still initialize the border with full opacity
        const coverPageInner = document.querySelector('.cover-page-inner');
        if (coverPageInner) {
            coverPageInner.style.borderColor = 'rgba(0, 0, 0, 1)';
        }
    }
    
    // Note: All text display is now handled in direct-load.js with SVG letters
    
    // Download as PNG
    if (downloadPngBtn) {
        downloadPngBtn.addEventListener('click', async function() {
            try {
                const coverPage = document.querySelector('.cover-page');
                const experimentTitle = document.getElementById('experiment-title');
                
                if (!experimentTitle || !experimentTitle.value) {
                    alert('Please enter a title for the experiment.');
                    return;
                }
                
                // Use html2canvas to convert cover page to canvas
                const canvas = await html2canvas(coverPage, {
                    backgroundColor: 'white',
                    scale: 2, // Higher quality
                    logging: false,
                    width: 210 * 3.78, // A4 width in pixels (210mm at 96 DPI)
                    height: 297 * 3.78 // A4 height in pixels (297mm at 96 DPI)
                });
                
                // Convert canvas to data URL
                const dataUrl = canvas.toDataURL('image/png');
                
                // Create download link
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'lab-cover-' + experimentTitle.value.replace(/\s+/g, '-') + '.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error generating PNG:', error);
                alert('There was an error generating the PNG. Please try again.');
            }
        });
    }
    
    // Download as PDF
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', async function() {
            try {
                const coverPage = document.querySelector('.cover-page');
                const experimentTitle = document.getElementById('experiment-title');
                
                if (!experimentTitle || !experimentTitle.value) {
                    alert('Please enter a title for the experiment.');
                    return;
                }
                
                // Use html2canvas to convert cover page to canvas
                const canvas = await html2canvas(coverPage, {
                    backgroundColor: 'white',
                    scale: 2, // Higher quality
                    logging: false,
                    width: 210 * 3.78, // A4 width in pixels (210mm at 96 DPI)
                    height: 297 * 3.78 // A4 height in pixels (297mm at 96 DPI)
                });
                
                // Create PDF with jsPDF
                const { jsPDF } = window.jspdf;
                const imgData = canvas.toDataURL('image/png');
                
                // A4 size in mm
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions in mm
                pdf.save('lab-cover-' + experimentTitle.value.replace(/\s+/g, '-') + '.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('There was an error generating the PDF. Please try again.');
            }
        });
    }
    
    console.log('Main script initialization complete');
}); 
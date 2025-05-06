document.addEventListener('DOMContentLoaded', () => {
    console.log('SVG Fix Script Loaded');
    
    // Override the title rendering function for better SVG handling
    window.fixAndRenderTitle = async function(text) {
        const titleContainer = document.getElementById('title-container');
        if (!titleContainer) {
            console.error("Title container not found!");
            return;
        }
        
        console.log(`Rendering title: "${text}"`);
        titleContainer.innerHTML = '';
        
        if (!text) {
            console.log("No text to render");
            return;
        }
        
        // Create a centered wrapper for title
        const titleWrapper = document.createElement('div');
        titleWrapper.style.display = 'inline-flex';
        titleWrapper.style.justifyContent = 'center';
        titleWrapper.style.alignItems = 'center';
        
        // Process each character
        for (const char of text) {
            // Handle spaces
            if (char === ' ') {
                const spaceDiv = document.createElement('div');
                spaceDiv.style.width = '5mm'; // Width for spaces
                titleWrapper.appendChild(spaceDiv);
                continue;
            }
            
            // Try to load SVG directly from file (not using fetch)
            const upperChar = char.toUpperCase();
            let svgFile = null;
            
            // Try each file pattern directly
            const filePatterns = [
                `${upperChar}-10.svg`,
                `${upperChar}-5.svg`,
                `${upperChar}-4.svg`
            ];
            
            // Create an img element to display the SVG
            const imgElement = document.createElement('img');
            imgElement.className = 'letter-svg-img';
            imgElement.alt = upperChar;
            
            // Try each pattern
            for (const pattern of filePatterns) {
                const src = `letters/${pattern}`;
                imgElement.src = src;
                
                // If one works, use it
                if (imgElement.complete) {
                    svgFile = src;
                    break;
                }
            }
            
            // If no file found, create a placeholder
            if (!svgFile) {
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'letter-svg placeholder';
                placeholderDiv.textContent = upperChar;
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.alignItems = 'center';
                placeholderDiv.style.width = '15mm';
                placeholderDiv.style.height = '20mm';
                placeholderDiv.style.backgroundColor = '#f0f0f0';
                placeholderDiv.style.fontSize = '18px';
                placeholderDiv.style.color = '#999';
                titleWrapper.appendChild(placeholderDiv);
            } else {
                // Create wrapper div for the SVG
                const letterDiv = document.createElement('div');
                letterDiv.className = 'letter-svg';
                
                // Set the img source
                imgElement.src = svgFile;
                imgElement.style.height = '100%';
                imgElement.style.width = 'auto';
                letterDiv.appendChild(imgElement);
                
                titleWrapper.appendChild(letterDiv);
            }
        }
        
        // Append the wrapper to the title container
        titleContainer.appendChild(titleWrapper);
    };
    
    // Hook into the experiment title input
    const experimentTitle = document.getElementById('experiment-title');
    if (experimentTitle) {
        experimentTitle.addEventListener('input', function() {
            window.fixAndRenderTitle(this.value.toUpperCase());
        });
        
        // Trigger initial render
        window.fixAndRenderTitle(experimentTitle.value.toUpperCase());
    }
}); 
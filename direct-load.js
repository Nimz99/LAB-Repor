// Define functions in global scope
let createSvgText, displayTitle, displayStudentNameWithSvgLetters, 
    displayGroupNumber, displayRegNumber, displaySemester, displayDate;

document.addEventListener('DOMContentLoaded', function() {
    console.log("Direct SVG loader initialized");
    
    // Helper function to get current opacity value
    function getCurrentOpacity() {
        const opacitySlider = document.getElementById('opacity-slider');
        return opacitySlider ? (opacitySlider.value / 100) : 1;
    }
    
    // Shared function to create SVG text using letter files
    createSvgText = function(text, height = '10mm', letterSpacing = '0.5mm', isTitle = false) {
        // Get current opacity setting
        const currentOpacity = getCurrentOpacity();
        console.log(`Creating text with opacity: ${currentOpacity}`);
        
        // Create letter wrapper to contain all letters with proper spacing
        const letterWrapper = document.createElement('div');
        letterWrapper.style.display = 'flex';
        letterWrapper.style.justifyContent = 'center';
        letterWrapper.style.alignItems = 'center';
        letterWrapper.className = 'letter-wrapper opacity-controlled';
        letterWrapper.style.opacity = currentOpacity;
        
        // Convert text to uppercase
        const upperText = text.toUpperCase();
        console.log(`Creating SVG text: ${upperText}`);
        
        // Process each character
        for (let i = 0; i < upperText.length; i++) {
            const char = upperText[i];
            
            // Skip non-alphanumeric characters or create space
            if (char === ' ') {
                const space = document.createElement('div');
                // Use exactly 1mm for spaces
                space.style.width = '1mm';
                space.style.height = '1px';
                letterWrapper.appendChild(space);
                continue;
            }
            
            // Create letter container
            const letterContainer = document.createElement('div');
            letterContainer.className = 'letter-container opacity-controlled';
            // Set exact 1mm spacing between all letters/symbols
            letterContainer.style.margin = `0 ${letterSpacing}`;
            letterContainer.style.height = height; // Height of letters
            letterContainer.style.display = 'inline-block';
            // Apply current opacity
            letterContainer.style.opacity = currentOpacity;
            
            // Try different file options
            const img = document.createElement('img');
            img.style.height = '100%';
            img.style.width = 'auto';
            img.alt = char;
            img.className = 'letter-img opacity-controlled';
            img.style.opacity = currentOpacity;
            
            // Full path with base URL for more reliable loading
            const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
            
            // Use different pattern for numbers vs letters
            let patterns = [];
            
            // Check if the character is a number (0-9)
            if (/^\d$/.test(char)) {
                // For numbers, use the simple format: 1.svg, 2.svg, etc.
                patterns = [
                    `letters/${char}.svg` // Simple format for numbers
                ];
            } else if (char === '/') {
                // Special case for date separator
                patterns = [
                    `letters/slash.svg` // Use the slash.svg file
                ];
            } else if (char === '.') {
                // Special case for period
                patterns = [
                    `letters/dot.svg` // Use the dot.svg file
                ];
                // Ensure exactly 1mm spacing for dots
                letterContainer.style.margin = `0 ${letterSpacing}`;
            } else if (char === ',') {
                // Special case for comma
                patterns = [
                    `letters/comma.svg` // Use the comma.svg file (if available)
                ];
                // Ensure exactly 1mm spacing for commas
                letterContainer.style.margin = `0 ${letterSpacing}`;
            } else {
                // For letters, use the standard pattern with suffixes
                patterns = [
                    `letters/${char}-4.svg`,  // Preferred first choice
                    `letters/${char}-5.svg`,
                    `letters/${char}-10.svg`
                ];
            }
            
            // Use onerror to try each pattern
            img.onerror = function() {
                if (patterns.length > 0) {
                    const nextPattern = patterns.shift();
                    console.log(`Trying: ${nextPattern}`);
                    img.src = baseUrl + nextPattern;
                } else {
                    // If all patterns fail, create a placeholder
                    img.style.display = 'none';
                    letterContainer.textContent = char;
                    letterContainer.style.backgroundColor = '#f0f0f0';
                    letterContainer.style.color = '#999';
                    letterContainer.style.width = '6mm';
                    letterContainer.style.textAlign = 'center';
                    letterContainer.style.lineHeight = height;
                    letterContainer.style.fontSize = `calc(${height} * 0.7)`;
                    console.log(`Using placeholder for ${char}`);
                }
            };
            
            // Set initial src to first pattern
            img.src = baseUrl + patterns.shift();
            letterContainer.appendChild(img);
            letterWrapper.appendChild(letterContainer);
        }
        
        return letterWrapper;
    };
    
    // Function to display the title with SVG images
    displayTitle = function(text) {
        const container = document.getElementById('title-container');
        if (!container) {
            console.error("Title container not found");
            return;
        }
        
        // Get current opacity setting
        const currentOpacity = getCurrentOpacity();
        
        // Clear container
        container.innerHTML = '';
        
        // Create wrapper for better alignment
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.position = 'relative';
        
        // Create title content with shared function - using exactly 1mm spacing
        const letterWrapper = createSvgText(text, '10mm', '0.5mm', true);
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(letterWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'center';
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = currentOpacity; // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add the wrapper to the container
        container.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = letterWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set underline width to match title: ${letterWrapperWidth}px`);
            
            // Ensure any default underlines are removed
            const titleArea = document.querySelector('.title-area');
            if (titleArea) {
                titleArea.style.borderBottom = 'none';
                const afterStyle = document.createElement('style');
                afterStyle.textContent = '.title-area::after { display: none !important; }';
                document.head.appendChild(afterStyle);
            }
        }, 100);
    };
    
    // Function to display student name using SVG letters
    displayStudentNameWithSvgLetters = function() {
        const studentName = document.getElementById('student-name');
        const nameDisplay = document.getElementById('name-display');
        
        if (!studentName || !nameDisplay) {
            console.error("Student name elements not found");
            return;
        }
        
        // Get the name from the input
        const nameText = studentName.value || 'NETHSARA';
        console.log(`Rendering student name with SVG: ${nameText}`);
        
        // Clear the current display
        nameDisplay.innerHTML = '';
        
        // Create wrapper for better alignment and to hold everything
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-end'; // Right align
        wrapper.style.position = 'relative';
        
        // Create SVG letters for the name with 5mm height (changed from 4mm)
        const nameSvgWrapper = createSvgText(nameText, '5mm', '0.5mm', false);
        nameSvgWrapper.style.justifyContent = 'flex-end'; // Align to right side
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(nameSvgWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'flex-end'; // Right align
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = getCurrentOpacity(); // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add to the display
        nameDisplay.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = nameSvgWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set name underline width to match name: ${letterWrapperWidth}px`);
        }, 100);
        
        console.log("Student name rendered with SVG letters and underline");
    };
    
    // Function to display group number using SVG letters
    displayGroupNumber = function() {
        const groupNumber = document.getElementById('group-number');
        const groupDisplay = document.getElementById('group-display');
        
        if (!groupNumber || !groupDisplay) {
            console.error("Group number elements not found");
            return;
        }
        
        // Get the group number from the input
        const groupText = groupNumber.value || 'A';
        console.log(`Rendering group number with SVG: ${groupText}`);
        
        // Clear the current display
        groupDisplay.innerHTML = '';
        
        // Create wrapper for better alignment and to hold everything
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-end'; // Right align
        wrapper.style.position = 'relative';
        
        // Create SVG letters for the group number with 4mm height
        const groupSvgWrapper = createSvgText(groupText, '4mm', '0.5mm', false);
        groupSvgWrapper.style.justifyContent = 'flex-end'; // Align to right side
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(groupSvgWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'flex-end'; // Right align
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = getCurrentOpacity(); // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add to the display
        groupDisplay.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = groupSvgWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set group underline width to match group number: ${letterWrapperWidth}px`);
        }, 100);
        
        console.log("Group number rendered with SVG letters and underline");
    };
    
    // Function to display reg number using SVG letters
    displayRegNumber = function() {
        const regNumber = document.getElementById('reg-number');
        const regDisplay = document.getElementById('reg-display');
        
        if (!regNumber || !regDisplay) {
            console.error("Registration number elements not found");
            return;
        }
        
        // Get the reg number from the input
        const regText = regNumber.value || '12345';
        console.log(`Rendering registration number with SVG: ${regText}`);
        
        // Clear the current display
        regDisplay.innerHTML = '';
        
        // Create wrapper for better alignment and to hold everything
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-end'; // Right align
        wrapper.style.position = 'relative';
        
        // Create SVG letters for the reg number with 4mm height
        const regSvgWrapper = createSvgText(regText, '4mm', '0.5mm', false);
        regSvgWrapper.style.justifyContent = 'flex-end'; // Align to right side
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(regSvgWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'flex-end'; // Right align
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = getCurrentOpacity(); // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add to the display
        regDisplay.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = regSvgWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set reg underline width to match reg number: ${letterWrapperWidth}px`);
        }, 100);
        
        console.log("Registration number rendered with SVG letters and underline");
    };
    
    // Function to display semester using SVG letters
    displaySemester = function() {
        const semester = document.getElementById('semester');
        const semesterDisplay = document.getElementById('semester-display');
        
        if (!semester || !semesterDisplay) {
            console.error("Semester elements not found");
            return;
        }
        
        // Get the semester from the input
        const semesterText = semester.value || 'SEMESTER 2';
        console.log(`Rendering semester with SVG: ${semesterText}`);
        
        // Clear the current display
        semesterDisplay.innerHTML = '';
        
        // Create wrapper for better alignment and to hold everything
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-end'; // Right align
        wrapper.style.position = 'relative';
        
        // Create SVG letters for the semester with 4mm height
        const semesterSvgWrapper = createSvgText(semesterText, '4mm', '0.5mm', false);
        semesterSvgWrapper.style.justifyContent = 'flex-end'; // Align to right side
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(semesterSvgWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'flex-end'; // Right align
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = getCurrentOpacity(); // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add to the display
        semesterDisplay.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = semesterSvgWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set semester underline width to match semester: ${letterWrapperWidth}px`);
        }, 100);
        
        console.log("Semester rendered with SVG letters and underline");
    };
    
    // Function to display date using SVG letters
    displayDate = function() {
        const date = document.getElementById('date');
        const dateDisplay = document.getElementById('date-display');
        
        if (!date || !dateDisplay) {
            console.error("Date elements not found");
            return;
        }
        
        // Get the date from the input
        const dateText = date.value || '06/05/2025';
        console.log(`Rendering date with SVG: ${dateText}`);
        
        // Clear the current display
        dateDisplay.innerHTML = '';
        
        // Create wrapper for better alignment and to hold everything
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'flex-end'; // Right align
        wrapper.style.position = 'relative';
        
        // Create SVG letters for the date with 4mm height
        const dateSvgWrapper = createSvgText(dateText, '4mm', '0.5mm', false);
        dateSvgWrapper.style.justifyContent = 'flex-end'; // Align to right side
        
        // Add the letter wrapper to the main wrapper
        wrapper.appendChild(dateSvgWrapper);
        
        // Add exactly 1mm space between letters and underline
        const spacer = document.createElement('div');
        spacer.style.height = '1mm'; // Exactly 1mm space
        spacer.style.width = '100%';
        spacer.style.minHeight = '1mm'; // Ensure minimum height
        spacer.style.maxHeight = '1mm'; // Ensure maximum height
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        wrapper.appendChild(spacer);
        
        // Create a wrapper for the underline that matches the letter wrapper
        const underlineWrapper = document.createElement('div');
        underlineWrapper.style.display = 'flex';
        underlineWrapper.style.justifyContent = 'flex-end'; // Right align
        underlineWrapper.style.alignItems = 'center';
        underlineWrapper.style.width = '100%';
        underlineWrapper.className = 'underline-wrapper opacity-controlled';
        
        // Add underline that matches the exact width of the letter wrapper
        const underline = document.createElement('div');
        underline.style.width = '100%'; // Will match the content width
        underline.style.height = '0.2mm'; // Thin underline
        underline.style.backgroundColor = '#333'; // Slightly lighter than black
        underline.style.opacity = getCurrentOpacity(); // Apply current opacity
        underline.className = 'underline opacity-controlled';
        underlineWrapper.appendChild(underline);
        
        // Add the underline wrapper to the main wrapper
        wrapper.appendChild(underlineWrapper);
        
        // Add to the display
        dateDisplay.appendChild(wrapper);
        
        // After rendering, adjust the underline to match the exact width of the letter content
        setTimeout(() => {
            // Get the computed width of the letter wrapper
            const letterWrapperWidth = dateSvgWrapper.getBoundingClientRect().width;
            
            // Set the underline wrapper width to match
            underlineWrapper.style.width = `${letterWrapperWidth}px`;
            console.log(`Set date underline width to match date: ${letterWrapperWidth}px`);
        }, 100);
        
        console.log("Date rendered with SVG letters and underline");
    };
    
    // Make functions globally accessible
    window.createSvgText = createSvgText;
    window.displayTitle = displayTitle;
    window.displayStudentNameWithSvgLetters = displayStudentNameWithSvgLetters;
    window.displayGroupNumber = displayGroupNumber;
    window.displayRegNumber = displayRegNumber;
    window.displaySemester = displaySemester;
    window.displayDate = displayDate;
    
    // Set up event listeners
    function setupEventListeners() {
        // Title input handling
        const titleInput = document.getElementById('experiment-title');
        if (titleInput) {
            // Display initial value
            displayTitle(titleInput.value || 'MECHANICS');
            
            // Update when input changes
            titleInput.addEventListener('input', function() {
                displayTitle(this.value);
            });
        } else {
            console.error("Title input element not found");
        }
        
        // Student name input handling
        const studentNameInput = document.getElementById('student-name');
        if (studentNameInput) {
            // Display initial value
            displayStudentNameWithSvgLetters();
            
            // Update when input changes
            studentNameInput.addEventListener('input', function() {
                displayStudentNameWithSvgLetters();
            });
        }
        
        // Group number input handling
        const groupNumberInput = document.getElementById('group-number');
        if (groupNumberInput) {
            // Display initial value
            displayGroupNumber();
            
            // Update when input changes
            groupNumberInput.addEventListener('input', function() {
                displayGroupNumber();
            });
        }
        
        // Registration number input handling
        const regNumberInput = document.getElementById('reg-number');
        if (regNumberInput) {
            // Display initial value
            displayRegNumber();
            
            // Update when input changes
            regNumberInput.addEventListener('input', function() {
                displayRegNumber();
            });
        }
        
        // Semester input handling
        const semesterInput = document.getElementById('semester');
        if (semesterInput) {
            // Display initial value
            displaySemester();
            
            // Update when input changes
            semesterInput.addEventListener('input', function() {
                displaySemester();
            });
        }
        
        // Date input handling
        const dateInput = document.getElementById('date');
        if (dateInput) {
            // Display initial value
            displayDate();
            
            // Update when input changes
            dateInput.addEventListener('input', function() {
                displayDate();
            });
        }
    }
    
    // Initialize everything
    setupEventListeners();
    
    // Ensure all fields use SVG letters on page load
    setTimeout(() => {
        displayTitle(document.getElementById('experiment-title')?.value || 'MECHANICS');
        displayStudentNameWithSvgLetters();
        displayGroupNumber();
        displayRegNumber();
        displaySemester();
        displayDate();
    }, 300);
}); 
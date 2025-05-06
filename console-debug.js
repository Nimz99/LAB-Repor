document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded');
    
    // Add event listener to check when name input changes
    const studentName = document.getElementById('student-name');
    if (studentName) {
        console.log('Student name input element found');
        studentName.addEventListener('input', function() {
            console.log(`Student name input changed to: ${this.value}`);
            
            // Check if nameDisplay exists and what's in it
            setTimeout(() => {
                const nameDisplay = document.getElementById('name-display');
                if (nameDisplay) {
                    console.log(`Current name display contents: ${nameDisplay.innerHTML.substring(0, 100)}...`);
                    console.log(`Number of child elements: ${nameDisplay.childNodes.length}`);
                    
                    // Check for SVG image elements
                    const images = nameDisplay.querySelectorAll('img');
                    console.log(`Number of image elements found: ${images.length}`);
                    images.forEach((img, i) => {
                        console.log(`Image ${i+1} src: ${img.src}`);
                    });
                } else {
                    console.error('Name display element not found');
                }
            }, 100);
        });
    } else {
        console.error('Student name input element not found');
    }
    
    // Check that createSvgText function exists in global scope
    setTimeout(() => {
        console.log('Verifying functions:');
        
        if (typeof window.createSvgText === 'function') {
            console.log('createSvgText is accessible globally');
        } else {
            console.error('createSvgText is NOT accessible globally');
        }
        
        if (typeof window.displayStudentNameWithSvgLetters === 'function') {
            console.log('displayStudentNameWithSvgLetters is accessible globally');
        } else {
            console.error('displayStudentNameWithSvgLetters is NOT accessible globally');
        }
    }, 500);
}); 
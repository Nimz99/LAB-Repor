// Add this to the beginning of your HTML file to capture and display JavaScript errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error: ' + message);
    console.error('Source: ' + source);
    console.error('Line: ' + lineno + ', Column: ' + colno);
    console.error('Error object:', error);
    
    // Create a visible error message on the page
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.width = '100%';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = 'red';
    errorDiv.style.color = 'white';
    errorDiv.style.zIndex = '9999';
    errorDiv.textContent = `JavaScript Error: ${message} (Line: ${lineno})`;
    document.body.appendChild(errorDiv);
    
    return true; // Prevents the default error handling
};

// Log when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Check if all elements exist
    const elementsToCheck = [
        'experiment-title',
        'student-name',
        'reg-number',
        'group-number',
        'semester',
        'date',
        'title-container',
        'name-display',
        'reg-display',
        'group-display',
        'semester-display',
        'date-display',
        'download-png',
        'download-pdf'
    ];
    
    console.log('Checking for elements:');
    elementsToCheck.forEach(id => {
        const element = document.getElementById(id);
        console.log(`Element #${id}: ${element ? 'Found' : 'MISSING'}`);
    });
}); 
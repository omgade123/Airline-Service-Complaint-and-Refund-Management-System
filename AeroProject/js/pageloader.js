function loadPage(page) {
    // Add error handling for missing page parameter
    if (!page) {
        console.error('No page specified');
        return;
    }

    // Construct proper path (adjust as needed for your project structure)
    const path = `/AeroProject/Pages/Admin Pages/${page}`; // Added .html extension
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById('main-content');
            if (!container) {
                throw new Error('Main content container not found');
            }
            
            container.innerHTML = data;
            
            // Handle scripts more safely
            setTimeout(() => {
                const scripts = container.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.async = false;
                    
                    if (script.src) {
                        // Resolve relative paths
                        const src = new URL(script.src, window.location.origin).href;
                        newScript.src = src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    
                    // Add error handling
                    newScript.onerror = () => {
                        console.error(`Failed to load script: ${script.src || 'inline'}`);
                    };
                    
                    document.body.appendChild(newScript);
                });
            }, 0); // Small delay to allow DOM update
        })
        .catch(err => {
            console.error('Error loading page:', err);
            const container = document.getElementById('main-content');
            if (container) {
                container.innerHTML = `
                    <div class="alert alert-danger">
                        Failed to load content. Please try again later.
                    </div>
                `;
            }
        });
}
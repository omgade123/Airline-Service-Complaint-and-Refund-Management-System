document.addEventListener("DOMContentLoaded", function () {
    window.loadUserPage = function(page) {
        fetch(`/AeroProject/Pages/User Pages/${page}`)
            .then(response => response.text())
            .then(data => {
                const container = document.getElementById('main-content');
                container.innerHTML = data;

                const scripts = container.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                    script.remove();
                });
            })
            .catch(err => {
                document.getElementById('main-content').innerHTML =
                    '<p class="text-danger">Failed to load content.</p>';
                console.error(err);
            });
    }
});

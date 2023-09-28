document.addEventListener("DOMContentLoaded", function () {
    fetch('../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.createElement('div');
            navbarContainer.innerHTML = data;
            document.body.prepend(navbarContainer);
            return fetch('../navbar/navbar.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });

    fetch('../footer/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer); // Append to add it at the bottom
            return fetch('../footer/footer.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data); // Execute the footer's JS
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
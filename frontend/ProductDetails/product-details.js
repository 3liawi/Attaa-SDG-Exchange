document.addEventListener("DOMContentLoaded", function () {
    const productImage = document.getElementById('productImage');
    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const userName = document.getElementById('userName');
    const address = document.getElementById('address');
    const phoneNumber = document.getElementById('phoneNumber');

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');


    // Load Navbar
    fetch('../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.createElement('div');
            navbarContainer.innerHTML = data;
            document.body.prepend(navbarContainer); // Prepend to add it at the top
            return fetch('../navbar/navbar.js'); // Load the navbar's JS
        })
        .then(response => response.text())
        .then(data => {
            eval(data); // Execute the navbar's JS
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });

    // Fetch product data
    fetch(`https://test.singularity-dm.com/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            productImage.src = data.image;
            productName.textContent = data.name;
            productDescription.textContent = data.description;
            userName.textContent = data.user_name;
            address.textContent = data.address;
            phoneNumber.textContent = data.phone_number;
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
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
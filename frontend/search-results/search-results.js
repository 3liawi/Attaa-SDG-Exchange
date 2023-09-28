document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

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

    if (query) {
        fetch(`https://test.singularity-dm.com/api/search?query=${query}`)
            .then(response => response.json())
            .then(products => {
                const productsGrid = document.querySelector('.products-grid');
                const productSection = document.querySelector('.products-section');

                if (products.length === 0) {
                    // Display "No products found" message
                    const notFoundMessage = document.createElement('div');
                    notFoundMessage.classList.add('not-found-message');
                    notFoundMessage.textContent = 'لم يتم العثور على منتجات.';
                    productSection.appendChild(notFoundMessage);
                } else {
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.classList.add('product-card');
                        productCard.innerHTML = `
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <img src="${product.image}" alt="${product.name}" />
                        `;

                        // Add click event to navigate to the product details page
                        productCard.addEventListener('click', () => {
                            window.location.href = `../ProductDetails/product-details.html?id=${product.id}`;
                        });

                        productsGrid.appendChild(productCard);
                    });

                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }
});

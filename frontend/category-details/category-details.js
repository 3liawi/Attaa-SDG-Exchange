document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');

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

    if (categoryId) {
        // Fetch category details
        fetch(`https://test.singularity-dm.com/api/categories/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.category-name').textContent = data.name;
                document.querySelector('.category-description').textContent = data.description;
            })
            .catch(error => {
                console.error('Error fetching category details:', error);
            });

        // Fetch products for the category
        fetch(`https://test.singularity-dm.com/api/categories/${categoryId}/products`)
            .then(response => response.json())
            .then(data => {
                const productsGridDiv = document.querySelector('.products-grid');
                data.data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product-card');
                    productDiv.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <img src="${product.image}" alt="${product.name}" />
            `;

                    // Add a click event listener to the product card
                    productDiv.addEventListener('click', () => {
                        window.location.href = `../ProductDetails/product-details.html?id=${product.id}`;
                    });

                    productsGridDiv.appendChild(productDiv);
                });

                // Handle pagination
                const paginationDiv = document.querySelector('.pagination');
                if (data.prev_page_url) {
                    const prevLink = document.createElement('a');
                    prevLink.href = data.prev_page_url;
                    prevLink.textContent = '« السابق';
                    paginationDiv.appendChild(prevLink);
                }

                const pageNumber = document.createElement('a');
                pageNumber.href = data.path;
                pageNumber.textContent = data.current_page;
                paginationDiv.appendChild(pageNumber);

                if (data.next_page_url) {
                    const nextLink = document.createElement('a');
                    nextLink.href = data.next_page_url;
                    nextLink.textContent = 'التالي »';
                    paginationDiv.appendChild(nextLink);
                }
            })
            .catch(error => {
                console.error('Error fetching products for the category:', error);
            });
    }
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

document.addEventListener('DOMContentLoaded', function () {
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

    const tabLinks = document.querySelectorAll(".tab-link");

    // Function to hide all tab content sections
    function hideAllTabContent() {
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach((content) => {
            content.style.display = "none";
        });
    }

    // Function to remove active class from all tab links
    function removeActiveClassFromTabs() {
        tabLinks.forEach((tab) => {
            tab.classList.remove("active");
        });
    }

    // Add event listener to each tab link
    tabLinks.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();

            // Hide all tab content sections
            hideAllTabContent();

            // Remove active class from all tab links
            removeActiveClassFromTabs();

            // Display the content section associated with the clicked tab
            const contentId = this.id.replace("-tab", "-content");
            document.getElementById(contentId).style.display = "flex";

            // Add active class to the clicked tab
            this.classList.add("active");
        });
    });

    // Set the default active tab
    document.getElementById("product-published-tab").click();

    fetchProducts();

});

function fetchProducts() {
    const token = localStorage.getItem('token');
    fetch('https://test.singularity-dm.com/api/user/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const container = document.getElementById('product-published-content');
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <a href="/edit-product/${product.id}" class="edit-icon"><i class="ri-edit-line"></i></a>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

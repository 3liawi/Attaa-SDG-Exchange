document.addEventListener("DOMContentLoaded", function () {
    const userImage = document.getElementById('userImage');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileSection = document.getElementById('editProfileSection');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const productsGrid = document.getElementById('productsGrid');
    const placeholderImage = "../place-holder.png"; // Replace with your placeholder image path
    // Fetch user data
    function fetchUserData() {
        fetch('https://test.singularity-dm.com/api/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                userName.textContent = data.name;
                userEmail.textContent = data.email;
                userImage.src = data.profile_image || placeholderImage;

                // Populate user info section
                const userInfoContent = document.getElementById('userInfoContent');
                userInfoContent.innerHTML = `
                <p>الاسم: ${data.name}</p>
                <p>البريد الإلكتروني: ${data.user_name}</p>
                <!-- Add more user details as needed -->
            `;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }

    function fetchUserProducts() {
        fetch('https://test.singularity-dm.com/api/user/products', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(products => {
                const postedProductsContent = document.getElementById('postedProductsContent');
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    const productImage = document.createElement('img');
                    productImage.src = product.image; // Adjust based on your product structure
                    productImage.alt = product.name;

                    const productName = document.createElement('h4');
                    productName.textContent = product.name;

                    productCard.appendChild(productImage);
                    productCard.appendChild(productName);

                    postedProductsContent.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Error fetching user products:', error);
            });
    }

    // Fetch pending products (assuming you have an endpoint for this)
    function fetchPendingProducts() {
        fetch('https://test.singularity-dm.com/api/user/pending-products', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(products => {
                const pendingProductsContent = document.getElementById('pendingProductsContent');
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.textContent = product.name; // Adjust based on your product structure
                    pendingProductsContent.appendChild(productDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching pending products:', error);
            });
    }

    // Initial fetches
    fetchUserData();
    fetchUserProducts();
    fetchPendingProducts();

    // Edit profile functionality
    editProfileBtn.addEventListener('click', () => {
        editProfileSection.style.display = 'block';
    });

    saveChangesBtn.addEventListener('click', () => {
        // Logic to save the edited profile data
        // You'll need to make an API call to update the user data
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '../index.html';
    });

    // Tabs
    const infoTab = document.querySelector('.info-tab');
    const postedProductsTab = document.querySelector('.posted-products-tab');
    const pendingProductsTab = document.querySelector('.pending-products-tab');

    // Sections
    const infoSection = document.querySelector('.info-section');
    const postedProductsSection = document.querySelector('.posted-products-section');
    const pendingProductsSection = document.querySelector('.pending-products-section');

    // Hide all sections
    function hideAllSections() {
        infoSection.style.display = 'none';
        postedProductsSection.style.display = 'none';
        pendingProductsSection.style.display = 'none';
    }

    // Event listener for info tab
    infoTab.addEventListener('click', function () {
        hideAllSections();
        infoSection.style.display = 'block';
    });

    // Event listener for posted products tab
    postedProductsTab.addEventListener('click', function () {
        hideAllSections();
        postedProductsSection.style.display = 'block';
    });

    // Event listener for pending products tab
    pendingProductsTab.addEventListener('click', function () {
        hideAllSections();
        pendingProductsSection.style.display = 'block';
    });

    // Optionally, you can display one section by default when the page loads:
    hideAllSections();
    infoSection.style.display = 'block';

    // Initial fetches
    fetchUserData();
    fetchUserProducts();
});

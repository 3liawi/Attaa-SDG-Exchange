document.addEventListener("DOMContentLoaded", function () {
    fetch('https://test.singularity-dm.com/api/categories')
        .then(response => response.json())
        .then(data => {
            const categoriesDropdown = document.getElementById('categories-dropdown');
            const menuIcon = document.querySelector('.menu-icon');
            const navList = document.querySelector('.nav-list');
            const authLinks = document.querySelector('.auth-links');

            if (menuIcon && navList) {
                menuIcon.addEventListener('click', () => {
                    navList.classList.toggle('active');
                });
            }

            data.forEach(category => {
                const a = document.createElement('a');
                a.href = `../category-details/category-details.html?categoryId=${category.id}`;
                a.textContent = category.name;
                categoriesDropdown.appendChild(a);
            });

            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (token) {
                // User is logged in

                if (authLinks) {
                    authLinks.remove();
                }
                // Fetch user data to get the profile image
                fetch('https://test.singularity-dm.com/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        // Set the profile image or use a placeholder if the user doesn't have one
                        navbarProfileImage.src = data.profile_image || '../place-holder.png';

                        // Display the profile dropdown
                        profileDropdown.style.display = 'inline-block';
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

                // Add logout functionality
                logoutLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    // Clear the token from local storage
                    localStorage.removeItem('token');
                    // Redirect to login or home page
                    window.location.href = '../index.html';
                });
            } else {
                // User is not logged in, hide the profile dropdown
                profileDropdown.style.display = 'none';
            }
        });
});
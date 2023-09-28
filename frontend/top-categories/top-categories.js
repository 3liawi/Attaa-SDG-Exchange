// Fetch the top 4 categories from the API and populate the grid
if (document.querySelector('.categories-grid')) {
    fetch('https://test.singularity-dm.com/api/categories')
        .then(response => response.json())
        .then(data => {
            const categoriesGrid = document.querySelector('.categories-grid');
            categoriesGrid.innerHTML = ''; // Clear the grid to ensure no duplication

            const topCategories = data.slice(0, 4); // Get the top 4 categories

            topCategories.forEach(category => {
                const div = document.createElement('div');
                div.className = 'category-card';

                // Create an anchor tag for navigation
                const a = document.createElement('a');
                a.href = `../category-details/category-details.html?categoryId=${category.id}`; // Link to category details with category ID as a query parameter

                const span = document.createElement('span');
                span.textContent = category.name;
                a.appendChild(span);

                div.appendChild(a);
                categoriesGrid.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

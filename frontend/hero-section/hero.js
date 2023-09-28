const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const validationMessage = document.querySelector('.validation-message');

if (searchForm && searchInput && validationMessage) {
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (query) {
            validationMessage.style.display = 'none';
            window.location.href = `../search-results/search-results.html?query=${encodeURIComponent(query)}`;
        } else {
            validationMessage.textContent = 'يرجى إدخال كلمة بحث.';
            validationMessage.style.display = 'block';
        }
    });
}

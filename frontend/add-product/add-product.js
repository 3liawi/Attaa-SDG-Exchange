

document.addEventListener("DOMContentLoaded", function () {
    fetch('https://test.singularity-dm.com/api/categories')
        .then(response => response.json())
        .then(data => {
            const categoryDropdown = document.getElementById('category_id');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });


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



    document.getElementById('addProductForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Get the values from the input fields
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const address = document.getElementById('address').value;
        const phoneNumber = document.getElementById('phone_number').value;
        const categoryId = document.getElementById('category_id').value;
        const imageInput = document.getElementById('image');

        // Append the values to the FormData object
        formData.append('name', name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('phone_number', phoneNumber);
        formData.append('category_id', categoryId);

        // Check if an image file was selected
        if (imageInput.files.length > 0) {
            const imageFile = imageInput.files[0];
            formData.append('image', imageFile);
        }

        // Assuming you have already retrieved the user's token and stored it in localStorage
        const token = localStorage.getItem('token');

        // Fetch options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData,
        };

        fetch('https://test.singularity-dm.com/api/addProduct', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.id) {
                    alert('تمت إضافة المنتج بنجاح!');
                } else {
                    alert('خطأ في إضافة المنتج.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('خطأ في إضافة المنتج.');
            });
    });






    fetch('../footer/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = data;
            document.body.appendChild(footerContainer);
            return fetch('../footer/footer.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data);
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });


});
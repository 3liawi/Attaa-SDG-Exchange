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


    fetch('../hero-section/hero.html')
        .then(response => response.text())
        .then(data => {
            const heroContainerDiv = document.createElement('div');
            heroContainerDiv.innerHTML = data;
            document.body.appendChild(heroContainerDiv);


            return fetch('../hero-section/hero.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data);
        })
        .catch(error => {
            console.error('Error loading hero section:', error);
        });





    fetch('../top-categories/top-categories.html')
        .then(response => response.text())
        .then(data => {
            const topCategoriesContainer = document.createElement('div');
            topCategoriesContainer.innerHTML = data;
            document.body.appendChild(topCategoriesContainer);
            return fetch('../top-categories/top-categories.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data);
        })
        .catch(error => {
            console.error('Error loading top categories section:', error);
        });


    const urlParams = new URLSearchParams(window.location.search);
    const formToShow = urlParams.get('form');

    if (formToShow === 'signup') {
        if (document.querySelector('.container') && !document.querySelector('.container').classList.contains('sign-up-mode')) {
            document.getElementById('sign-up-button').click();
        }
    } else if (formToShow === 'signin') {
        if (document.querySelector('.container') && document.querySelector('.container').classList.contains('sign-up-mode')) {
            document.getElementById('sign-in-button').click();
        }
    }

    // Load User Stories into the homepage
    fetch('../user-stories/user-stories.html')
        .then(response => response.text())
        .then(data => {
            const userStoriesContainer = document.createElement('div');
            userStoriesContainer.innerHTML = data;
            document.body.appendChild(userStoriesContainer);
            return fetch('../userStories/user-stories.js');
        })
        .then(response => response.text())
        .then(data => {
            eval(data);
        })
        .catch(error => {
            console.error('Error loading user stories:', error);
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

    const fab = document.getElementById('fab');



    if (localStorage.getItem('token')) {
        fab.style.display = 'flex';
    } else {
        fab.style.display = 'none';
    }


    fab.addEventListener('click', function () {
        window.location.href = '../add-product/add-product.html';
    });


});

document.addEventListener('DOMContentLoaded', function () {


    const navbarSignin = document.getElementById('navbar-signin');
    const navbarSignup = document.getElementById('navbar-signup');

    if (navbarSignin) {
        navbarSignin.addEventListener('click', function (e) {
            e.preventDefault();


            window.location.href = '../login page/index.html?form=signin';
        });
    }

    if (navbarSignup) {
        navbarSignup.addEventListener('click', function (e) {
            e.preventDefault();


            window.location.href = '../login page/index.html?form=signup';
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();
    fetchUserDetails();
    fetchTopTen();
});

function loadNavbar() {
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
            console.error('خطأ في تحميل الشريط العلوي:', error);
        });
}

function fetchUserDetails() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    // Fetch user's rank
    fetch('https://test.singularity-dm.com/api/user/rank', { headers })
        .then(response => response.json())
        .then(data => {
            document.getElementById('userRank').textContent = `الترتيب: #${data.rank}`;
        });

    // Fetch user's points
    fetch('https://test.singularity-dm.com/api/user/points', { headers })
        .then(response => response.json())
        .then(data => {
            document.getElementById('userPoints').textContent = `النقاط: ${data.points}`;
        });

    //fetch user's image and name
    fetch('https://test.singularity-dm.com/api/user', { headers }).then(response => response.json()).then(data => {
        document.getElementById('userImage').src = data.profile_image;
        document.getElementById('userName').textContent = data.name;
    });
}

function fetchTopTen() {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    fetch('https://test.singularity-dm.com/api/leaderboard', { headers })
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('topTenList');
            data.forEach(user => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                <span>${user.rank}</span>
                <div class="user-top">
                    <img src="${user.profile_image}">
                    <span>${user.name}</span>
                </div>
                <span>${user.points} ${randomEmoji()}</span>
            `;

                list.appendChild(listItem);
            });
        });
}

function randomEmoji() {
    const emojis = ['👏', '👍', '🙌', '🤩', '🔥', '⭐️', '🏆', '💯'];
    let randomNumber = Math.floor(Math.random() * emojis.length);
    return emojis[randomNumber];
}

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const profileContainer = document.getElementById('profile-container');

const GITHUB_API_URL = 'https://api.github.com/users/';


const fetchUserProfile = async (username) => {
    try {
        profileContainer.innerHTML = `<p>Carregando...</p>`;

        const response = await fetch(GITHUB_API_URL + username);

        if (!response.ok) {
            throw new Error('Usuário não encontrado!');
        }

        const userData = await response.json();

        renderUserProfile(userData);

    } catch (error) {
        profileContainer.innerHTML = `<p style="color: #ff7b72;">${error.message}</p>`;
    }
};

const renderUserProfile = (userData) => {
    const { avatar_url, name, login, bio, public_repos, followers, following, html_url } = userData;

    const profileHTML = `
        <div class="profile-card">
            <div class="profile-header">
                <img src="${avatar_url}" alt="Avatar de ${name}" class="profile-avatar">
                <div class="profile-info">
                    <h2>${name || login}</h2>
                    <a href="${html_url}" target="_blank">@${login}</a>
                </div>
            </div>
            <p class="profile-bio">${bio || 'Este usuário não possui uma bio.'}</p>
            <div class="profile-stats">
                <div class="stat">
                    <strong>Repositórios</strong>
                    <span>${public_repos}</span>
                </div>
                <div class="stat">
                    <strong>Seguidores</strong>
                    <span>${followers}</span>
                </div>
                <div class="stat">
                    <strong>Seguindo</strong>
                    <span>${following}</span>
                </div>
            </div>
        </div>
    `;

    profileContainer.innerHTML = profileHTML;
};



searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = searchInput.value.trim();

    if (username) {
        fetchUserProfile(username);
    }
});
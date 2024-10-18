let digimons = [];
let currentIndex = 0;

document.getElementById('searchButton').addEventListener('click', () => {
    const digimonName = document.getElementById('digimonName').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    // Busca todos os Digimons
    fetch(`https://digimon-api.vercel.app/api/digimon`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar Digimons');
            }
            return response.json();
        })
        .then(data => {
            digimons = data; // Armazena todos os Digimons

            // Se o usuário pesquisar por um nome, vai procurar o primeiro índice que bate com o nome
            const searchResultIndex = digimons.findIndex(d => d.name.toLowerCase().includes(digimonName));

            if (searchResultIndex !== -1) {
                currentIndex = searchResultIndex; // Atualiza o índice atual para o Digimon encontrado
                displayDigimon(); // Exibe o Digimon encontrado
                updateNavigation(); // Atualiza a navegação
            } else {
                resultDiv.innerHTML = `<p>Digimon não encontrado</p>`;
                digimons = []; // Limpa a lista de Digimons
                updateNavigation(); // Desabilita os botões
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
            digimons = []; // Limpa a lista de Digimons
            updateNavigation(); // Desabilita os botões
        });
});

function displayDigimon() {
    const digimon = digimons[currentIndex];
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <h2>${digimon.name}</h2>
        <p>Nível: ${digimon.level}</p>
        <img src="${digimon.img}" alt="${digimon.name}" class="digimon-image">
    `;
}

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Vai para o Digimon anterior
        displayDigimon();
        updateNavigation();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < digimons.length - 1) {
        currentIndex++; // Vai para o próximo Digimon
        displayDigimon();
        updateNavigation();
    }
});

function updateNavigation() {
    // Desativa o botão "Anterior" se estivermos no primeiro Digimon
    document.getElementById('prevButton').disabled = currentIndex === 0;
    
    // Desativa o botão "Próximo" se estivermos no último Digimon
    document.getElementById('nextButton').disabled = currentIndex === digimons.length - 1;
    
    // Se não houver Digimons, desabilita ambos os botões
    if (digimons.length <= 1) {
        document.getElementById('prevButton').disabled = true;
        document.getElementById('nextButton').disabled = true;
    }
}

window.onload = () => {
    document.getElementById('digimonName').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchDigimon(); // Chama a função de pesquisa ao pressionar Enter
        }
    });

    // Carrega a navegação de botão (opcional)
    document.getElementById('searchButton').addEventListener('click', searchDigimon);
}

// Função de pesquisa de Digimon
function searchDigimon() {
    const digimonName = document.getElementById('digimonName').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    // Busca todos os Digimons
    fetch(`https://digimon-api.vercel.app/api/digimon`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar Digimons');
            }
            return response.json();
        })
        .then(data => {
            digimons = data; // Armazena todos os Digimons

            // Filtra e encontra o primeiro Digimon pelo nome pesquisado
            const searchResultIndex = digimons.findIndex(d => d.name.toLowerCase().includes(digimonName));

            if (searchResultIndex !== -1) {
                currentIndex = searchResultIndex; // Define o índice do Digimon encontrado
                displayDigimon(); // Exibe o Digimon
                updateNavigation(); // Atualiza os botões de navegação
            } else {
                resultDiv.innerHTML = `<p>Digimon não encontrado</p>`;
                digimons = [];
                updateNavigation(); // Desabilita os botões se não encontrar nada
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
            digimons = [];
            updateNavigation(); // Desabilita os botões se houver erro
        });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const digimonName = document.getElementById('digimonName').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Digimon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            const digimon = data[0]; // Pega o primeiro resultado
            resultDiv.innerHTML = `
                <h2>${digimon.name}</h2>
                <p>Nível: ${digimon.level}</p>
                <img src="${digimon.img}" alt="${digimon.name}">
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>${error.message}</p>`;
        });
});

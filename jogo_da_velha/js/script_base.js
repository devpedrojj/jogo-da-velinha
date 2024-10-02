function carregarNomesEPontuacoes() {
    var jogadorX = localStorage.getItem('jogadorX');
    var jogadorO = localStorage.getItem('jogadorO');

    // Verificar se os nomes existem no localStorage
    if (jogadorX && jogadorO) {
        // Inserir os nomes nos elementos HTML
        document.getElementById('nomeJogadorX').innerText = jogadorX;
        document.getElementById('nomeJogadorO').innerText = jogadorO;
    }

    // Carregar pontuações salvas do localStorage
    pontosX = localStorage.getItem('pontosX') ? parseInt(localStorage.getItem('pontosX')) : 0;
    pontosO = localStorage.getItem('pontosO') ? parseInt(localStorage.getItem('pontosO')) : 0;

    // Exibir as pontuações na tela
    document.getElementById('pontosX').innerText = pontosX;
    document.getElementById('pontosO').innerText = pontosO;
}
function resetarPontuacoes() {
    pontosX = 0; // Reinicia a pontuação do jogador X
    pontosO = 0; // Reinicia a pontuação do jogador O

    // Atualiza o localStorage
    localStorage.setItem('pontosX', pontosX);
    localStorage.setItem('pontosO', pontosO);

    // Atualiza a exibição na tela
    document.getElementById('pontosX').innerText = pontosX;
    document.getElementById('pontosO').innerText = pontosO;
}

// Chamar a função quando a página carregar para garantir que os dados estejam atualizados
window.onload = carregarNomesEPontuacoes;

// Variáveis para as pontuações dos jogadores
let pontosX = 0;
let pontosO = 0;

const proximoJogador = document.querySelector('.proximoJogador');

let selected;
let player = "X";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];
    proximoJogador.innerHTML = `JOGADOR DA VEZ: ${player}`;
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100);

    player = player === "X" ? "O" : "X";
    proximoJogador.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (let i = 0; i < positions.length; i++) {
        const [a, b, c] = positions[i];
        if (selected[a] && selected[a] === selected[b] && selected[a] === selected[c]) {
            alert(`Jogador  " ${selected[a]} "  ganhou! PARABÉNS!`);

            // Atualiza pontuação
            if (selected[a] === "X") {
                pontosX++;
                document.getElementById("pontosX").innerText = pontosX;
                localStorage.setItem('pontosX', pontosX);  // Salva a pontuação de X
            } else {
                pontosO++;
                document.getElementById("pontosO").innerText = pontosO;
                localStorage.setItem('pontosO', pontosO);  // Salva a pontuação de O
            }

            restartGame();
            return;
        }
    }

    if (selected.filter(Boolean).length === 9) {
        alert("Empate!");
        restartGame();
    }
}

function restartGame() {
    // Limpa o array de seleções
    selected = [];

    // Reinicia o jogador atual para "X"
    player = "X";

    // Reinicia a exibição do jogador da vez
    proximoJogador.innerHTML = `JOGADOR DA VEZ: ${player}`;

    // Remove os eventos de clique dos botões e limpa seu conteúdo
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}


function salvarNomes() {
    var jogadorX = document.getElementById('jogadorX').value;
    var jogadorO = document.getElementById('jogadorO').value;

    // Verificar se os campos estão vazios
    if (jogadorX === '' || jogadorO === '') {
        alert('Escreva os dois campos de jogador ☹');
        return;
    }

    // Armazenar os nomes dos jogadores no localStorage
    localStorage.setItem('jogadorX', jogadorX);
    localStorage.setItem('jogadorO', jogadorO);

    // Resetar as pontuações
    resetarPontuacoes(); // Reinicia as pontuações para zero

    // Mudar para a tela do jogo
    document.getElementById('cadastro').style.display = 'none'; // Esconder a tela de cadastro
    document.getElementById('main-game').style.display = 'block'; // Mostrar a tela do jogo

    // Carregar os nomes dos jogadores
    carregarNomesEPontuacoes(); // Exibir os nomes e pontuações
}

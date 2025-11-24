const perguntas = [
    {
        texto: "Qual é o valor de x na equação $2x + 5 = 15$?",
        opcoes: [
            { texto: "x = 5", correta: true },
            { texto: "x = 10", correta: false },
            { texto: "x = 20", correta: false },
            { texto: "x = 2", correta: false }
        ]
    },
    {
        texto: "Se uma função é dada por $f(x) = 3x - 1$, qual é o valor de $f(4)$?",
        opcoes: [
            { texto: "11", correta: true },
            { texto: "13", correta: false },
            { texto: "12", correta: false },
            { texto: "10", correta: false }
        ]
    },
    {
        texto: "Qual é a área de um triângulo com base 8 cm e altura 5 cm?",
        opcoes: [
            { texto: "40 cm²", correta: false },
            { texto: "20 cm²", correta: true },
            { texto: "13 cm²", correta: false },
            { texto: "30 cm²", correta: false }
        ]
    },
    {
        texto: "Em uma Progressão Aritmética (PA), o primeiro termo é 3 e a razão é 4. Qual é o 5º termo?",
        opcoes: [
            { texto: "19", correta: true },
            { texto: "15", correta: false },
            { texto: "23", correta: false },
            { texto: "27", correta: false }
        ]
    },
    {
        texto: "Qual é o resultado da expressão $2^3 + \sqrt{16}$?",
        opcoes: [
            { texto: "10", correta: false },
            { texto: "12", correta: true },
            { texto: "14", correta: false },
            { texto: "8", correta: false }
        ]
    },
    {
        texto: "Se um produto custa R$ 50,00 e tem um desconto de 10%, qual é o novo preço?",
        opcoes: [
            { texto: "R$ 45,00", correta: true },
            { texto: "R$ 40,00", correta: false },
            { texto: "R$ 5,00", correta: false },
            { texto: "R$ 49,00", correta: false }
        ]
    },
    {
        texto: "Qual é o valor de $\\log_{2} 8$?",
        opcoes: [
            { texto: "2", correta: false },
            { texto: "3", correta: true },
            { texto: "4", correta: false },
            { texto: "8", correta: false }
        ]
    },
    {
        texto: "Qual é o número de diagonais de um hexágono?",
        opcoes: [
            { texto: "6", correta: false },
            { texto: "9", correta: true },
            { texto: "12", correta: false },
            { texto: "15", correta: false }
        ]
    },
    {
        texto: "Em um lançamento de um dado comum, qual a probabilidade de sair um número par?",
        opcoes: [
            { texto: "1/6", correta: false },
            { texto: "1/3", correta: false },
            { texto: "1/2", correta: true },
            { texto: "2/3", correta: false }
        ]
    },
    {
        texto: "Qual é o coeficiente angular da reta que passa pelos pontos A(1, 2) e B(3, 8)?",
        opcoes: [
            { texto: "2", correta: false },
            { texto: "3", correta: true },
            { texto: "4", correta: false },
            { texto: "6", correta: false }
        ]
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;
let respostaJaDada = false;

function carregarPergunta() {
    respostaJaDada = false;
    const pergunta = perguntas[indicePerguntaAtual];
    const numeroDaQuestao = indicePerguntaAtual + 1;
    
    // Atualiza o texto da pergunta com o número e o conteúdo
    document.getElementById("texto-pergunta").innerHTML = `${numeroDaQuestao}. ${pergunta.texto}`;

    const containerOpcoes = document.querySelector(".opcoes");
    containerOpcoes.innerHTML = pergunta.opcoes
        .map(
            (opcao, indice) =>
                `<button class="opcao-btn" onclick="verificarResposta(${indice})">${opcao.texto}</button>`
        )
        .join("");

    document.getElementById("resultado").textContent = "";
    document.getElementById("botao-proximo").style.display = "none";
    document.getElementById("pabens").innerHTML = "Escolha a alternativa correta:";
    
    // Habilita a renderização de expressões matemáticas (LaTeX)
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }
}

function verificarResposta(indiceSelecionado) {
    if (respostaJaDada) return; // Impede múltiplas respostas
    respostaJaDada = true;

    const pergunta = perguntas[indicePerguntaAtual];
    const divResultado = document.getElementById("resultado");
    const botaoSelecionado = document.querySelectorAll(".opcao-btn")[indiceSelecionado];

    // Desabilita todos os botões de opção
    document.querySelectorAll(".opcao-btn").forEach(btn => btn.disabled = true);

    if (pergunta.opcoes[indiceSelecionado].correta) {
        divResultado.textContent = "Correto! +1 ponto.";
        divResultado.style.color = "green";
        botaoSelecionado.style.backgroundColor = "green";
        pontuacao++;
        atualizarPontuacao();
        // Toca som de acerto (se os arquivos de som existirem)
        const acertoSom = document.getElementById("acerto-som");
        if (acertoSom) acertoSom.play();
    } else {
        divResultado.textContent = "Resposta errada. -1 ponto.";
        divResultado.style.color = "red";
        botaoSelecionado.style.backgroundColor = "red";
        pontuacao = Math.max(0, pontuacao - 1); // Garante que a pontuação não seja negativa
        atualizarPontuacao();
        // Toca som de erro (se os arquivos de som existirem)
        const erroSom = document.getElementById("erro-som");
        if (erroSom) erroSom.play();

        // Destaca a resposta correta
        const indiceCorreto = pergunta.opcoes.findIndex(opcao => opcao.correta);
        if (indiceCorreto !== -1) {
            document.querySelectorAll(".opcao-btn")[indiceCorreto].style.backgroundColor = "lightgreen";
        }
    }

    document.getElementById("pabens").innerHTML = "";
    document.getElementById("botao-proximo").style.display = "block";
}

function atualizarPontuacao() {
    document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;
}

function carregarProximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        // Lógica de conclusão do quiz
        document.getElementById("texto-pergunta").style.display = "none";
        document.querySelector(".opcoes").innerHTML = "";
        document.getElementById("resultado").textContent = `Você terminou o quiz com ${pontuacao} ponto(s)!`;
        document.getElementById("resultado").style.color = "blue";
        document.getElementById("botao-proximo").style.display = "none";
        document.getElementById("pontuacao").style.display = "none";
        document.getElementById("pabens").innerHTML = "Parabéns, você terminou o quiz!";
        
        const bomSom = document.getElementById("bom-som");
        const ruimSom = document.getElementById("ruim-som");
        const maxPontuacao = perguntas.length;

        document.getElementById("mensagem").style.display = "block";
        if (pontuacao >= maxPontuacao * 0.7) { // 70% de acerto
            if (bomSom) bomSom.play();
            document.getElementById("mensagem").textContent = 'Parabéns pela sua excelente performance!';
            document.getElementById("mensagem").style.color = "green";
        } else if (pontuacao >= maxPontuacao * 0.4) { // 40% de acerto
            document.getElementById("mensagem").textContent = 'Bom trabalho! Continue praticando.';
            document.getElementById("mensagem").style.color = "orange";
        } else {
            if (ruimSom) ruimSom.play();
            document.getElementById("mensagem").textContent = 'Continue estudando para melhorar na próxima vez!';
            document.getElementById("mensagem").style.color = "red";
        }
    }
}

// Inicialização
// embaralhar(perguntas); // Não vou embaralhar as perguntas para manter a ordem dos tópicos.
carregarPergunta();

// Função de embaralhar (mantida, mas não usada na inicialização)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

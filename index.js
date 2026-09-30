<<<<<<< HEAD
let imagens = [];

const $ = (id) => document.getElementById(id);

// Elementos da tabela 
const tabuleiro = $("tabuleiro");
const jogadorElemento = $("jogador");
const pontosElemento = $("pontos");
const botaoReiniciar = $("reiniciar");
const mensagem = $("mensagem");
const resultadoPontos = $("resultado-pontos");
const jogarNovamente = $("jogar-novamente");

// Estado do jogo
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;
let pontos = 0;


/* =   JOGADOR pegda os dados que foram colocados no index.html = */

const nomeSalvo = localStorage.getItem("nomeJogador");

if (nomeSalvo?.trim()) {
=======
/* =========================
   IMAGENS DO JOGO
========================= */

/*
    Você possui 8 imagens.

    O jogo vai duplicar automaticamente
    cada uma delas para formar 8 pares.

    Total:
    8 imagens × 2 = 16 cartas
*/

let imagens = [];

async function carregarCartas() {
    const resposta = await fetch("cartas.json");
    const dados = await resposta.json();
    imagens = dados.imagens;
    criarCartas();
    atualizarStatus();
}


/* =========================
   ELEMENTOS DO HTML
========================= */

const tabuleiro = document.getElementById("tabuleiro");

const jogadorElemento = document.getElementById("jogador");

const pontosElemento = document.getElementById("pontos");

const tentativasElemento = document.getElementById("tentativas");

const tempoElemento = document.getElementById("tempo");

const botaoReiniciar = document.getElementById("reiniciar");

const mensagem = document.getElementById("mensagem");

const resultadoPontos = document.getElementById("resultado-pontos");

const resultadoTentativas = document.getElementById("resultado-tentativas");

const resultadoTempo = document.getElementById("resultado-tempo");

const jogarNovamente = document.getElementById("jogar-novamente");


/* =========================
   VARIÁVEIS DO JOGO
========================= */

let primeiraCarta = null;

let segundaCarta = null;

let bloqueado = false;

let paresEncontrados = 0;

let pontos = 0;

let tentativas = 0;

let segundos = 0;

let cronometro = null;

let jogoComecou = false;


/* =========================
   NOME DO JOGADOR
========================= */

/*
    Se sua página inicial já salva
    o nome no localStorage, ele será
    mostrado automaticamente.

    Caso contrário, aparece "Isaac".
*/

const nomeSalvo = localStorage.getItem("nomeJogador");

if (nomeSalvo && nomeSalvo.trim() !== "") {
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
    jogadorElemento.textContent = nomeSalvo;
}


<<<<<<< HEAD
/* = CARREGAR CARTAS = */

async function carregarCartas() {
    try {
        const resposta = await fetch("cartas.json");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados.imagens) || dados.imagens.length === 0) {
            throw new Error("Nenhuma imagem encontrada em cartas.json");
        }

        imagens = dados.imagens;

        criarCartas();
        atualizarStatus();

    } catch (erro) {
        console.error("Erro ao carregar as cartas:", erro);

        tabuleiro.innerHTML = `
            <p class="erro">
                Não foi possível carregar as cartas.
            </p>
        `;
    }
}


/* = EMBARALHA as cartas
 = */

function embaralhar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
=======
/* =========================
   EMBARALHAR
========================= */

function embaralhar(array) {

    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        const temporario = copia[i];

        copia[i] = copia[j];

        copia[j] = temporario;
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
    }

    return copia;
}


<<<<<<< HEAD
/* =  CRIAR CARTAS= */

function criarCartas() {
    tabuleiro.innerHTML = "";

    const cartas = embaralhar([
        ...imagens,
        ...imagens
    ]);

    const fragmento = document.createDocumentFragment();

    cartas.forEach((imagem, indice) => {
        const carta = document.createElement("div");

        carta.className = "carta";
        carta.dataset.imagem = imagem;
        carta.dataset.id = indice;

=======
/* =========================
   CRIAR CARTAS
========================= */

function criarCartas() {

    /*
        Limpa o tabuleiro.
    */

    tabuleiro.innerHTML = "";


    /*
        Cria os pares.
    */

    const cartas = [
        ...imagens,
        ...imagens
    ];


    /*
        Embaralha as cartas.
    */

    const cartasEmbaralhadas = embaralhar(cartas);


    /*
        Cria cada carta na tela.
    */

    cartasEmbaralhadas.forEach((imagem, indice) => {

        const carta = document.createElement("div");

        carta.classList.add("carta");

        carta.dataset.imagem = imagem;

        carta.dataset.id = indice;


>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
        carta.innerHTML = `
            <div class="carta-conteudo">

                <div class="carta-verso">
                    ?
                </div>

                <div class="carta-frente">
                    <img
                        src="${imagem}"
                        alt="Imagem da carta"
                    >
                </div>

            </div>
        `;

<<<<<<< HEAD
        carta.addEventListener("click", () => virarCarta(carta));

        fragmento.appendChild(carta);
    });

    tabuleiro.appendChild(fragmento);
}

/* = VIRAR CARTA = */

function virarCarta(carta) {

    if (
        bloqueado ||
        carta === primeiraCarta ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }

    carta.classList.add("virada");

    // Primeira carta
    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }

    // Segunda carta
    segundaCarta = carta;

    bloqueado = true;

=======

        /*
            Quando clicar na carta,
            chama a função virarCarta.
        */

        carta.addEventListener("click", () => {

            virarCarta(carta);

        });


        tabuleiro.appendChild(carta);

    });
}


/* =========================
   VIRAR CARTA
========================= */

function virarCarta(carta) {

    /*
        Não permite clicar enquanto
        duas cartas erradas estão
        sendo fechadas.
    */

    if (bloqueado) {
        return;
    }


    /*
        Não permite clicar novamente
        na mesma carta.
    */

    if (carta === primeiraCarta) {
        return;
    }


    /*
        Não permite clicar em uma
        carta que já encontrou o par.
    */

    if (carta.classList.contains("encontrada")) {
        return;
    }


    /*
        Começa o cronômetro no
        primeiro clique.
    */

    if (!jogoComecou) {

        jogoComecou = true;

        iniciarCronometro();

    }


    /*
        Vira a carta.
    */

    carta.classList.add("virada");


    /*
        Se for a primeira carta.
    */

    if (primeiraCarta === null) {

        primeiraCarta = carta;

        return;
    }


    /*
        Se chegou aqui, é a segunda carta.
    */

    segundaCarta = carta;


    /*
        Conta uma tentativa.
    */

    tentativas++;

    atualizarStatus();


    /*
        Bloqueia novos cliques
        enquanto compara.
    */

    bloqueado = true;


>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
    verificarPar();
}


<<<<<<< HEAD
/* = VERIFICAR PAR = */

function verificarPar() {

    const saoIguais =
        primeiraCarta.dataset.imagem ===
        segundaCarta.dataset.imagem;


    // PAR CORRETO, esta com as imagens certas

    if (saoIguais) {
=======
/* =========================
   VERIFICAR PAR
========================= */

function verificarPar() {

    const imagem1 = primeiraCarta.dataset.imagem;

    const imagem2 = segundaCarta.dataset.imagem;


    /*
        ========================
        PAR CORRETO
        ========================
    */

    if (imagem1 === imagem2) {
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7

        setTimeout(() => {

            primeiraCarta.classList.add("encontrada");
<<<<<<< HEAD
            segundaCarta.classList.add("encontrada");

            pontos += 100;
            paresEncontrados++;

            atualizarStatus();

            limparSelecao();


            // Verifica se terminou o jogo, todas as cartas selecionadas estao corretos, o jogo finalaza
        
            if (paresEncontrados === imagens.length) {
                finalizarJogo();
=======

            segundaCarta.classList.add("encontrada");


            /*
                Adiciona 100 pontos
                por cada par encontrado.
            */

            pontos += 100;

            paresEncontrados++;


            atualizarStatus();


            /*
                Limpa as cartas selecionadas.
            */

            primeiraCarta = null;

            segundaCarta = null;

            bloqueado = false;


            /*
                Verifica se o jogador
                encontrou todos os pares.
            */

            if (paresEncontrados === imagens.length) {

                finalizarJogo();

>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
            }

        }, 500);

<<<<<<< HEAD
        return;
    }


    // toda vez que erra a carta vira  a carta de volta
    setTimeout(() => {

        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");

        limparSelecao();
=======
    }


    /*
        ========================
        PAR ERRADO
        ========================
    */

    else {

        setTimeout(() => {

            primeiraCarta.classList.remove("virada");

            segundaCarta.classList.remove("virada");


            primeiraCarta = null;

            segundaCarta = null;

            bloqueado = false;

        }, 1000);

    }
}


/* =========================
   CRONÔMETRO
========================= */

function iniciarCronometro() {

    pararCronometro();


    cronometro = setInterval(() => {

        segundos++;

        atualizarTempo();
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7

    }, 1000);
}


<<<<<<< HEAD
/* LIMPAR SELEÇÃO  */

function limparSelecao() {

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

}

/* =atualiza os estatos da carta= */
=======
/* =========================
   PARAR CRONÔMETRO
========================= */

function pararCronometro() {

    if (cronometro !== null) {

        clearInterval(cronometro);

        cronometro = null;
    }
}


/* =========================
   FORMATAR TEMPO
========================= */

function formatarTempo(valor) {

    const minutos = Math.floor(valor / 60);

    const segundosRestantes = valor % 60;


    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );
}


/* =========================
   ATUALIZAR TEMPO
========================= */

function atualizarTempo() {

    tempoElemento.textContent =
        formatarTempo(segundos);
}


/* =========================
   ATUALIZAR STATUS
========================= */
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7

function atualizarStatus() {

    pontosElemento.textContent =
        String(pontos).padStart(3, "0");

<<<<<<< HEAD
}


/* = FINALIZAR JOGO= */

function finalizarJogo() {

    resultadoPontos.textContent =
        String(pontos).padStart(3, "0");

    mensagem.classList.add("ativa");

    mensagem.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* = REINICIAR JOGO = */

function reiniciarJogo() {

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    paresEncontrados = 0;
    pontos = 0;


    // Fecha a mensagem de vitória
=======

    tentativasElemento.textContent =
        String(tentativas).padStart(2, "0");


    atualizarTempo();
}


/* =========================
   FINALIZAR JOGO
========================= */

function finalizarJogo() {

    pararCronometro();


    setTimeout(() => {

        resultadoPontos.textContent =
            String(pontos).padStart(3, "0");


        resultadoTentativas.textContent =
            String(tentativas).padStart(2, "0");


        resultadoTempo.textContent =
            formatarTempo(segundos);


        mensagem.classList.add("ativa");

        mensagem.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 700);
}


/* =========================
   REINICIAR JOGO
========================= */

function reiniciarJogo() {

    /*
        Para o cronômetro.
    */

    pararCronometro();


    /*
        Reseta as variáveis.
    */

    primeiraCarta = null;

    segundaCarta = null;

    bloqueado = false;

    paresEncontrados = 0;

    pontos = 0;

    tentativas = 0;

    segundos = 0;

    jogoComecou = false;


    /*
        Fecha a mensagem de vitória.
    */

>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
    mensagem.classList.remove("ativa");

    mensagem.setAttribute(
        "aria-hidden",
        "true"
    );


<<<<<<< HEAD
    atualizarStatus();

=======
    /*
        Atualiza os números.
    */

    atualizarStatus();


    /*
        Cria novas cartas
        e embaralha novamente.
    */

>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
    criarCartas();
}


<<<<<<< HEAD
/* =  bOTAO DE RENICIAR O JOGO = */
=======
/* =========================
   BOTÕES
========================= */
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7

botaoReiniciar.addEventListener(
    "click",
    reiniciarJogo
);

<<<<<<< HEAD
=======

>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7
jogarNovamente.addEventListener(
    "click",
    reiniciarJogo
);

<<<<<<< HEAD
/* =  Inicia os jogos e carrega as catartas= */
=======

/* =========================
   INICIAR JOGO
========================= */
>>>>>>> b5a179807f7ce57106b1a09c142f233b9fbb69b7

carregarCartas();
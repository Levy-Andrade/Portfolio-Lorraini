/* =========================================================
   PORTFÓLIO — LORRAINI ESPANGA PARIS
   script.js — Versão 2.0
   Desenvolvido por Levy Andrade
========================================================= */

/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".preloader");

    if (loader) {

        loader.classList.add("loader-hidden");

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu    = document.querySelector(".nav-list");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open");

    });

}

/* =========================================================
   DARK MODE — mantém preferência via localStorage
========================================================= */

const darkModeToggle = document.getElementById("dark-mode-toggle");

/* Restaura preferência salva */
if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark-mode");

    if (darkModeToggle) darkModeToggle.checked = true;

}

if (darkModeToggle) {

    darkModeToggle.addEventListener("change", () => {

        if (darkModeToggle.checked) {

            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");

        } else {

            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");

        }

    });

}

/* =========================================================
   SCROLL SUAVE — links do menu
========================================================= */

document.querySelectorAll(".nav-list a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const id      = this.getAttribute("href");
        const section = document.querySelector(id);

        if (section) {

            section.scrollIntoView({ behavior: "smooth", block: "start" });

        }

        /* Fecha menu mobile ao clicar */
        if (navMenu) navMenu.classList.remove("active");

    });

});

/* =========================================================
   HEADER — sombra ao rolar
========================================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }

});

/* =========================================================
   EFEITO DIGITAÇÃO — hero subtitle
========================================================= */

const elementoTexto = document.querySelector(".hero-content p");

if (elementoTexto) {

    const texto = "Social Media • Design Gráfico • Marketing Digital • Fotografia Publicitária";
    let index    = 0;

    elementoTexto.innerHTML = "";

    function digitar() {

        if (index < texto.length) {

            elementoTexto.innerHTML += texto.charAt(index);
            index++;
            setTimeout(digitar, 40);

        }

    }

    digitar();

}

/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

const btnTopo = document.createElement("button");

btnTopo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
btnTopo.classList.add("btn-topo");
btnTopo.setAttribute("aria-label", "Voltar ao topo");

document.body.appendChild(btnTopo);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        btnTopo.classList.add("show-top");
    } else {
        btnTopo.classList.remove("show-top");
    }

});

btnTopo.addEventListener("click", () => {

    window.scrollTo({ top: 0, behavior: "smooth" });

});

/* =========================================================
   1. MODAL DE PROJETOS — dinâmico, um único modal para tudo
   ─────────────────────────────────────────────────────────
   Preenche #modalProjeto com os dados do card clicado.
   Fecha via: botão X  |  clique no overlay  |  tecla ESC
========================================================= */

const modal        = document.getElementById("modalProjeto");
const modalImg     = document.getElementById("modalImg");
const modalTitle   = document.getElementById("modalTitle");
const modalDesc    = document.getElementById("modalDesc");
const modalCategoria = document.getElementById("modalCategoria");
const closeModal   = document.querySelector(".close-modal");

/**
 * Abre o modal preenchendo-o com os dados do projeto.
 *
 * @param {string} arquivo   - Nome do arquivo OU caminho completo
 * @param {string} titulo    - Título do projeto
 * @param {string} descricao - Descrição detalhada
 * @param {string} categoria - Categoria (Branding, Social Media…)
 */
function abrirProjeto(arquivo, titulo, descricao, categoria) {

    if (!modal) return;

    /* ── Normaliza o caminho ──────────────────────────────────
       Alguns cards passam só o nome (ex: 'projeto-vogue.jpeg'),
       outros passam o caminho completo ('assets/PROJETOS/x.jpg').
       Garante sempre o prefixo correto sem duplicar.
    ──────────────────────────────────────────────────────── */
    const prefixo  = "assets/PROJETOS/";
    const srcFinal = arquivo.startsWith("assets/") || arquivo.startsWith("http")
        ? arquivo
        : prefixo + arquivo;

    /* ── Detecta se é vídeo ou imagem ── */
    const isVideo = /\.(mp4|webm|ogg)$/i.test(srcFinal);
    const modalImageEl = document.querySelector(".modal-image");

    if (isVideo) {

        /* Injeta vídeo sem estilos inline — object-fit e dimensões
           são controlados exclusivamente pelo CSS para permitir
           contain tanto no desktop quanto no mobile */
        modalImageEl.innerHTML = `
            <video src="${srcFinal}"
                   autoplay muted loop playsinline
                   class="modal-video">
            </video>`;

    } else {

        /* Garante que temos a tag img (restaura se foi substituída por vídeo) */
        if (!document.getElementById("modalImg")) {
            modalImageEl.innerHTML = `<img id="modalImg" src="" alt="Projeto">`;
        }

        const imgEl  = document.getElementById("modalImg");
        imgEl.src    = srcFinal;
        imgEl.alt    = titulo;

    }

    /* Preenche texto */
    if (modalTitle)     modalTitle.textContent     = titulo;
    if (modalDesc)      modalDesc.textContent       = descricao;
    if (modalCategoria) modalCategoria.textContent  = categoria || "Projeto Publicitário";

    /* Exibe modal com double-rAF para garantir transição CSS */
    modal.style.display = "flex";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            modal.classList.add("modal-ativo");
            /* Garante que o modal volte ao topo a cada abertura */
            modal.scrollTop = 0;
        });
    });

    /* No desktop trava o scroll do body para evitar rolagem dupla.
       No mobile (< 768px) deixa o .modal em si rolar — não trava o body. */
    if (window.innerWidth >= 768) {
        document.body.style.overflow = "hidden";
    }

    if (closeModal) closeModal.focus();

}

/** Fecha o modal */
function fecharModal() {

    if (!modal) return;

    modal.classList.remove("modal-ativo");

    modal.addEventListener("transitionend", () => {

        modal.style.display = "none";

        /* Para o vídeo se houver um no modal */
        const videoEl = document.querySelector(".modal-image video");
        if (videoEl) videoEl.pause();

    }, { once: true });

    /* Restaura scroll do body (no mobile pode já estar "" mas não faz mal) */
    document.body.style.overflow = "";

}

/* Botão X */
if (closeModal) {

    closeModal.addEventListener("click", fecharModal);

}

/* Clique fora do conteúdo (overlay escuro) */
if (modal) {

    modal.addEventListener("click", (e) => {

        if (e.target === modal) fecharModal();

    });

}

/* Tecla ESC */
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal && modal.style.display === "flex") {

        fecharModal();

    }

});

/* =========================================================
   FILTROS DE CATEGORIA — portfólio
========================================================= */

const filtroBtns   = document.querySelectorAll(".filtro-btn");
const projetoCards = document.querySelectorAll(".projeto-card");

filtroBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        /* Atualiza botão ativo */
        filtroBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filtro = btn.dataset.filtro;

        projetoCards.forEach(card => {

            const categoria = card.dataset.categoria;

            if (filtro === "todos" || categoria === filtro) {

                card.style.display = "";
                card.classList.add("filtro-show");

            } else {

                card.style.display = "none";
                card.classList.remove("filtro-show");

            }

        });

    });

});

/* =========================================================
   EFEITO HOVER 3D — cards de especialidades
========================================================= */

const especialidadeCards = document.querySelectorAll(".card");

especialidadeCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x    = e.clientX - rect.left;
        const y    = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});

/* =========================================================
   2. INTERSECTIONOBSERVER — Animações de Scroll (Aparecimento)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Configurações do Observer (dispara quando 15% do elemento aparece na tela)
    const observerOptions = {
        root: null, // usa a viewport do navegador
        rootMargin: "0px",
        threshold: 0.15 
    };

    // 2. Função que adiciona a classe .show quando o elemento entra na tela
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Opcional: para a animação rodar apenas uma vez, descomente a linha abaixo:
                // observer.unobserve(entry.target);
            } else {
                // Se quiser que o elemento suma de novo ao sair da tela (efeito contínuo), mantenha a linha abaixo.
                // Se quiser que apareça uma vez só e fique, remova ou comente esta linha:
                entry.target.classList.remove("show");
            }
        });
    };

    // 3. Criando a instância do Observer
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // 4. Selecionando todos os elementos que devem ser animados (Genéricos + Formação)
    const elementsToAnimate = document.querySelectorAll(`
        .formacao-item, 
        .card, 
        .sobre-content, 
        .hero-content, 
        .hero-image, 
        .contato-card
    `);

    // 5. Colocando o Observer para monitorar cada um dos elementos
    elementsToAnimate.forEach(element => {
        // Garante que o elemento existe na página antes de observar para evitar erros no console
        if (element) {
            scrollObserver.observe(element);
        }
    });
});

const elementosAnimados = document.querySelectorAll(
    ".card, .sobre-content, .hero-content, .hero-image, .contato-card"
);

const observerGeral = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            observerGeral.unobserve(entry.target); /* Dispara apenas uma vez */

        }

    });

}, { threshold: 0.15 });

elementosAnimados.forEach(el => observerGeral.observe(el));

/* ── Observer da Formação — efeito storytelling com delay escalonado ── */

const formacaoItems = document.querySelectorAll(".formacao-item");

const observerFormacao = new IntersectionObserver((entries) => {

    entries.forEach((entry, i) => {

        if (entry.isIntersecting) {

            /*
             * Delay progressivo: cada item aparece 120ms depois do anterior.
             * O índice real do elemento na NodeList garante a sequência correta.
             */
            const indexEl = Array.from(formacaoItems).indexOf(entry.target);

            setTimeout(() => {

                entry.target.classList.add("show");

            }, indexEl * 120);

            observerFormacao.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px" /* Inicia a animação um pouco antes */

});

formacaoItems.forEach(item => observerFormacao.observe(item));

/* =========================================================
   ANIMAÇÃO CONTATOS — fade-in escalonado via Observer
   (substitui o setTimeout cego que rodava sem esperar scroll)
========================================================= */

const contatoCards = document.querySelectorAll(".contato-card");

const observerContato = new IntersectionObserver((entries) => {

    entries.forEach((entry, i) => {

        if (entry.isIntersecting) {

            const indexEl = Array.from(contatoCards).indexOf(entry.target);

            setTimeout(() => {

                entry.target.style.opacity   = "1";
                entry.target.style.transform = "translateY(0)";

            }, indexEl * 150);

            observerContato.unobserve(entry.target);

        }

    });

}, { threshold: 0.2 });

/* Parte do estado inicial oculto */
contatoCards.forEach(card => {

    card.style.opacity   = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observerContato.observe(card);

});

/* =========================================================
   ESTILOS DINÂMICOS — injetados via JS
   (mantém tudo em um único arquivo; sem dependência extra de CSS)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const style = document.createElement("style");

    style.innerHTML = `

        /* ── Elementos animados via Observer ── */
        .card,
        .sobre-content,
        .hero-content,
        .hero-image,
        .contato-card {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* ── Formação — animação storytelling ── */
        .formacao-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .formacao-col:nth-child(2) .formacao-item {
            transform: translateX(30px);
        }

        .formacao-item.show {
            opacity: 1;
            transform: translateX(0);
        }

        /* ── Modal — transição de entrada e saída ── */
        .modal {
            opacity: 0;
            transition: opacity 0.35s ease;
            pointer-events: none;
        }

        .modal.modal-ativo {
            opacity: 1;
            pointer-events: all;
        }

        .modal-content {
            transform: translateY(30px) scale(0.97);
            transition: transform 0.35s ease;
        }

        .modal.modal-ativo .modal-content {
            transform: translateY(0) scale(1);
        }

        /* ── Filtros do portfólio ── */
        .filtro-btn {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        /* ── Botão Voltar ao Topo ── */
        .btn-topo {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 55px;
            height: 55px;
            border: none;
            border-radius: 50%;
            background: #ff5ebc;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.3s ease;
            z-index: 999;
            box-shadow: 0 10px 25px rgba(255, 94, 188, 0.35);
        }

        .btn-topo.show-top {
            opacity: 1;
            visibility: visible;
        }

        .btn-topo:hover {
            transform: translateY(-5px);
        }

        /* ── Header com scroll ── */
        .scroll-header {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        body.dark-mode .scroll-header {
            background: rgba(15, 15, 15, 0.95);
        }

    `;

    document.head.appendChild(style);

});

/* =========================================================
   CONSOLE PERSONALIZADO
========================================================= */

console.log(`

🎀 Portfólio Lorraini Paris — carregado com sucesso!
   Publicidade • Branding • Social Media
   Desenvolvido por Levy Andrade — v2.0

`);
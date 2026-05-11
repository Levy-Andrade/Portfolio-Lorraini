/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-list");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("open");

    });

}

/* =========================================================
   DARK MODE
========================================================= */

const darkModeToggle =
document.getElementById("dark-mode-toggle");

/* VERIFICA LOCAL STORAGE */

const darkModeAtivo =
localStorage.getItem("darkMode");

if (darkModeAtivo === "enabled") {

    document.body.classList.add("dark-mode");

    darkModeToggle.checked = true;

}

/* ALTERA DARK MODE */

if (darkModeToggle) {

    darkModeToggle.addEventListener("change", () => {

        if (darkModeToggle.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "darkMode",
                "enabled"
            );

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem(
                "darkMode",
                "disabled"
            );

        }

    });

}

/* =========================================================
   SCROLL SUAVE MENU
========================================================= */

document.querySelectorAll(".nav-list a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const id = this.getAttribute("href");

        const section =
        document.querySelector(id);

        if (section) {

            section.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

        /* FECHA MENU MOBILE */

        if (navMenu) {

            navMenu.classList.remove("active");

        }

    });

});

/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scroll-header");

    } else {

        header.classList.remove("scroll-header");

    }

});

/* =========================================================
   ANIMAÇÃO AO SCROLL
========================================================= */

const elementosAnimados =
document.querySelectorAll(

    ".card, .item, .sobre-content, .hero-content, .hero-image, .contato-card"

);

const observer =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

elementosAnimados.forEach(elemento => {

    observer.observe(elemento);

});

/* =========================================================
   MODAL PROJETOS
========================================================= */

const modal =
document.getElementById("modalProjeto");

const modalImg =
document.getElementById("modalImg");

const modalTitle =
document.getElementById("modalTitle");

const modalDesc =
document.getElementById("modalDesc");

const closeModal =
document.querySelector(".close-modal");

/* =========================================================
   ABRIR MODAL
========================================================= */

function abrirProjeto(img, title, desc) {

    if (modal) {

        modal.style.display = "flex";

        modalImg.src = img;

        modalTitle.innerHTML = title;

        modalDesc.innerHTML = desc;

        document.body.style.overflow = "hidden";

    }

}

/* =========================================================
   FECHAR MODAL
========================================================= */

function fecharModal() {

    modal.style.display = "none";

    document.body.style.overflow = "auto";

}

/* BOTÃO FECHAR */

if (closeModal) {

    closeModal.addEventListener("click", () => {

        fecharModal();

    });

}

/* FECHAR CLICANDO FORA */

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        fecharModal();

    }

});

/* =========================================================
   EFEITO DIGITAÇÃO HERO
========================================================= */

const texto =
"Publicidade • Branding • Marketing Digital";

const elementoTexto =
document.querySelector(".hero-content p");

if (elementoTexto) {

    let index = 0;

    elementoTexto.innerHTML = "";

    function digitar() {

        if (index < texto.length) {

            elementoTexto.innerHTML +=
            texto.charAt(index);

            index++;

            setTimeout(digitar, 45);

        }

    }

    digitar();

}

/* =========================================================
   BOTÃO VOLTAR TOPO
========================================================= */

const btnTopo =
document.createElement("button");

btnTopo.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

btnTopo.classList.add("btn-topo");

document.body.appendChild(btnTopo);

/* MOSTRAR BOTÃO */

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        btnTopo.classList.add("show-top");

    } else {

        btnTopo.classList.remove("show-top");

    }

});

/* VOLTAR TOPO */

btnTopo.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* =========================================================
   EFEITO HOVER CARDS
========================================================= */

const cards =
document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty(
            "--x",
            `${x}px`
        );

        card.style.setProperty(
            "--y",
            `${y}px`
        );

    });

});

/* =========================================================
   ANIMAÇÃO CONTATOS
========================================================= */

const contatoCards =
document.querySelectorAll(".contato-card");

contatoCards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
    "translateY(40px)";

    setTimeout(() => {

        card.style.transition =
        "0.6s ease";

        card.style.opacity = "1";

        card.style.transform =
        "translateY(0)";

    }, index * 150);

});

/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const loader =
    document.querySelector(".preloader");

    if (loader) {

        loader.classList.add("loader-hidden");

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

/* =========================================================
   CONSOLE PERSONALIZADO
========================================================= */

console.log(`

🎀 Portfólio Lorraini Paris carregado com sucesso!

Publicidade • Branding • Social Media
Desenvolvido por Levy Andrade.

`);

/* =========================================================
   CRIA CLASSE SHOW
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const style =
    document.createElement("style");

    style.innerHTML = `

        .card,
        .item,
        .sobre-content,
        .hero-content,
        .hero-image,
        .contato-card{

            opacity:0;

            transform:translateY(40px);

            transition:0.8s ease;

        }

        .show{

            opacity:1 !important;

            transform:translateY(0) !important;

        }

        .btn-topo{

            position:fixed;

            bottom:25px;
            right:25px;

            width:55px;
            height:55px;

            border:none;

            border-radius:50%;

            background:#ff5ebc;

            color:#fff;

            font-size:18px;

            cursor:pointer;

            opacity:0;

            visibility:hidden;

            transition:0.4s ease;

            z-index:999;

            box-shadow:0 10px 25px rgba(255,94,188,0.3);

        }

        .btn-topo.show-top{

            opacity:1;

            visibility:visible;

        }

        .btn-topo:hover{

            transform:translateY(-5px);

        }

        .scroll-header{

            background:rgba(255,255,255,0.95);

            box-shadow:0 5px 20px rgba(0,0,0,0.05);

        }

        body.dark-mode .scroll-header{

            background:rgba(15,15,15,0.95);

        }

    `;

    document.head.appendChild(style);

});
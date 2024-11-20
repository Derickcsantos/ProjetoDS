const perfilBtn = document.getElementById("perfilBtn");
const dadosCard = document.getElementById("dadosCard");
const closeBtn = document.getElementById("closeBtn");

    function abrirCard(){
        let on = dadosCard.style.display = "block";
        return on
    };

    function closeCard(){
        let off = dadosCard.style.display = "none";
        return off
    };

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
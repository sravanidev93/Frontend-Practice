document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menuButton");
    const close = document.getElementById("closeButton");
    const links = document.querySelector(".links");

    function toggleMenu() {
        links.classList.toggle('active');

        if (links.classList.contains('active')) {
            menu.style.display = "none";
            close.style.display = "block";
        } else {
            menu.style.display = "block";
            close.style.display = "none";
        }
    }

    menu.addEventListener('click', toggleMenu);
    close.addEventListener('click', toggleMenu);
});

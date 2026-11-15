/* ==========================================
   RADIOSHOP - VIDEO ANUNCIOS
========================================== */


/* ==========================================
   MENÚ MÓVIL
========================================== */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");

mobileMenuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});


/* ==========================================
   ME GUSTA
========================================== */

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const countElement = button.querySelector(".like-count");

        let count = parseInt(countElement.textContent);

        if (button.classList.contains("liked")) {

            count--;

            button.classList.remove("liked");

            button.querySelector("span:first-child").textContent = "♡";

        } else {

            count++;

            button.classList.add("liked");

            button.querySelector("span:first-child").textContent = "♥";

        }

        countElement.textContent = count;

    });

});


/* ==========================================
   MOSTRAR COMENTARIOS
========================================== */

const commentButtons = document.querySelectorAll(".comment-btn");

commentButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".video-card");

        const commentSection =
            card.querySelector(".comment-section");

        commentSection.classList.toggle("visible");

        if (commentSection.classList.contains("visible")) {

            const input =
                commentSection.querySelector(".comment-input");

            input.focus();

        }

    });

});


/* ==========================================
   PUBLICAR COMENTARIOS
========================================== */

const sendButtons = document.querySelectorAll(".send-comment");

sendButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const section =
            button.closest(".comment-section");

        const input =
            section.querySelector(".comment-input");

        const commentsList =
            section.querySelector(".comments-list");

        const text = input.value.trim();

        if (text === "") {

            alert("Escribe un comentario antes de publicar.");

            return;

        }


        const comment = document.createElement("div");

        comment.classList.add("comment");

        comment.innerHTML = `
            <strong>Usuario</strong>
            <br>
            ${escapeHTML(text)}
        `;

        commentsList.appendChild(comment);

        input.value = "";

    });

});


/* ==========================================
   ENTER PARA PUBLICAR COMENTARIO
========================================== */

const commentInputs =
    document.querySelectorAll(".comment-input");

commentInputs.forEach(function(input) {

    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            const button =
                input.parentElement.querySelector(".send-comment");

            button.click();

        }

    });

});


/* ==========================================
   COMPARTIR
========================================== */

const shareButtons =
    document.querySelectorAll(".share-btn");

shareButtons.forEach(function(button) {

    button.addEventListener("click", async function() {

        const card =
            button.closest(".video-card");

        const title =
            card.querySelector(".video-description h2").textContent.trim();

        const shareData = {

            title: "RADIOSHOP",

            text: title,

            url: window.location.href

        };


        if (navigator.share) {

            try {

                await navigator.share(shareData);

            } catch (error) {

                console.log("Compartir cancelado.");

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert("Enlace copiado al portapapeles.");

            } catch (error) {

                alert(
                    "Copia manualmente este enlace: " +
                    window.location.href
                );

            }

        }

    });

});


/* ==========================================
   BUSCADOR
========================================== */

const searchInput =
    document.getElementById("searchInput");

const videoCards =
    document.querySelectorAll(".video-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCards = 0;


    videoCards.forEach(function(card) {

        const content =
            card.textContent.toLowerCase();

        if (content.includes(searchText)) {

            card.style.display = "block";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCards === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

});


/* ==========================================
   CERRAR MENÚ MÓVIL AL SELECCIONAR
========================================== */

const menuItems =
    document.querySelectorAll(".menu-item");

menuItems.forEach(function(item) {

    item.addEventListener("click", function() {

        sidebar.classList.remove("open");

    });

});


/* ==========================================
   SEGURIDAD PARA COMENTARIOS
========================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
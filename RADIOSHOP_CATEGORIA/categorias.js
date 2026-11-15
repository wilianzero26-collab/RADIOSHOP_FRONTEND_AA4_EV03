/* ==========================================
   RADIOSHOP - CATEGORÍAS
========================================== */


/* ==========================================
   MENÚ MÓVIL
========================================== */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebar =
    document.getElementById("sidebar");


mobileMenuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("open");

});


/* ==========================================
   CERRAR MENÚ AL SELECCIONAR
========================================== */

const menuItems =
    document.querySelectorAll(".menu-item");


menuItems.forEach(function(item) {

    item.addEventListener("click", function() {

        sidebar.classList.remove("open");

    });

});


/* ==========================================
   BUSCADOR DE CATEGORÍAS
========================================== */

const searchInput =
    document.getElementById("searchInput");

const categoryCards =
    document.querySelectorAll(".category-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    let found = 0;


    categoryCards.forEach(function(card) {

        const categoryText =
            card.dataset.category.toLowerCase();

        const visibleText =
            card.textContent.toLowerCase();


        if (
            categoryText.includes(searchText) ||
            visibleText.includes(searchText)
        ) {

            card.style.display = "flex";

            found++;

        } else {

            card.style.display = "none";

        }

    });


    if (found === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

});


/* ==========================================
   BOTÓN DE UBICACIÓN
========================================== */

const locationButton =
    document.getElementById("locationButton");

const locationMessage =
    document.getElementById("locationMessage");


locationButton.addEventListener("click", function() {


    if (!navigator.geolocation) {

        locationMessage.textContent =
            "Tu navegador no permite obtener la ubicación.";

        return;

    }


    locationMessage.textContent =
        "📍 Buscando tu ubicación...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            locationMessage.innerHTML = `
                📍 Ubicación encontrada.
                <br>
                <small>
                    Latitud: ${latitude.toFixed(5)}
                    |
                    Longitud: ${longitude.toFixed(5)}
                </small>
                <br>
                <strong>
                    Próximamente RADIOSHOP podrá mostrar
                    los negocios más cercanos.
                </strong>
            `;

        },


        function(error) {

            locationMessage.textContent =
                "📍 No fue posible obtener tu ubicación. Revisa los permisos del navegador.";

        }

    );

});


/* ==========================================
   BOTONES "VER NEGOCIOS"
========================================== */

const categoryButtons =
    document.querySelectorAll(".category-button");


categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".category-card");

        const categoryName =
            card.querySelector("h2").textContent;


        alert(
            "RADIOSHOP\n\n" +
            "Categoría seleccionada: " +
            categoryName +
            "\n\n" +
            "Aquí se mostrarán los negocios físicos disponibles."
        );

    });

});
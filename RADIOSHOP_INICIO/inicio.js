/* =====================================
   CONTADOR DEL CARRITO
===================================== */

const contador =
    document.getElementById("contador-carrito");

let cantidad =
    Number(
        localStorage.getItem("radioshopCarrito")
    ) || 2;

contador.textContent = cantidad;


/* =====================================
   AGREGAR PRODUCTO AL CARRITO
===================================== */

const botones =
    document.querySelectorAll(".agregar-carrito");


botones.forEach(function(boton) {

    boton.addEventListener("click", function() {

        cantidad++;

        localStorage.setItem(
            "radioshopCarrito",
            cantidad
        );

        contador.textContent = cantidad;


        const textoOriginal =
            boton.textContent;


        boton.textContent =
            "✓ Producto agregado";


        setTimeout(function() {

            boton.textContent =
                textoOriginal;

        }, 1200);

    });

});


/* =====================================
   ORDENAR PRODUCTOS
===================================== */

const ordenar =
    document.getElementById("ordenar");

const contenedor =
    document.getElementById("productos");


ordenar.addEventListener("change", function() {

    const productos =
        [...document.querySelectorAll(".producto")];


    /* PRECIO MENOR */

    if (this.value === "menor") {

        productos.sort(function(a, b) {

            return (
                Number(a.dataset.precio) -
                Number(b.dataset.precio)
            );

        });

    }


    /* PRECIO MAYOR */

    if (this.value === "mayor") {

        productos.sort(function(a, b) {

            return (
                Number(b.dataset.precio) -
                Number(a.dataset.precio)
            );

        });

    }


    /* VOLVER A DESTACADOS */

    if (this.value === "destacados") {

        productos.sort(function(a, b) {

            return 0;

        });

    }


    productos.forEach(function(producto) {

        contenedor.appendChild(producto);

    });

});
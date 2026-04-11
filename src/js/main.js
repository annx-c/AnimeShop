import { productos } from "./productos.js";

const contenedorProductos = document.getElementById("contenedor_productos");

// Función para cargar los productos en el contenedor
function cargarProductos() {
  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");
    divProducto.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
        <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
    `;

    contenedorProductos.append(divProducto); 
  });
}

cargarProductos();

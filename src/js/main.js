import { productos } from "./productos.js";

const contenedorProductos = document.getElementById("contenedor_productos");
const botonesCategorias = document.querySelectorAll(".btn-categorias");
const tituloPrincipal = document.getElementById("titulo_principal");
const numeroProductos = document.getElementById("numero_producto");
let botonesAgregar;
const productoEnCarrito = [];

// Función para cargar los productos en el contenedor
function cargarProductos(productosFiltrados) {
  contenedorProductos.innerHTML = "";

  productosFiltrados.forEach((producto) => {
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
  actualizarBotonesAgregar();
}

cargarProductos(productos);

// Agregar evento para filtrar los productos
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const categoriaNombre = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id,
      ); // Cambiar el título principal al nombre de la categoría seleccionada
      tituloPrincipal.innerText = categoriaNombre.categoria.nombre;
      const categoriaSeleccionada = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id,
      ); // Filtrar productos por categoría y obtener el ID del botón clickeado
      cargarProductos(categoriaSeleccionada);
    } else {
      tituloPrincipal.innerText = "Todos los Productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton,
  );

  if (productoEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productoEnCarrito.findIndex(
      (producto) => producto.id === idBoton,
    );
    productoEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productoEnCarrito.push(productoAgregado);
  }

  actualizarNumeroProductos();

  localStorage.setItem("carrito", JSON.stringify(productoEnCarrito));
}


function actualizarNumeroProductos() {
  let numero = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
  numeroProductos.innerText = numero;
}
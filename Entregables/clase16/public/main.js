const socket = io();

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };
  socket.emit('new_message', mensaje);
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  const { author, text, date } = mensaje;
  return `
    <div class="message">
      <strong>${author}</strong>
      <em class="date">${date}</em>
      <em class="msj">${text}</em>
    </div>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
}


const enviarProducto = () => {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const producto = { title, price , thumbnail };
  socket.emit('new_product', producto);
  return false;
}

const crearEtiquetasProductos= (producto) => {
  const { id, title, price,thumbnail } = producto;
  return `
  <tr>
  <th>${id}</td>  
  <td>${title}</td>
  <td>${price}</td>
  <td>${thumbnail}</td>
  </tr>
  `;
}

const agregarProductos = (productos) => {
  const headtable = `<table class="table">
  <thead>
  <tr>
    <th>#</th>
    <th>Title</th>
    <th>Price</th>
    <th>Thumbnail</th>
  </tr>
</thead>
  <tbody>`
  const foottable = `</tbody>
  </table>`
  const productos2 = productos.map(producto => crearEtiquetasProductos(producto)).join(" ");
  const productosFinal = headtable.concat(productos2,foottable);
  document.getElementById("products").innerHTML = productosFinal;
}


socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('products', (products) => agregarProductos(products));
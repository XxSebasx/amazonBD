

document.getElementById("formCliente").addEventListener("submit", addClient);
document.getElementById("getCliente").addEventListener("click", getClientById);

document.getElementById("formPedido").addEventListener("submit", addPedido);

document.getElementById("updatePedido").addEventListener("click", updatePedido);

document.getElementById("deletePedido").addEventListener("click", deletePedido);

document.getElementById("getClientesCompendidos").addEventListener("click", getClientesCompendidos);

document.getElementById("getPedidosFecha").addEventListener("click", getPedidosByDate);

document.getElementById("getTotalPedido").addEventListener("click", totalPedidoClienteByID);

document.getElementById("deleteCliente").addEventListener("click",deleteCliente);

getClients();
getPedidos();

async function addClient(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;

  const response = await fetch("/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, email, telefono }),
  });

  if (response.ok) {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    getClients();
  } else {
    const error = await response.json();
    alert(error.error);
  }
}

async function getClients() {
  const response = await fetch("/clientes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const clientes = await response.json();
    let tabla = document.getElementById("tbodyClientes");
    let filas = "";
    for (let index = 0; index < clientes.length; index++) {
      let cliente = clientes[index];
      filas += `<tr>
            <td>${cliente.ID}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>`
            ;
    }
    tabla.innerHTML = filas;
  } else {
    const error = await response.json();
    alert(error.error);
  }
}

async function getClientById() {
  const id = document.getElementById("idCliente").value;
  const response = await fetch(`/clientes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const cliente = await response.json();
  let table = document.getElementById("tbodyPedidos");
  let table2 = document.getElementById("tbodyClientes");
  table2.innerHTML = `<tr>
        <td>${cliente.ID}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        </tr>`;
  let filas = "";
  if (response.ok) {
    for (let i = 0; i < cliente.pedidos.length; i++) {
      filas += `<tr>
        <td>${cliente.pedidos[i].ID}</td>
        <td>${cliente.pedidos[i].fecha}</td>
        <td>${cliente.pedidos[i].monto}</td>
        <td>${cliente.pedidos[i].estado}</td>
        <td>${cliente.pedidos[i].clienteID}</td>
        <td>${cliente.nombre}</td>
      </tr>`;
      console.log(cliente.pedidos[i]);
    }
    table.innerHTML = filas;
  }
}

async function addPedido(event) {
  event.preventDefault();
  const clienteID = document.getElementById("clienteID").value;
  const fecha = new Date(document.getElementById("fecha").value);
  const monto = parseFloat(document.getElementById("monto").value);
  const response = await fetch("/pedidos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fecha, monto, clienteID }),
  });

  try {
    if (response.ok) {
      document.getElementById("fecha").value = "";
      document.getElementById("monto").value = "";
      document.getElementById("clienteID").value = "";
      alert("Pedido agregado exitosamente");
      getPedidos();
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteCliente() {
  const id = document.getElementById("idCliente").value;
  const response = await fetch(`/clientes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  getClients();
  getPedidos();
}

async function getPedidos() {
  const response = await fetch("/pedidos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const pedidos = await response.json();
    let tabla = document.getElementById("tbodyPedidos");
    let filas = "";
    for (let index = 0; index < pedidos.length; index++) {
      filas += `<tr>
      <td>${pedidos[index].ID}</td>
      <td>${pedidos[index].fecha}</td>
      <td>${pedidos[index].monto}</td>
      <td>${pedidos[index].estado}</td>
      <td>${pedidos[index].clienteID}</td>
      <td>${pedidos[index].Cliente.nombre}</td>
      </tr>`;
    }
    tabla.innerHTML = filas;
  } else {
    const error = await response.json();
    alert(error.error);
  }
}

async function getPedidoById() {
  const id = document.getElementById("idPedido").value;
  const response = await fetch(`/pedidos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const pedido = await response.json();
  let tabla = document.getElementById("tbodyPedidos");
  let filas = "";
  if (response.ok) {
    filas += `<tr>
      <td>${pedido.ID}</td>
      <td>${pedido.fecha}</td>
      <td>${pedido.monto}</td>
      <td>${pedido.estado}</td>
      <td>${pedido.clienteID}</td>
      </tr>`;
    tabla.innerHTML = filas;
  }

}

async function updatePedido() {
  const id = document.getElementById("idPedido").value;
  const estado = document.getElementById("nuevoEstado").value;
  const response = await fetch(`/pedidos/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado }),
  });
  if (response.ok) {
    getPedidos();
  } else {
    const error = await response.json();
    alert(error.error);
  }
}

async function deletePedido() {
  const id = document.getElementById("idPedido").value;
  const response = await fetch(`/pedidos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    alert("Pedido eliminado exitosamente");
    getPedidos();
  } else {
    const error = await response.json();
    alert(error.error);
  }
}

async function getClientesCompendidos() {
  const response = await fetch("/clientescompendidos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const clientesCompendidos = await response.json();
    let tabla = document.getElementById("tablaAvanzada");
    let filas = "<tr><th>ID cliente</th><th>Nombre</th><th>email</th><th>telefono</th><th>cantidad de</th></tr>";
    for (let index = 0; index < clientesCompendidos.length; index++) {
      filas += `<tr>
        <td>${clientesCompendidos[index].ID}</td>
        <td>${clientesCompendidos[index].nombre}</td>
        <td>${clientesCompendidos[index].email}</td>
        <td>${clientesCompendidos[index].telefono}</td>
        <td>${clientesCompendidos[index].pedidos.length}</td>
      </tr>`;
    }
    tabla.innerHTML = filas;
  }
}



async function totalPedidoClienteByID() {
  try {
    const id = document.getElementById("idTotal").value;
    const response = await fetch(`/totalpedidos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const total = await response.json();
    document.getElementById("tablaAvanzada").innerHTML = `<tr><th>ID cliente</th><th>total</th></tr><tr><td>${id}</td> <td>${total}</td></tr>`;
    
  } catch (error) {
    console.error(error);
  }
}






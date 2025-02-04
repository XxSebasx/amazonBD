document.getElementById("formCliente").addEventListener("submit", addClient);
document.getElementById("getCliente").addEventListener("click", getClientById);

document.getElementById("formPedido").addEventListener("submit", addPedido);

getClients();

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
            <td>${cliente.telefono}</td>`;
    }
    tabla.innerHTML = filas;
    console.log(clientes);
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
  console.log(cliente);
}

async function addPedido(event) {
    event.preventDefault();
    const clienteID = document.getElementById("clienteID").value;
    const fecha = new Date(document.getElementById("fecha").value);
    const monto = document.getElementById("monto").value;
    const response = await fetch('/pedidos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fecha, monto,clienteID }),
    });
    
    try {
        if (response.ok) {
            document.getElementById("fecha").value = "";
            document.getElementById("monto").value = "";
            document.getElementById("clienteID").value = "";
            alert("Pedido agregado exitosamente");
        } else {
            const error = await response.json();
            alert(error.error);
        }
    }catch(error){
        console.error(error);
    }
}

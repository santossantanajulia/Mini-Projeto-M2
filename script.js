document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-cadastro");
    const listaPedidos = document.getElementById("pedido-açai");
    let pedidos = [];
    let indexEditando = null;
  
    // Envio do pedido
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const tamanho = document.getElementById("tamanho").value;
      const fruta = document.getElementById("fruta").value;
      const acompanhamento = document.getElementById("acompanhamento").value;
      const cobertura = document.getElementById("cobertura").value;
      const pedido = { tamanho, fruta, acompanhamento, cobertura };
  
      // Verifica se o pedido está sendo editado ou se será feito um novo pedido
      if (indexEditando !== null) {
        pedidos[indexEditando] = pedido;
        indexEditando = null;
      } else {
        pedidos.push(pedido);
      }
  
      // Limpa o formulário e atualiza a lista de pedidos
      form.reset();
      renderizarPedidos();
    });
  
    // Função para renderizar os pedidos na tela
    function renderizarPedidos() {
      listaPedidos.innerHTML = ""; // Limpa a lista atual de pedidos
  
      pedidos.forEach((pedido, index) => {
        const li = document.createElement("li");
  
        li.innerHTML = `
          <p><strong>Tamanho:</strong> ${pedido.tamanho}</p>
          <p><strong>Fruta:</strong> ${pedido.fruta}</p>
          <p><strong>Acompanhamento:</strong> ${pedido.acompanhamento}</p>
          <p><strong>Cobertura:</strong> ${pedido.cobertura || "Nenhuma"}</p>
          <br>
          <button class="btn-editar">Editar</button>
          <button class="btn-deletar">Excluir</button>
        `;
  
        // Adiciona os eventos de edição e exclusão
        li.querySelector(".btn-editar").addEventListener("click", () => editarPedido(index));
        li.querySelector(".btn-deletar").addEventListener("click", () => excluirPedido(index));
  
        listaPedidos.appendChild(li);
      });
    }
  
    // Função para editar o pedido
    function editarPedido(index) {
      const pedido = pedidos[index];
      document.getElementById("tamanho").value = pedido.tamanho;
      document.getElementById("fruta").value = pedido.fruta;
      document.getElementById("acompanhamento").value = pedido.acompanhamento;
      document.getElementById("cobertura").value = pedido.cobertura || "";
      indexEditando = index;
    }
  
    // Função para excluir o pedido
    function excluirPedido(index) {
      pedidos.splice(index, 1);
      renderizarPedidos();
    }
  });
  
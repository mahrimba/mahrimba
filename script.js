    const clienteForm = document.getElementById("clienteForm");
    const fornecedorForm = document.getElementById("fornecedorForm");

    const clienteTable = document.querySelector("#clienteTable tbody");
    const fornecedorTable = document.querySelector("#fornecedorTable tbody");
    const transacaoTable = document.querySelector("#transacaoTable tbody");

    const clienteRelacionado = document.getElementById("clienteRelacionado");

    let clientes = [];
    let fornecedores = [];

    clienteForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("clienteNome").value;
      const milhas = parseInt(document.getElementById("milhas").value);
      const preco = parseFloat(document.getElementById("preco").value);
      const taxas = parseFloat(document.getElementById("taxas").value);

      clientes.push({ nome, milhas, preco, taxas });

      const row = clienteTable.insertRow();
      row.innerHTML = `<td>${nome}</td><td>${milhas}</td><td>${preco.toFixed(2)}</td><td>${taxas.toFixed(2)}</td>`;

      const option = document.createElement("option");
      option.value = nome;
      option.textContent = nome;
      clienteRelacionado.appendChild(option);

      clienteForm.reset();
    });

    fornecedorForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fornecedorNome = document.getElementById("fornecedorNome").value;
      const custo = parseFloat(document.getElementById("custo").value);
      const clienteNome = clienteRelacionado.value;
      const companhia = document.getElementById("companhia").value;

      fornecedores.push({ fornecedorNome, custo, clienteNome, companhia });

      const row = fornecedorTable.insertRow();
      row.innerHTML = `<td>${fornecedorNome}</td><td>${custo.toFixed(2)}</td><td>${clienteNome}</td><td>${companhia}</td>`;

      const cliente = clientes.find(c => c.nome === clienteNome);
      if (cliente) {
        const valorPago = ((cliente.milhas / 1000) * custo) + cliente.taxas;
        const transacaoRow = transacaoTable.insertRow();
        transacaoRow.innerHTML = `
          <td>${clienteNome}</td>
          <td>${fornecedorNome}</td>
          <td>${cliente.preco.toFixed(2)}</td>
          <td>${custo.toFixed(2)}</td>
          <td>${cliente.milhas}</td>
          <td>${cliente.taxas.toFixed(2)}</td>
          <td>${valorPago.toFixed(2)}</td>
          <td><input type='checkbox'></td>
          <td><input type='checkbox'></td>`;
      }

      fornecedorForm.reset();
    });

let listaProdutos = [];

function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const quantidade = document.getElementById("quantidade").value;
  const valor = document.getElementById("valor").value;

  const produto = { nome, quantidade, valor };
  listaProdutos.push(produto);

  atualizarTabela();
  calcularTotal();
  salvarListaNoLocalStorage();
  
  // limpar o formulário
  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
}

function atualizarTabela() {
  const tbody = document.getElementById("lista-produtos");
  tbody.innerHTML = "";

  for (let i = 0; i < listaProdutos.length; i++) {
    const produto = listaProdutos[i];
    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = produto.nome;
    tr.appendChild(tdNome);

    const tdQuantidade = document.createElement("td");
    tdQuantidade.textContent = produto.quantidade;
    tr.appendChild(tdQuantidade);

    const tdValor = document.createElement("td");
    tdValor.textContent = produto.valor;
    tr.appendChild(tdValor);

    const tdAcoes = document.createElement("td");
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = () => editarProduto(i);
    tdAcoes.appendChild(botaoEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = () => excluirProduto(i);
    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  }
}

function editarProduto(index) {
  const produto = listaProdutos[index];
  document.getElementById("nome").value = produto.nome;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("valor").value = produto.valor;

  listaProdutos.splice(index, 1);
  atualizarTabela();
}

function excluirProduto(index) {
  listaProdutos.splice(index, 1);
  atualizarTabela();
  calcularTotal();
  salvarListaNoLocalStorage();
}

function calcularTotal() {
  let total = 0;

  for (const produto of listaProdutos) {
    const valor = parseFloat(produto.valor);
    const quantidade = parseFloat(produto.quantidade);
    total += valor * quantidade;
  }

  const resultado = document.getElementById("resultado");
  resultado.textContent = `Total da Compra: R$ ${total.toFixed(2)}`;
}

function exportarLista() {
  const csvContent = "data:text/csv;charset=utf-8," + listaProdutos.map(e => Object.values(e).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "lista_produtos.csv");
  document.body.appendChild(link);

  link.click();
}

function salvarListaNoLocalStorage() {
  localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos));
}

function recuperarListaDoLocalStorage() {
  const listaSalva = localStorage.getItem("listaProdutos");

  if (listaSalva) {
    listaProdutos = JSON.parse(listaSalva);
    atualizarTabela();
    calcularTotal();
  }
}

recuperarListaDoLocalStorage();


function getNextId() {
  let proximoId = localStorage.getItem("proximoId") || 1;
  localStorage.setItem("proximoId", proximoId++);
  return proximoId;
}

buscarDados();
function adicionarChurrasco() {
  let data = document.getElementById("data").value;
  let qtdHomens = parseInt(document.getElementById("qtdHomens").value);
  let qtdMulheres = parseInt(document.getElementById("qtdMulheres").value);
  let qtdCriancas = parseInt(document.getElementById("qtdCriancas").value);
  let qtdPessoas = qtdCriancas + qtdMulheres + qtdHomens;
  let carnes = qtdHomens * 0.4 + qtdMulheres * 0.32 + qtdCriancas * 0.2;
  let paoDeAlho = (qtdHomens + qtdMulheres) * 2 + qtdCriancas;
  let carvao = qtdHomens + qtdMulheres + qtdCriancas;
  let refrigerantes = carvao / 5;
  let cerveja = (qtdHomens + qtdMulheres) * 3;

  const novoRegistro = {
    data,
    qtdHomens,
    qtdMulheres,
    qtdCriancas,
    qtdPessoas,
    carnes,
    paoDeAlho,
    carvao,
    refrigerantes,
    cerveja,
  };

  criarPost(novoRegistro);
}

function adicionarRegistro(novoRegistro) {
  const tbody = document.getElementById("tbody");
  const novaLinha = tbody.insertRow(tbody.rows.length);
  const celData = novaLinha.insertCell(0);
  const celQtdPessoas = novaLinha.insertCell(1);
  const celCarnes = novaLinha.insertCell(2);
  const celPaoDeAlho = novaLinha.insertCell(3);
  const celCarvao = novaLinha.insertCell(4);
  const celRefrigerante = novaLinha.insertCell(5);
  const celCerveja = novaLinha.insertCell(6);
  const celAcao = novaLinha.insertCell(7);

  celData.innerText = novoRegistro.data;
  celQtdPessoas.innerText = novoRegistro.qtdPessoas;
  celCarnes.innerText = novoRegistro.carnes;
  celPaoDeAlho.innerText = novoRegistro.paoDeAlho;
  celCarvao.innerText = novoRegistro.carvao;
  celRefrigerante.innerText = novoRegistro.refrigerantes;
  celCerveja.innerText = novoRegistro.cerveja;
  celAcao.innerHTML = `
    <button onclick="editarRegistro(${novoRegistro.id})" class="editar-btn"><i class="fas fa-pencil-alt"></i></button>
    <button class="remover-btn" onclick="removerUltimoRegistro(event, ${novoRegistro.id})"><i class="fas fa-trash"></i></button>`;
}
async function editarRegistro(id) {
  window.location.href = `editarForm.html?id=${id}`;

}

function removerUltimoRegistro(event, id) {
  // Obtém o botão clicado
  console.log("chamou ultimo registro", id);
  const botaoClicado = event.target;

  // Verifica se o botão clicado é um botão de remoção
  if (
    botaoClicado.tagName === "BUTTON" &&
    botaoClicado.classList.contains("remover-btn")
  ) {
    // Obtém a linha (tr) correspondente ao botão clicado
    const linhaASerRemovida = botaoClicado.closest("tr");

    // Obtém o ID do registro a ser removido
    //const idRegistro = parseInt(linhaASerRemovida.cells[0].innerText);

    // Remove a linha da tabela
    linhaASerRemovida.remove();
    console.log("chamou ultimo registro 80 ", id);
    // Remove o registro do banco de dados
    removerRegistroNoBackend(id);
  }
}

async function removerRegistroNoBackend(id) {
  // Chama a API ou lógica para remover o registro do backend
  console.log(id);
  const response = await fetch(`http://localhost:3000/churrasco/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log(`Registro com ID ${id} removido do banco de dados.`);
  } else {
    console.error(`Erro ao remover registro do banco de dados.`);
  }
}

async function buscarDados() {
  const resp = await fetch("http://localhost:3000/churrasco");
  const data = await resp.json();
  data.forEach((item) => {
    adicionarRegistro(item);
  });
}

async function criarPost(registro) {
  const response = await fetch("http://localhost:3000/churrasco", {
    method: "POST",
    body: JSON.stringify(registro),
  });
}
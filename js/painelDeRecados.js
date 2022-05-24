const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "");

const form = document.querySelector("#formNovoRecado");
const corpoTabela = document.querySelector("#tbody");

let estamosEditando = false;
let indiceEdicao = 0;

const recuperarLocalStorage = () => {
  const listaDeRecados = JSON.parse(
    localStorage.getItem(usuarioLogado) || "[]"
  );
  return listaDeRecados;
};

const atualizarLocalStorage = (listaDeRecados) => {
  localStorage.setItem(usuarioLogado, JSON.stringify(listaDeRecados));
};

const salvarRecado = (event) => {
  event.preventDefault();

  const nome = form.nomeRecado.value;
  const descricao = form.descRecado.value;

  const listaDeRecados = recuperarLocalStorage();

  if (estamosEditando === true) {
    const recadoParaEditar = listaDeRecados[indiceEdicao];
    recadoParaEditar.nome = nome;
    recadoParaEditar.descricao = descricao;
    listaDeRecados[indiceEdicao] = recadoParaEditar;
    estamosEditando = false;
    alert("Recado editado com sucesso!");
  } else {
    listaDeRecados.push({
      id: definirID() + 1,
      nome,
      descricao,
    });
    alert("Recado adicionado com sucesso!");
  }

  atualizarLocalStorage(listaDeRecados);
  preencherTabela();
  form.reset();
};

const preencherTabela = () => {
  const listaDeRecados = recuperarLocalStorage();
  corpoTabela.innerHTML = "";
  for (const recado of listaDeRecados) {
    corpoTabela.innerHTML += `
          <tr>
            <td>${recado.id}</td>
            <td>${recado.nome}</td>
            <td>${recado.descricao}</td>
            <td>
              <img class="imgButton"
                src="./assets/iconeeditar.png"
                alt="imagem de anotacao"
                onclick="editarRecado(${recado.id})">
            </td>
            <td>
              <img class="imgButton"
                src="./assets/iconelixeira.png"
                alt="imagem de anotacao"
                onclick="removerRecado(${recado.id})">
            </td>
          </tr>
         `;
  }
};
const removerRecado = (id) => {
  const listaDeRecados = recuperarLocalStorage();
  const indiceRecado = listaDeRecados.findIndex((recado) => recado.id === id);
  if (indiceRecado < 0) return;
  listaDeRecados.splice(indiceRecado, 1);
  atualizarLocalStorage(listaDeRecados);
  alert("Recado removido com sucesso!");
  preencherTabela();
};

const editarRecado = (id) => {
  const listaDeRecados = recuperarLocalStorage();
  const indiceRecado = listaDeRecados.findIndex((recado) => recado.id === id);
  const recadoEdit = listaDeRecados[indiceRecado];
  form.nomeRecado.value = recadoEdit.nome;
  form.descRecado.value = recadoEdit.descricao;
  estamosEditando = true;
  indiceEdicao = indiceRecado;
};

const definirID = () => {
  let max = 0;
  const listaDeRecados = recuperarLocalStorage();
  listaDeRecados.forEach((recado) => {
    if (recado.id > max) {
      max = recado.id;
    }
  });
  return max;
};

form.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);

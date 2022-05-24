const form = document.querySelector("#formLogin");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuariosSalvos = JSON.parse(localStorage.getItem("users") || "[]");

  const login = form.login.value;
  const senha = form.senha.value;

  const usuarioEncontrado = usuariosSalvos.find(
    (usuario) => usuario.username === login && usuario.password === senha
  );

  if (usuarioEncontrado === undefined) {
    alert("Usuário ou senha inválida");
    return;
  }
  let usuarioLogado = form.login.value;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  location.href = "./painelDeRecados.html";
});

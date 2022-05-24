const form = document.querySelector("#formCadastro");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuariosSalvos = JSON.parse(localStorage.getItem("users") || "[]");

  const login = form.login.value;
  const senha = form.senha.value;
  const confSenha = form.confSenha.value;

  const usuarioJaExiste = usuariosSalvos.some(
    (usuario) => usuario.username === login
  );

  if (usuarioJaExiste) {
    alert("Usuário já cadastrado");
    return;
  }

  if (senha != confSenha) {
    alert("Alerta: senhas diferentes digitadas");
    return;
  }

  usuariosSalvos.push({
    username: login,
    password: senha,
  });

  localStorage.setItem("users", JSON.stringify(usuariosSalvos));
  alert("Usuário cadastrado com sucesso, faça seu login!");
  location.href = "./index.html";
});

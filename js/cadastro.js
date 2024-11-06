class RegistroUsuario extends AutUsuario {
    constructor(email, senha) {
        super(email, senha);
    }

    registro() {
        if (this.validarCampos()) {
            // Aqui você fará uma requisição ao backend para registrar o usuário no banco de dados
            console.log("Cadastro solicitado com:", this.email, this.senha);
            alert("Cadastro realizado com sucesso!"); // Remover depois de integrar com o banco
            // Exemplo para redirecionamento em caso de sucesso
            // window.location.href = "/login.html";
        }
    }
}

document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const novoUsuario = new RegistroUsuario(email, senha);
    novoUsuario.registro();
});

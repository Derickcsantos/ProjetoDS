class AutUsuario {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }

    validarCampos() {
        if (!this.email || !this.senha) {
            alert("Por favor, preencha todos os campos.");
            return false;
        }
        // Verifica o formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            alert("Por favor, insira um email válido.");
            return false;
        }
        return true;
    }

    login() {
        if (this.validarCampos()) {
            // Aqui você fará uma requisição ao backend para verificar as credenciais
            console.log("Login solicitado com:", this.email, this.senha);
            alert("Login realizado com sucesso!"); // Remover depois de integrar com o banco
            // Exemplo para redirecionamento em caso de sucesso
            // window.location.href = "/dashboard.html";
        }
    }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = new AutUsuario(email, senha);
    usuario.login();
});

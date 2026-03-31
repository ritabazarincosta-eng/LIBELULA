const scriptURL = "https://script.google.com/macros/s/AKfycby7U6ppM26VDbg6wyVB9VPxOKo_lwcaDP-0E4NSBXkpX8zeRUM1XXuuMAsl1bh5XIM0/exec";

// pega o formulário
const form = document.getElementById("form");

if(form){
form.addEventListener("submit", e => {
    e.preventDefault();

    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form)
    })
    .then(res => res.text())
    .then(msg => {
        alert("Cadastro realizado com sucesso!");

        // limpa o formulário
        form.reset();

        // opcional: redirecionar
        // window.location = "lista.html";
    })
    .catch(err => {
        alert("Erro ao salvar");
        console.error(err);
    });
});
}
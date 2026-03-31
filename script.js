const scriptURL = "https://script.google.com/macros/s/AKfycby7U6ppM26VDbg6wyVB9VPxOKo_lwcaDP-0E4NSBXkpX8zeRUM1XXuuMAsl1bh5XIM0/exec";

// ==========================
// 🚀 CADASTRO
// ==========================
const form = document.getElementById("form");

if(form){
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            let res = await fetch(scriptURL, {
                method: "POST",
                body: new FormData(form)
            });

            let msg = await res.text();

            alert("Cadastro realizado com sucesso!");

            form.reset();

            // 🔥 VOLTAR PRA HOME AUTOMÁTICO
            window.location.href = "home.html";

        } catch (err) {
            alert("Erro ao salvar cadastro");
            console.error(err);
        }
    });
}

// ==========================
// 👁️ MODAL / VISUALIZAÇÃO
// ==========================
let idAtual = null;

async function ver(id){

    try {
        idAtual = id;

        let res = await fetch(`${scriptURL}?id=${id}`);
        let d = await res.json();

        let html = `
        <p><b>👤 Nome:</b> ${d.nome_cliente || ""}</p>
        <p><b>📅 Nascimento:</b> ${d.data_nascimento || ""}</p>
        <p><b>🎂 Idade:</b> ${d.idade || ""}</p>

        <p><b>🧠 Motivo:</b><br>${d.motivo_atendimento || ""}</p>

        <p><b>🏥 Doença:</b> ${d.doenca_cronica || ""}</p>
        <p><b>⚠️ Vício:</b> ${d.vicio_compulsao || ""}</p>

        <p><b>💊 Tratamento:</b> ${d.tratamento_atual || ""}</p>
        <p><b>📆 Início:</b> ${d.inicio_tratamento || ""}</p>
        <p><b>📆 Término:</b> ${d.termino_tratamento || ""}</p>
        <p><b>⏳ Duração:</b> ${d.duracao_tratamento || ""}</p>

        <p><b>🪑 Mesas:</b> ${d.mesas_utilizadas || ""}</p>

        <p><b>📝 Sugestões:</b><br>${d.sugestoes_finais || ""}</p>
        `;

        document.getElementById("conteudoModal").innerHTML = html;
        document.getElementById("modal").style.display = "block";

    } catch (err) {
        alert("Erro ao carregar dados");
        console.error(err);
    }
}

// ==========================
// ❌ FECHAR MODAL
// ==========================
function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

// ==========================
// ✏️ EDITAR (COMPLETO)
// ==========================
async function editar(id){

    try {
        let res = await fetch(`${scriptURL}?id=${id}`);
        let dados = await res.json();

        let nome = prompt("Nome:", dados.nome_cliente);
        if(!nome) return;

        let data = prompt("Data nascimento:", dados.data_nascimento);
        let idade = prompt("Idade:", dados.idade);
        let motivo = prompt("Motivo:", dados.motivo_atendimento);
        let doenca = prompt("Doença:", dados.doenca_cronica);
        let vicio = prompt("Vício:", dados.vicio_compulsao);
        let tratamento = prompt("Tratamento:", dados.tratamento_atual);
        let inicio = prompt("Início:", dados.inicio_tratamento);
        let termino = prompt("Término:", dados.termino_tratamento);
        let duracao = prompt("Duração:", dados.duracao_tratamento);
        let mesas = prompt("Mesas:", dados.mesas_utilizadas);
        let sugestoes = prompt("Sugestões:", dados.sugestoes_finais);

        await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify({
                acao: "editar",
                id: id,
                nome_cliente: nome,
                data_nascimento: data,
                idade: idade,
                motivo_atendimento: motivo,
                doenca_cronica: doenca,
                vicio_compulsao: vicio,
                tratamento_atual: tratamento,
                inicio_tratamento: inicio,
                termino_tratamento: termino,
                duracao_tratamento: duracao,
                mesas_utilizadas: mesas,
                sugestoes_finais: sugestoes
            })
        });

        alert("Cadastro atualizado com sucesso!");

        // 🔄 recarrega tabela se existir
        if(typeof carregar === "function"){
            carregar();
        }

    } catch (err) {
        alert("Erro ao editar");
        console.error(err);
    }
}

// ==========================
// ✏️ EDITAR PELO MODAL
// ==========================
function editarAtual(){
    fecharModal();
    editar(idAtual);
}

// ==========================
// 🔒 FECHAR CLICANDO FORA
// ==========================
window.onclick = function(event) {
    let modal = document.getElementById("modal");
    if (modal && event.target == modal) {
        modal.style.display = "none";
    }
}
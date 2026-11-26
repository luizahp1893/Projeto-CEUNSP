// 1. Mensagem no console (para o desenvolvedor ver apertando F12)
console.log("O portal dos laboratórios foi carregado com sucesso.");

// 2. Caixa de aviso de boas-vindas assim que a página abre
alert("Bem-vindo ao Portal dos Laboratórios de Informática!");

// 3. Capacidade de cada laboratório (os mesmos valores da tabela da página)
const capacidades = {
    "101": 30,
    "102": 25,
    "103": 40
};

// 4. Pegando o formulário e a caixa de resultado do HTML através dos IDs
const formulario = document.getElementById("form-consulta");
const areaResultado = document.getElementById("resultado");

// 5. Função que escreve uma mensagem na caixa de resultado
//    tipo pode ser "sucesso" (verde) ou "erro" (vermelho), classes que existem no CSS
function mostrarResultado(mensagem, tipo) {
    areaResultado.textContent = mensagem;
    areaResultado.className = "resultado resultado-" + tipo;
}

// 6. Reagindo ao envio do formulário (quando o botão "Buscar" for clicado)
formulario.addEventListener("submit", function(evento) {
    // Evita que a página recarregue automaticamente (comportamento padrão)
    evento.preventDefault();

    // Pegando os valores que o usuário digitou ou escolheu em cada campo
    const nomeDigitado = document.getElementById("nome").value;
    const dataDigitada = document.getElementById("data").value;
    const laboratorioEscolhido = document.getElementById("laboratorio").value;
    const quantidadeAlunos = Number(document.getElementById("quantidade-alunos").value);

    // Pegando o horário escolhido: o radio que estiver marcado (:checked)
    const horarioEscolhido = document.querySelector('input[name="horario"]:checked').value;

    // Pegando os softwares marcados: todos os checkboxes marcados, guardados em uma lista
    const softwaresMarcados = document.querySelectorAll('input[name="software"]:checked');
    const listaSoftwares = [];
    for (const software of softwaresMarcados) {
        listaSoftwares.push(software.value);
    }

    // Regra 1: a reserva precisa ser feita com pelo menos 2 dias (48 horas) de antecedência
    const dataReserva = new Date(dataDigitada + "T00:00:00");
    const dataMinima = new Date();
    dataMinima.setHours(0, 0, 0, 0);
    dataMinima.setDate(dataMinima.getDate() + 2);

    if (dataReserva < dataMinima) {
        mostrarResultado("Data inválida: as reservas devem ser solicitadas com 48 horas de antecedência.", "erro");
        return;
    }

    // Regra 2: a quantidade de alunos não pode passar da capacidade do laboratório
    const capacidade = capacidades[laboratorioEscolhido];

    if (quantidadeAlunos > capacidade) {
        mostrarResultado("Quantidade inválida: o Laboratório " + laboratorioEscolhido + " comporta no máximo " + capacidade + " alunos.", "erro");
        return;
    }

    // Transformando a data de aaaa-mm-dd para dd/mm/aaaa
    const dataFormatada = dataDigitada.split("-").reverse().join("/");

    // Se não marcou nenhum software, escreve "Nenhum" no resumo
    const textoSoftwares = listaSoftwares.length > 0 ? listaSoftwares.join(", ") : "Nenhum";

    // Montando o resumo da consulta (\n quebra a linha)
    const resumo = "Olá, " + nomeDigitado + "! Buscando sua reserva...\n" +
                   "Laboratório: " + laboratorioEscolhido + "\n" +
                   "Data: " + dataFormatada + "\n" +
                   "Horário: " + horarioEscolhido + "\n" +
                   "Alunos: " + quantidadeAlunos + "\n" +
                   "Softwares: " + textoSoftwares;

    // Exibindo o resumo na página e também em um alerta final personalizado
    mostrarResultado(resumo, "sucesso");
    alert("Olá, " + nomeDigitado + "! Buscando sua reserva para o dia " + dataFormatada + "...");
});

// 7. Reagindo ao botão "Limpar": além de limpar os campos, apaga a resposta anterior
formulario.addEventListener("reset", function() {
    areaResultado.textContent = "";
    areaResultado.className = "resultado";
});

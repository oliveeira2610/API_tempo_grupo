// Define a URL da API para obter dados climáticos localmente
const apiUrl = "http://127.0.0.1:80/climatempo/";

// Função para controlar o efeito de desvanecimento de um elemento HTML
function fade(element, callback) {
    // Define a opacidade inicial como 1 (totalmente visível)
    let op = 1;
    // Define um intervalo para atualizar gradualmente a opacidade
    let timer = setInterval(function () {
        // Quando a opacidade for menor ou igual a 0.1, o desvanecimento é concluído
        if (op <= 0.1){
            clearInterval(timer);
            // Esconde o elemento
            element.style.display = 'none';
            // Verifica se uma função de retorno foi fornecida e a executa
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Atualiza a opacidade do elemento
        element.style.opacity = op;
        // Atualiza a opacidade para navegadores mais antigos (IE)
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        // Diminui a opacidade gradualmente
        op -= op * 0.1;
    }, 50); // A cada 50 milissegundos
}

// Função para atualizar o texto de um elemento HTML
function updateElementText(elementId, text, text2) {
    // Obtém o elemento pelo ID fornecido
    const element = document.getElementById(elementId);
    // Verifica se o elemento foi encontrado
    if (element) {
        // Atualiza o texto do elemento
        element.innerText = text + text2;
    }
}

// Função para atualizar a imagem de um elemento HTML
function updateElementImg(elementId, src) {
    // Obtém o elemento pelo ID fornecido
    const element = document.getElementById(elementId);
    // Verifica se o elemento foi encontrado
    if (element) {
        // Atualiza a fonte da imagem do elemento
        element.src = src;
    }
}

// Função para exibir os dados climáticos recebidos
function displayData(data) {
    // Retorna se não houver dados
    if (!data) return;

    // Arredonda a temperatura para o número inteiro mais próximo
    const temperatura = data.temperatura.toFixed(0);

    // Cria a URL da imagem da bandeira do país
    const imgUrl = `https://flagsapi.com/${data.pais}/flat/64.png`;

    // Atualiza os elementos na página com os dados climáticos
    updateElementText("temperatura", temperatura, "ºC");
    updateElementText("umidade", data.umidade, "%");
    updateElementText("veloVento", data.velocidadeDoVento, "km/h");
    updateElementText("clima", data.clima, "");
    updateElementText("nome", data.nome, "");
    updateElementImg("iconClima", data.iconUrl);    
    updateElementImg("iconPais", imgUrl);
    // Atualiza o fundo da página com base no clima recebido
    updateBackground("background", data.clima)
}

// Função para lidar com erros e exibir mensagens de erro
function handleError(errorMsg) {
    // Cria um elemento de toast para exibir a mensagem de erro
    const toast = document.createElement("div");
    const icon = document.createElement("i");
    // Adiciona uma classe ao ícone do toast
    icon.className = "bx bxs-shield-x";
    // Adiciona classes ao toast
    toast.classList.add("toast");
    // Define o texto do toast como a mensagem de erro
    toast.innerText = errorMsg;
    // Adiciona o ícone ao toast
    toast.appendChild(icon);
    // Adiciona o toast ao corpo do documento HTML
    document.body.appendChild(toast);

    // Após 3 segundos, inicia o desvanecimento do toast
    setTimeout(() => {
        fade(toast, function() {
            // Remove o toast após o desvanecimento completo
            toast.remove();
        });
    }, 3000); // 3000 milissegundos (3 segundos)
}

// Função assíncrona para obter os dados climáticos de uma cidade
async function getData(cidade) {
    // Constrói a URL para a solicitação de dados
    const url = apiUrl + cidade;
    try {
        // Realiza a solicitação de dados usando fetch API
        const response = await fetch(url);
        // Lança um erro se a resposta não for bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao se conectar!');
        }
        // Retorna os dados climáticos como JSON
        return await response.json();
    } catch (error) {
        // Chama a função handleError se ocorrer um erro
        handleError("Cidade não encontrada!");
        // Retorna null se houver um erro
        return null;
    }
}

// Função para definir e atualizar o horário exibido na página
function setHorario() {
    // Obtém a data atual
    let date = new Date();
    // Formata os minutos e horas com dois dígitos
    let minute =  ("0" + date.getMinutes()).slice(-2);
    let hour =  ("0" + date.getHours()).slice(-2);
    // Cria uma string formatada para o horário
    let horario = `${hour}:${minute}`
    // Atualiza o texto do elemento HTML com o horário
    updateElementText("horario", horario, "");
}

// Adiciona um ouvinte de evento para a carga da página
window.addEventListener("load", async () => {
    // Define e atualiza o horário na página
    setHorario();
    // Define um intervalo para atualizar o horário a cada segundo
    setInterval(setHorario, 1000);
    // Obtém os dados climáticos da cidade de Marília e os exibe na página
    const informacoes = await getData("marília");
    displayData(informacoes);
});

// Obtém o campo de pesquisa pelo ID
const pesquisarCampo = document.getElementById("pesquisar");

// Adiciona um ouvinte de evento para a tecla pressionada no campo de pesquisa
pesquisarCampo.addEventListener("keyup", async (e) => {
    // Verifica se a tecla pressionada é Enter
    if (e.key === 'Enter') {
        // Obtém e exibe os dados climáticos da cidade digitada
        const informacoes = await getData(pesquisarCampo.value.toLowerCase());
        displayData(informacoes);
        // Limpa o campo de pesquisa após a pesquisa
        pesquisarCampo.value = '';
    }
});

// Função para atualizar a imagem de fundo com base no clima
function updateBackground(background, clima){
    const background1 = document.getElementById(background)

    if (clima == "Chuva" || clima == "Garoa"){
        background1.src = "images/chuva-20995920-131120200056.gif"
    } else if(clima == "Neve"){
        background1.src = "images/neve.gif"
    } else if (clima =="Névoa"){
        background1.src = "images/nevoa.jpg"
    } else if (clima =="Céu limpo"){
        background1.src = "images/ceu.jpg"
    } else if (clima == "Parcialmente nublado" ){
        background1.src = "images/nublado.gif"
    } else if (clima == "Tempestade") {
        background1.src = "images/tempestade.gif"
    } else if (clima == "Nublado") {
        background1.src = "images/nubladoR.gif"
    }
     else{
        background1.src = "https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"
    }
}

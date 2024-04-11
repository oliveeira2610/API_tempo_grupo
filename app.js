// Importa o framework Express para criar o servidor web
const express = require('express');
// Importa o módulo Axios para fazer solicitações HTTP
const axios = require('axios');
// Importa o módulo Path para manipular caminhos de arquivos
const path = require('path');
// Importa o módulo CORS para habilitar o CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
// Importa o arquivo de configuração que contém a chave da API
const config = require('./config.json');
// Extrai a chave da API do arquivo de configuração
const apikey = config.apikey;

// Inicializa o aplicativo Express
const app = express();
// Define a porta em que o servidor irá escutar
app.listen(80);

// Habilita o CORS para permitir solicitações de diferentes origens
app.use(cors());
// Habilita o uso de JSON no corpo das solicitações HTTP
app.use(express.json());
// Define o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Função para traduzir o clima recebido da API OpenWeatherMap
function traducaoClima() {
    return {
        // Mapeia os diferentes tipos de clima para suas traduções em português
        // (Essa função é usada para traduzir o texto descritivo do clima)
        "Thunderstorm": "Tempestade",
        "thunderstorm with light rain": "Tempestade",
        "thunderstorm with rain": "Tempestade",
        "thunderstorm with heavy rain": "Tempestade",
        "light thunderstorm": "Tempestade",
        "thunderstorm": "Tempestade",
        "heavy thunderstorm": "Tempestade",
        "ragged thunderstorm": "Tempestade",
        "thunderstorm with light drizzle": "Tempestade",
        "thunderstorm with drizzle": "Tempestade",
        "thunderstorm with heavy drizzle": "Tempestade",
        
        "Drizzle": "Garoa",
        "light intensity drizzle": "Garoa",
        "drizzle": "Garoa",
        "heavy intensity drizzle": "Garoa",
        "light intensity drizzle rain": "Chuva",
        "drizzle rain": "Chuva",
        "heavy intensity drizzle rain": "Chuva",
        "shower rain and drizzle": "Chuva",
        "heavy shower rain and drizzle": "Chuva",
        "shower drizzle": "Garoa",
      
        "Rain": "Chuva",
        "light rain": "Chuva",
        "moderate rain": "Chuva",
        "heavy intensity rain": "Chuva",
        "very heavy rain": "Chuva",
        "extreme rain": "Chuva",
        "freezing rain": "Chuva",
        "light intensity shower rain": "Chuva",
        "shower rain": "Chuva",
        "heavy intensity shower rain": "Chuva",
        "ragged shower rain": "Chuva",
      
        "Snow": "Neve",
        "light snow": "Neve",
        "snow": "Neve",
        "heavy snow": "Neve",
        "sleet": "Chuva",
        "light shower sleet": "Chuva",
        "shower sleet": "Chuva",
        "light rain and snow": "Neve",
        "rain and snow": "Neve",
        "light shower snow": "Neve",
        "shower snow": "Neve",
        "heavy shower snow": "Neve",
      
        "Atmosphere": "Névoa",
        "mist": "Névoa",
        "smoke": "Névoa",
        "haze": "Névoa",
        "sand/dust whirls": "Névoa",
        "fog": "Névoa",
        "sand": "Névoa",
        "dust": "Névoa",
        "volcanic ash": "Névoa",
        "squalls": "Névoa",
        "tornado": "Névoa",

        "Clear": "Céu limpo",
        "clear sky": "Céu limpo",
      
        "Clouds": "Parcialmente nublado",
        "few clouds": "Parcialmente nublado",
        "scattered clouds": "Parcialmente nublado",
        "broken clouds": "Parcialmente nublado",
        "overcast clouds": "Nublado"
    }
}

// Rota para obter dados climáticos de uma cidade específica
app.get('/climatempo/:cidade', async (req, res) => {
    // Obtém o nome da cidade a partir dos parâmetros da solicitação
    const city = req.params.cidade;

    try {
        // Faz uma solicitação à API OpenWeatherMap para obter dados climáticos da cidade especificada
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        
        // Verifica se a resposta da solicitação foi bem-sucedida (código de status 200)
        if (response.status === 200) {
            // Traduz o texto descritivo do clima usando a função traducaoClima
            const clima = traducaoClima()[response.data.weather[0].description] || response.data.weather[0].description;
            // Monta a URL da imagem do ícone do clima
            const iconUrl = `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
            
            // Cria um objeto contendo os dados climáticos formatados
            const weatherData = {
                nome: response.data.name,
                pais: response.data.sys.country,
                temperatura: response.data.main.temp,
                umidade: response.data.main.humidity,
                velocidadeDoVento: response.data.wind.speed,
                clima: clima,
                iconUrl: iconUrl
            };

            // Exibe os dados climáticos no console do servidor
            console.log(response.data);

            // Envia os dados climáticos como resposta à solicitação
            res.send(weatherData);
        } else {
            // Se a resposta não foi bem-sucedida, envia uma mensagem de erro com o código de status correspondente
            res.status(response.status).send({ erro: 'Erro ao obter dados meteorológicos' });
        }
    } catch (error) {
        // Se ocorrer um erro durante a solicitação, envia uma mensagem de erro com o código de status 500 e o erro detalhado
        res.status(500).send({ erro: 'Erro ao obter dados meteorológicos', error });
    }
})

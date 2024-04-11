
# Documentação da API Clima Tempo

## Introdução

A API Clima Tempo é uma aplicação para exibir informações climáticas em tempo real de várias cidades. Ela permite aos usuários visualizar a temperatura, umidade, velocidade do vento e o clima atual de uma determinada cidade. Além disso, a API oferece a funcionalidade de busca, permitindo que os usuários pesquisem informações climáticas de diferentes cidades.

## Instalação

Para utilizar a API Clima Tempo, siga os seguintes passos:

1. Certifique-se de ter o Node.js instalado na sua máquina.
2. Clone o repositório do projeto ou baixe o código-fonte.
3. Instale as dependências do projeto executando o comando `npm install` no terminal.

## Utilização

Após a instalação, você pode iniciar a aplicação executando o comando `node app.js` no terminal. Isso iniciará o servidor local e a API estará pronta para receber solicitações.

### Endpoints

#### GET /climatempo/:cidade

Este endpoint permite obter informações climáticas de uma cidade específica. Basta substituir `:cidade` pelo nome da cidade desejada. A resposta será um objeto JSON contendo os dados climáticos da cidade.

#### Exemplo de uso:

```
GET /climatempo/marilia
```

#### Resposta:

```json
{
  "temperatura": 25,
  "umidade": 70,
  "velocidadeDoVento": 10,
  "clima": "Parcialmente nublado",
  "nome": "Marília",
  "pais": "BR",
  "iconUrl": "https://example.com/icon.png"
}
```

### Funcionalidades

A API Clima Tempo oferece as seguintes funcionalidades:

- Obter informações climáticas de uma cidade específica.
- Buscar informações climáticas de diferentes cidades.
- Exibir os dados climáticos em tempo real na página HTML.

## Dependências

A API Clima Tempo utiliza as seguintes dependências:

- **axios**: Para fazer solicitações HTTP para obter dados climáticos de uma API externa.
- **cors**: Para permitir solicitações de diferentes origens ao servidor.
- **express**: Para criar e gerenciar o servidor web que fornece a API.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o desenvolvimento da API Clima Tempo, sinta-se à vontade para abrir uma issue ou enviar um pull request para o repositório do projeto no GitHub.

## Autor

A API Clima Tempo foi desenvolvida por [Seu Nome].

## Licença

Este projeto está licenciado sob a Licença ISC. Consulte o arquivo LICENSE para obter mais detalhes.


# código para Apikey 🔑

- no arquivo chamado config.json coloque sua chave api entre aspas na parte entre colchetes:

{
    "apikey": "[sua chave da api]"
}

# como conseguir uma chave API 🔑❓


- entre em https://openweathermap.org/api
- crie uma conta (está na navbar)
- clique no seu nome 
- vá em "My API keys"

(lembre-se sempre de instalar as dependecias)

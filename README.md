# LionTechPets

<hr/>

Aplicação Feita com:
React - Next - Node com algumas ferramentas como MySQL e JWT;

Para rodar o projeto localmente é necessário alguns pré-requisitos de instalação:
- MySQL Server
- NodeJS

Primeiro: Configure as variáveis de ambiente. No frontend tem um arquivo "example.env.local" com todas as variáveis do sistema, 
defina elas de acordo com a sua configuração. No backend tem outro arquivo "example.env" seguindo o mesmo modelo.

<hr/>

**COMANDOS**:

Em cada pasta rode `"yarn"` ou `"npm install"` para instalar todas as dependencias.
No front rode `"yarn build"` e `"yarn start"` para rodar o projeto do front.
No back segue alguns detalhes de comando:
- `"yarn typeorm migration:run"` para criar o banco de dados 
- `"yarn populate"` este comando irá criar alguns dados fictícios de todas as tabelas. depois apenas rode `"yarn start"`

O comando de população irá criar um login padrão `"usuario = admin / senha = admin"`, porém, você pode criar outros.

Nota: o workspace da API está na pasta do backend.

<hr/>

# Thanks for visiting! :smile:

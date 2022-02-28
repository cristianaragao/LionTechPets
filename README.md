# LionTechPets

<hr/>

Aplicação Feita com:
React - Next - MySQL e Node com algumas pitadas de MySQL, JWT e MySQL;

Para rodar o projeto localmente é necessário alguns pré-requisitos de instalação:
- MySQL Server
- NodeJS

Primeiro: Configure as variáveis de ambiente. No frontend tem um arquivo "example.env.local" com todas as variáveis do sistema, 
defina elas de acordo com a sua configuração. No backend tem outro arquivo "example.env" seguindo o mesmo modelo.

<hr/>

**COMANDOS**:

Em cada pasta rode `"yarn"` ou `"npm install"` para instalar todas as dependencias
no front rode `"yarn build"` e `"yarn start"` para rodar o projeto do front
no back segue alguns detalhes de comando:
- `"yarn typeorm migration:run"` para criar o banco de dados 
- `"yarn populate"` este comando irá criar alguns dados fictícios de todas as tabelas. depois apenas rode `"yarn start"`

o comando de população irá criar um login padrão `"usuario = admin / senha = admin"`, porém, você pode criar outros.

<hr/>

# Thanks for visiting! :smile:

# EsxTest

Projeto para teste de seleção da [ESX](https://www.esx.com.br/) feito utilizando SpringBoot como framework do Java no back-end, e Angular no front-end;

## Inicializando a aplicação Front End

Execute `ng serve` a partir da raiz do projeto (esx-test). Navegue até `http://localhost:4200/`. O aplicativo irá recarregar automaticamente se você alterar qualquer arquivo de recurso.

## Inicializando a aplicação Back End (API)

Inicialize a `aplicação Spring Boot` para começar a consumir a API.

## Banco

O banco de dados utilizado é o `H2`. Para acessar seu console e realizar consultas basta navegar até `http://localhost:8080/h2`.

## Swagger

Foram inseridas as dependências referentes ao `swagger` e ao `swagger-ui` para fins de documentação da API, e troubleshooting. Para acessar a UI basta navegar até `http://localhost:8080/swagger-ui.html`
enquanto a aplicação estiver de pé.

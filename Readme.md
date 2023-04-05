# TEST IDS

## Tech stack:

- Node.js
- Express
- PostgreSQL
- Sequelize

## PORT Development

- services: 4000

## Endpoints:

### Test

Endpoint /

- GET ALL DATA

  - response: [{
    "id": integer,
    "productID": string,,
    "productName": string,,
    "amount": string,,
    "customerName": string,,
    "status": integer,
    "transactionDate":string,,
    "createBy": string,
    "createOn": string,
    "Status.name": string
    }, ...{...}]

- GET DATA BY ID /:id

  - params: id

  - response: {
    "id": integer,
    "productID": string,,
    "productName": string,,
    "amount": string,,
    "customerName": string,,
    "status": integer,
    "transactionDate":string,,
    "createBy": string,
    "createOn": string,
    "Status.name": string
    }

- POST NEW DATA

  - body: { productID,
    productName,
    amount,
    customerName,
    status,
    transactionDate,
    createBy }

    - response: "Data Successfully Inserted"

- PATCH EXISTING DATA /:id

  - params: id
  - body: { productID ||
    productName ||
    amount ||
    customerName ||
    status ||
    transactionDate ||
    createBy }

  - response: "Data Successfully Updated"

## Initiate

Please follow this step to start using the services

1. npm i
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
4. npx sequelize-cli db:seed:all

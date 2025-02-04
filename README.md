# Stepper Form API

## Description
This project is a **Stepper Form API** developed using **NestJS**, designed to collect and manage employee details across multiple categories:
- **Personal Information**
- **Professional Details**
- **Educational Background**
- **Work Experience**
- **Bank Details**
- **Current Organization Information**

## Installation
To install dependencies, run:
```sh
npm install --legacy-peer-deps
```

## Start the Server
Run the following command to start the development server:
```sh

#bash
npm run start

#watch mode
npm run start:dev
```

## API Documentation
Access the API documentation via Swagger UI:
[Swagger URL](https://stepper-form-backend.onrender.com/api-docs)

## Project Structure
```
📂 stepper-form-api
├── schemas
│   ├── user.schema.ts
│   ├── education.schema.ts
│   ├── experience.schema.ts
├── src
│   ├── middleware
│   │   ├── upload.middleware.ts
│   ├── stepper-form
│   │   ├── module
│   │   ├── controller
│   │   ├── service
│   ├── app.module.ts
│   ├── main.ts
├── .gitignore
├── tsconfig.json
├── README.md
```

## Technologies Used
- **NestJS** (Backend framework)
- **MongoDB** (Database)
- **Mongoose** (ORM for MongoDB)
- **Swagger** (API documentation)
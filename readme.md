# Hospital Management API Documentation

## Overview

This documentation provides an overview and usage guide for the Hospital Management API. The API is designed to facilitate hospital management, specifically focusing on psychiatrists and patients. It offers a robust backend system to manage hospital details, psychiatrist data, and patient information efficiently.

## About the Project

The Hospital Management API is built to streamline operations within hospital settings, enabling easy access to psychiatrist and patient data. This system is essential for hospitals looking to digitize their operations and enhance their service delivery through technology.

## Key Features

- **Hospital Management:** Manage hospital details including infrastructure and services.
- **Psychiatrist Management:** Handles operations related to psychiatrists such as their details, availability, and associated patients.
- **Patient Management:** Facilitates the registration, update, and management of patient data.

## Technology Stack

- **Backend:** Node.js with Express
- **Database:** SQL Database using Sequelize ORM
- **Authentication:** Utilizes bcrypt for hashing and securing passwords
- **Documentation:** Swagger for API documentation and interactive testing

## How to Use

### Swagger

Swagger is used to document the API and provide an interactive interface where users can test API endpoints directly from their browsers. It helps in understanding and verifying the functionality of the API without the need for a separate client setup.
Swagger Url: [https://hospital-management-production-88c6.up.railway.app/api-docs/#/]

### Psychiatrist and Patient

Users can manage psychiatrist and patient data through specific API endpoints. Psychiatrists can be assigned, updated, or retrieved, and patients can be registered, their details updated, and their information fetched through various API calls.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/0AvinashMohanDev1/Hospital-Management.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd hospital-management-api
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   Create a `.env` file in the root directory and populate it with the necessary database and other configurations as specified in the `config` folder.
5. **Run the server:**
   ```bash
   npm start
   ```

## Swagger URL

Access the Swagger UI to interact with the API at:
```
https://hospital-management-production-88c6.up.railway.app/
```

## Base URL

The base URL for all API requests is:
```
https://hospital-management-production-88c6.up.railway.app/
```

## Endpoints

### Work

#### Patient Registration

- **Method:** POST
- **Endpoint:** `/patient/register`
- **Schema:**
  ```json
  {
    "name": "string",
    "address": "string",
    "email": "string",
    "phone_number": "string",
    "password": "string",
    "psychiatrist_id": "integer",
    "image": "file"
  }
  ```

#### Get Hospital Details

- **Method:** POST
- **Endpoint:** `/hospital/details`
- **Schema:**
  ```json
  {
    "hospitalId": "integer"
  }
  ```

### Thank you for visiting.
- **For any suggestion:**
Please reach out to me via:
Mobile: 8187939429 / 9792190895
Email: avinashmohandev@gmail.com
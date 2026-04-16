# Profile Intelligence Service

## Overview

**Profile Intelligence Service** is a backend API built with Node.js and Express that leverages external prediction services to generate intelligent profile data based on user names. The service predicts gender, age (with age group categorization), and nationality using third-party APIs (Agify, Genderize, and Nationalize), then persists this data in a MongoDB database. It supports CRUD operations for profile management, including filtering capabilities for retrieving profiles.

This project was developed as part of the Stage 1 Data Persistence and API Design Assessment for the HNG Internship 14.

## Key Features

- **Intelligent Profile Creation**: Automatically predicts and stores gender, age, age group, and nationality based on a provided name using external APIs.
- **Data Persistence**: Uses MongoDB for reliable storage of profile records.
- **RESTful API**: Provides endpoints for creating, retrieving, updating (via recreation), and deleting profiles.
- **Filtering Support**: Retrieve all profiles with optional filters by gender, country ID, or age group.
- **Duplicate Handling**: Checks for existing profiles by name and returns them instead of creating duplicates.
- **Error Handling**: Comprehensive validation and error responses for invalid inputs or API failures.
- **CORS Enabled**: Supports cross-origin requests for frontend integration.

## Tech Stack

- **Runtime**: Node.js (with ES modules)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **External APIs**:
  - Agify (for age prediction)
  - Genderize (for gender prediction)
  - Nationalize (for nationality prediction)
- **Other Libraries**:
  - CORS (for cross-origin support)
  - dotenv (for environment variable management)
  - uuid (for unique profile IDs)
- **Development Tools**: Nodemon (for auto-restarting during development)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- A .env file with the following variables:
  - `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/profiledb` or Atlas URI)
  - `PORT`: Optional, defaults to 5000 if not set

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd "STAGE 1 Data Persistence and API Design Assessment"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your environment variables (see Prerequisites).

4. Start the server in development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   Or start in production mode:
   ```bash
   npm start
   ```

The server will run on `https://stage-1-data-persistence-and-api-design-assessme-production.up.railway.app/` (or the port specified in .env).

## API Endpoints

All endpoints are prefixed with `/api/profiles`. The API returns JSON responses with a `status` field (`success` or `error`) and relevant data or error messages.

### Create a New Profile

- **Endpoint**: `POST /api/profiles`
- **Description**: Creates a new profile by predicting gender, age, and nationality from the provided name. If a profile with the same name exists, returns the existing one.
- **Request Body** (JSON):
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Validation**:
  - `name` is required and must be a non-empty string (not numeric).
- **Response (Success, 201)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": "unique-uuid",
      "name": "John Doe",
      "gender": "male",
      "gender_probability": 0.95,
      "sample_size": 1500,
      "age": 35,
      "age_group": "adult",
      "country_id": "US",
      "country_probability": 0.12,
      "created_at": "2023-10-01T12:00:00.000Z"
    }
  }
  ```
- **Error Responses**:
  - 400: Missing or invalid name.
  - 422: Name is numeric.
  - 502: External API failure (e.g., invalid response from Agify, Genderize, or Nationalize).

### Get All Profiles

- **Endpoint**: `GET /api/profiles`
- **Description**: Retrieves all profiles, with optional filtering by query parameters.
- **Query Parameters** (optional):
  - `gender`: Filter by gender (`male` or `female`).
  - `country_id`: Filter by country ID (e.g., `US`, case-insensitive).
  - `age_group`: Filter by age group (`child`, `teenager`, `adult`, `senior`).
- **Response (Success, 200)**:
  ```json
  {
    "status": "success",
    "data": {
      "count": 10,
      "data": [
        {
          "id": "unique-uuid",
          "name": "John Doe",
          "gender": "male",
          "age": 35,
          "age_group": "adult",
          "country_id": "US"
        }
        // ... more profiles
      ]
    }
  }
  ```

### Get Profile by ID

- **Endpoint**: `GET /api/profiles/:id`
- **Description**: Retrieves a single profile by its unique ID.
- **Response (Success, 200)**: Same as create profile data.
- **Error Response**:
  - 404: Profile not found.

### Delete Profile by ID

- **Endpoint**: `DELETE /api/profiles/:id`
- **Description**: Deletes a profile by its unique ID.
- **Response (Success, 204)**:
  ```json
  {
    "status": "success",
    "message": "Profile deleted successfully"
  }
  ```
- **Error Response**:
  - 500: Internal server error.

### Root Endpoint

- **Endpoint**: `GET /`
- **Description**: Basic welcome message.
- **Response**:
  ```
  Welcome to My Predictions API! Use the /api/profiles endpoint
  ```

## Data Model

Profiles are stored in MongoDB using the following schema (defined in Profile.js):

- `id` (String, unique, auto-generated UUID v7): Unique identifier.
- `name` (String, required): The user's name.
- `gender` (String, required, enum: `male` or `female`): Predicted gender.
- `gender_probability` (Number, required): Confidence score for gender prediction.
- `sample_size` (Number, required): Sample size used for gender prediction.
- `age` (Number, required): Predicted age.
- `age_group` (String, required): Categorized age group (`child` for 0-12, `teenager` for 13-19, `adult` for 20-59, `senior` for 60+).
- `country_id` (String, required): Predicted country code (e.g., `US`).
- `country_probability` (Number, required): Confidence score for nationality prediction.
- `created_at` (Date, default: current timestamp): Creation time.

The model excludes MongoDB's `_id` and `__v` fields in JSON responses.

## External Services

The service integrates with free external APIs for predictions:

- **Agify** (`https://api.agify.io`): Predicts age based on name and assigns age groups.
- **Genderize** (`https://api.genderize.io`): Predicts gender with probability and sample size.
- **Nationalize** (`https://api.nationalize.io`): Predicts nationality (top country) with probability.

Note: These APIs are third-party and may have rate limits or occasional downtime. The service handles invalid responses (e.g., null values) with 502 errors.

## Project Structure

```
STAGE 1 Data Persistence and API Design Assessment/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   ├── newProfile.js         # Handles profile creation
│   ├── processAge.js         # Processes age prediction
│   ├── processGender.js      # Processes gender prediction
│   ├── processNationality.js # Processes nationality prediction
│   └── profileController.js  # Handles get all, get by ID, delete
├── models/
│   └── Profile.js            # Mongoose schema for profiles
├── routes/
│   └── profiles.js           # Route definitions
├── services/
│   ├── agify.js              # Agify API client
│   ├── genderize.js          # Genderize API client
│   └── nationalize.js        # Nationalize API client
├── .env                      # Environment variables (not in repo)
├── app.js                    # Main server file
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Testing

No unit tests are currently included in the project. You can test the API using tools like Postman, curl, or Thunder Client in VS Code. Example curl command for creating a profile:

```bash
curl -X POST https://stage-1-data-persistence-and-api-design-assessme-production.up.railway.app/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'
```

## License

This project is licensed under the ISC License. See the package.json for details.

---

This README provides a complete guide to the Profile Intelligence Service. For any issues or questions, refer to the code comments or raise an issue in the repository.

# HNG Internship - API Integration and Data Processing Assessment - Gender Classification API

Simple Express API that uses the Genderize external service to predict gender from a given name.

## Project Structure

- `app.js` - Main Express server setup
- `processGender.js` - Request handler and validation logic
- `services/genderize.js` - External API integration helper

## Prerequisites

- Node.js 18+ or a version with built-in `fetch`
- npm

## Installation

1. Open a terminal in the project folder
2. Run:
   ```bash
   npm install
   ```

## Run

```bash
node app.js
```

## Endpoint

`GET /api/classify`

Query parameter:

- `name` - the name to classify

### Example

```bash
curl "https://apiintegrationanddataprocessingassessment-production.up.railway.app/api/classify?name=emily"
```

### Success response

```json
{
  "status": "success",
  "data": {
    "name": "emily",
    "gender": "female",
    "probability": 0.99,
    "sample_size": 12345,
    "is_confident": true,
    "processed_at": "2026-04-14T00:00:00.000Z"
  }
}
```

### Error responses

- Missing name:
  - status `400`
  - message: `Name query parameter is missing`
- Numeric name:
  - status `422`
  - message: `Name can only be string`
- No prediction:
  - status `200`
  - message: `No prediction available for the provided name`

## Notes

- The API depends on `https://api.genderize.io`
- Confidence is set when probability >= 0.7 and sample size >= 100# Gender Classification API

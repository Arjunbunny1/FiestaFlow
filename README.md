# FiestaFlow

[Live Site](https://fiestaflow.onrender.com)

## Postman API Collection

You can find a `Postman_collection` folder in this repository. Anyone can import the collection from that folder into Postman to easily test all backend API endpoints (authentication, events, etc.) without manually creating requests.

- Open Postman
- Click **Import**
- Select the collection file from the `Postman_collection` folder
- Use the pre-configured requests to test the API

---

## Local Setup Documentation

Follow these steps to run FiestaFlow locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Arjunbunny1/FiestaFlow.git
cd FiestaFlow
```

### 2. Backend Setup
```bash
cd Backened
npm install
```
- Create a `.env` file in the `Backened` folder with the following variables:
  ```env
  PORT=5000
  NODE_ENV=development
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CORS_ORIGIN=http://localhost:3000
  FRONTEND_URL=http://localhost:3000
  ```
- Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `frontend` folder with:
  ```env
  REACT_APP_API_URL=http://localhost:5000/api
  REACT_APP_APP_NAME=FiestaFlow
  ```
- Start the frontend React app:
```bash
npm start
```

### 4. Access the App
- Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

**Note:**
- Make sure MongoDB is running locally, or update `MONGO_URI` to use MongoDB Atlas.
- For production/deployment, update environment variables accordingly.

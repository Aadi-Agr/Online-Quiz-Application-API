# 📘 Online Quiz Application API  

A simple backend API for managing and taking quizzes.  

---

## Project Description  

This API allows users to:  
- Create quizzes with a title.  
- Add questions to a quiz (single-choice, multiple-choice, or text-based).  
- Fetch quiz questions for quiz-takers (without exposing correct answers).  
- Submit answers and receive a score with details.  
- (Bonus) List all available quizzes.  

---

## Setup & Run Locally  

### ✅ Requirements  
- Node.js (>=16)  
- MongoDB (running locally or via cloud, e.g., Mongo Atlas)  

### ⚙️ Steps  

1. **Clone the project & enter directory:**  
   ```bash
   git clone <repo-url>
   cd quiz-backend
   ```
2. **Install dependencies:**  
   ```bash
   git clone <repo-url>
   cd quiz-backend
   ```
3. **Create .env file in the project root:**  
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/quizdb
   ```
4. **Start MongoDB (if using local MongoDB):**  
   ```bash
   mongod
   ```
5. **Run the project:**  
   ```bash
   npm start
   ```
6. **Run in development mode (auto reload with nodemon):**  
   ```bash
   npm run dev
   ```

## Running Test Cases

This project uses **Jest** for unit testing.
  
  ### Run all tests
  ```bash
  npm test
  ```

## Assumptions & Design Choices

### Question Types
- **Single-choice**: Must have exactly one correct option.  
- **Multiple-choice**: Must have one or more correct options; answer must match exactly (no partial credit).  
- **Text-based**: Auto-graded only if `correctAnswer` is provided; comparison is case-insensitive.

### Data Models
- **Quiz**: Contains only a `title` and `createdAt` timestamp.  
- **Question**: Includes `text`, `type`, `options` (for single/multiple), `correctAnswer` (for text), and `maxChars` (default 300).

### API Design
- RESTful endpoints with clear separation of concerns:  
  - `controllers/` → handle HTTP requests.  
  - `services/` → contain business logic, scoring, and DB operations.  
  - `models/` → define MongoDB schemas.

### Security & Privacy
- Correct answers are **never exposed** when fetching quiz questions for users.  
- Correct answers are only used internally during scoring.

### Testing Strategy
- Focused on **core logic** (scoring, validation) since controllers and routes are thin wrappers.  

### Other Design Choices
- Used **MongoDB** with Mongoose for simplicity and scalability.  
- Chose **Express.js** for lightweight and modular backend structure.  
- Validation rules ensure data consistency and prevent invalid question setups.

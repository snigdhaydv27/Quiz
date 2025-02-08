# Quiz App

This is a Quiz App built with React. The app fetches quiz data from an API and allows users to answer questions, view their score, and see the correct answers.

## Features

- Fetches quiz data from an API
- Displays questions and multiple-choice answers
- Tracks user score with positive and negative marking
- Shows correct answers after quiz completion
- Allows users to play the quiz again
- Includes countdown timer before starting the quiz
- Responsive design

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <https://github.com/snigdhaydv27/Quiz>
    ```
2. Navigate to the project directory:
    ```bash
    cd Quiz
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
Quiz/
├── public/
│   ├── bg.jpg
│   ├── genetics.gif
│   ├── sounds/
│   │   ├── endQuiz.mp3
│   │   ├── selectOption.mp3
│   │   └── startQuiz.mp3
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AnswerSection.jsx
│   │   ├── Quiz.jsx
│   │   └── QuizStyle.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── README.md
└── package.json
```

## Screenshots

### Home Screen
![Home Screen](public/Screenshot%202025-02-08%20204922.png)

### Quiz Screen
![Quiz Screen](public/Screenshot%202025-02-08%20204954.png)

### Score Screen
![Score Screen](public/Screenshot%202025-02-08%20205017.png)


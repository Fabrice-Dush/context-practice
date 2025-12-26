# Context Practice – React Context API & useReducer

A small **React (Vite)** learning project focused on practicing **Context API** and **useReducer** for global state management.

This project was built purely for learning purposes to understand how React manages shared state without Redux or other external state libraries.

---

## 🚀 Project Overview

This project demonstrates:

- Global state management using **React Context API**
- State updates using the **useReducer** hook
- Clean separation of context, components, and styles
- Avoiding prop drilling in React applications

---

## 🧠 Concepts Practiced

- React Context API
- useReducer Hook
- Global State Management
- Action Dispatching
- Component Re-render Optimization
- Vite project setup

---

## 📁 Project Structure

```
CONTEXT-PRACTICE/
│── node_modules/
│── public/
│
│── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
│
│── .gitignore
│── eslint.config.js
│── index.html
│── package.json
│── package-lock.json
│── README.md
│── vite.config.js
```

### Folder Explanation

- **assets/** – Static files (images, icons, etc.)
- **components/** – Reusable UI components
- **contexts/** – Context and reducer logic
- **App.jsx** – Root application component
- **main.jsx** – React entry point
- **style.css** – Global styles

---

## ⚙️ How State Management Works

1. Context is created using `createContext()`
2. Global state is handled using `useReducer`
3. A Context Provider wraps the application
4. Components consume state via `useContext()`
5. Actions are dispatched to update the state

---

## 🛠️ Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS
- ESLint

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone <your-repository-url>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## 🎯 Learning Objectives

- Understand when to use Context API
- Learn how `useReducer` improves state predictability
- Build a foundation for Redux or other state libraries
- Improve React project organization

---

## 🚧 Possible Improvements

- Add TypeScript
- Split reducers for scalability
- Persist state using localStorage
- Add unit tests
- Improve UI styling

---

## 👤 Author

**Dushimimana Fabrice**  
Practicing modern React development 🚀

---

## 📄 License

This project is for **educational purposes only**.

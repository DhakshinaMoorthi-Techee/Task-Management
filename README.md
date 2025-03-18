# Task Management Web App

## Overview
This is a **Task Management Web App** built using **Next.js** and **TypeScript**. The app allows users to manage tasks efficiently by providing functionalities such as task listing, searching, adding, editing, sorting, filtering, and deleting tasks.

## Features

### 📋 List Tasks in a Table
- Displays tasks in a structured table format.
- Columns include **Task Name, Priority, Status, and Due Date**.

### 🔍 Search for a Task
- Allows users to **search tasks by name** dynamically.
- Displays a **"No task found"** message if no results match.

### ➕ Add a New Task
- Users can add a new task via a **modal/popup**.
- Fields include **Task Name, Description, Due Date, Priority (High, Medium, Low), and Status (In Progress, Completed)**.
- The new task is immediately displayed in the task table.

### ✏️ Edit an Existing Task
- Users can edit an existing task via a **modal/popup**.
- The edited task updates instantly in the table.

### 📅 Sort Tasks by Date
- Users can **sort tasks** by the due date in **ascending and descending** order.

### 🔽 Filter Tasks
- Filters tasks based on **priority** (High, Medium, Low) and **status** (In Progress, Completed).
- The table dynamically updates based on selected filters.

### ❌ Delete a Task
- Users can delete a task, and it is immediately removed from the table.

### 🌟 State Management
- Uses **React's Context API** to manage and store task states instead of prop drilling.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/DhakshinaMoorthi-Techee/Task-Management.git
cd task-management-app
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Run the Application
```bash
npm run dev
# or
yarn dev
```

The app will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 Deployment
You can view the live demo of the app here:
**[Live Demo Link](https://task-management-dhakshinamoorthi-techees-projects.vercel.app/)**

To build the production-ready version, run:
```bash
npm run build
```

---

## 🛠️ Technologies Used
- **Next.js** - React framework for server-side rendering and static site generation
- **TypeScript** - Ensures type safety and better maintainability
- **React Context API** - State management solution
- **CSS Modules / Tailwind CSS** - Styling the UI

## 📌 Notes
- AI tools were used to **enhance the code structure and improve efficiency**.
- The app follows **best practices for Next.js development** and maintains a **scalable architecture**.

---

## 🤝 Contribution
Feel free to fork this repository and submit a pull request if you have any improvements or suggestions.

---

## 📧 Contact
For any queries, reach out at: [dhakshinamoorthi.be@gmail.com](mailto:dhakshinamoorthi.be@gmail.com)


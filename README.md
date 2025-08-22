
````markdown
# ⚛️ React Components Library

A React project showcasing **reusable UI components** — `Input` and `DataTable`.  
Styled with **Tailwind CSS**, documented in **Storybook**, and tested using **Jest + React Testing Library**.

---

## 📂 Folder Structure

```bash
reactcomponent/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── DataTable/
│   │   │   ├── DataTable.tsx       # Table component
│   │   │   └── DataTable.test.tsx  # Unit tests for DataTable
│   │   ├── InputComponent/
│   │   │   └── Input.tsx           # Input component
│   │
│   ├── stories/
│   │   ├── Input.stories.tsx       # Storybook for Input
│   │   └── DataTable.stories.tsx   # Storybook for DataTable
│   │
│   ├── App.tsx                     # Demo page showcasing components
│   ├── App.test.tsx                # Default CRA test
│   ├── index.tsx                   # App entry point
│   └── index.css                   # Global styles
│
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── package.json
└── README.md
````

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd reactcomponent
npm install
```

### 2. Run the App

```bash
npm start
```

👉 Runs at: **[http://localhost:3000/](http://localhost:3000/)**

### 3. Run Storybook

```bash
npm run storybook
```

👉 Runs at: **[http://localhost:6006/](http://localhost:6006/)**

### 4. Run Tests

```bash
npm test
```

---

## 🎨 Tailwind Setup

This project uses **Tailwind CSS** for styling.

Installed via:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configured in **`tailwind.config.js`** to scan files inside:

```bash
./src/**/*.{js,jsx,ts,tsx}
```

---

## 🛠️ Components

### ✅ Input Component

* Variants: `outlined`, `filled`, `ghost`
* Features:

  * Helper text
  * Error message display
  * Password toggle
  * Clear button
* Sizes: `sm`, `md`, `lg`

### ✅ DataTable Component

* Customizable **columns**
* **Sorting** support
* **Row selection** (single/multiple)
* **Accessible** with `aria-label`

---

## 🖼️ Screenshots

### 🔹 Input Component

<img width="1890" height="851" alt="Screenshot 2025-08-23 001935" src="https://github.com/user-attachments/assets/dc10fd82-d90c-4023-a70a-dd77cdf92194" />


* Supports multiple sizes (`sm`, `md`, `lg`)
* Variants like `outlined`, `filled`, `ghost`
* Extra features: helper text, error handling, password toggle, clear button

---

### 🔹 DataTable Component

<img width="1033" height="313" alt="Screenshot 2025-08-23 001947" src="https://github.com/user-attachments/assets/9e0e1f35-e7b9-4d6e-8bad-47afea055f2b" />


* Displays data in a tabular format
* Allows column-based sorting
* Includes row selection (checkboxes)
* Fully accessible with `aria-label`

---

## 🧠 Approach

* Built **modular & reusable components** for consistency
* Used **Tailwind CSS** for utility-first, responsive styling
* Integrated **Storybook** to document & test components visually
* Wrote **unit tests** with Jest + React Testing Library
* Created a **demo page (`App.tsx`)** to showcase the components

---

## 🌐 Deployment

* **Vercel App (demo page):** [https://react-component-development-assignm-three.vercel.app/](https://react-component-development-assignm-three.vercel.app/)
* **Storybook (Chromatic preview):** [https://www.chromatic.com/setup?appId=68a8bcc6ccbb98aa6eabc93a](https://www.chromatic.com/setup?appId=68a8bcc6ccbb98aa6eabc93a)

---




```markdown
# ⚛️ React Components Library

A React project showcasing **reusable UI components** — `Input` and `DataTable`.  
Styled with **Tailwind CSS**, documented in **Storybook**, and tested using **Jest + React Testing Library**.

---

## 📂 Folder Structure

```

src/
├── components/
│   ├── DataTable/
│   │   ├── DataTable.tsx       # Table component
│   │   └── DataTable.test.tsx  # Unit tests for DataTable
│   ├── InputComponent/
│   │   └── Input.tsx           # Input component
│
├── stories/                    # Storybook stories
│   ├── Input.stories.tsx
│   └── DataTable.stories.tsx
│
├── App.tsx                     # Demo page showcasing components
├── App.test.tsx                # Default CRA test
└── index.tsx                   # App entry point

````

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd reactcomponent
npm install
````

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

```
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

## 🧠 Approach

* Built **modular & reusable components** for consistency
* Used **Tailwind CSS** for utility-first, responsive styling
* Integrated **Storybook** to document & test components visually
* Wrote **unit tests** with Jest + React Testing Library
* Created a **demo page (`App.tsx`)** to showcase the components

---

```

---



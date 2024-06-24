# Form Builder Demo

Form Builder Demo is a web application built with React and Vite that offers an intuitive interface for constructing and previewing forms. Users can interact with form fields in various ways, including creating, modifying, and reordering them.

[Live Demo](https://form-builder.oran.zone/)

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LixingSun/form-builder-demo.git
```

2. Navigate to the project directory:

```bash
cd form-builder-demo
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

Open http://localhost:5173 to view it in your browser.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI (Material-UI)](https://mui.com/)
- [Formik](https://formik.org/)
- [Vitest](https://vitest.dev/)
- [Husky](https://typicode.github.io/husky/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## State Management

The application uses a combination of React's Context API and Reducer for state management. For more information, visit React offcial guide - [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context).

## CI/CD

- **Local Hooks**:
  - before commit: execute TypeScript check, eslint and prettier
  - before push: execute unit tests
- **Pipeline and Deployment**: [GitHub Actions](https://github.com/LixingSun/form-builder-demo/actions)
- **Hosting**: [GitHub Pages](https://form-builder.oran.zone/)

## Storage

The application utilizes browser localStorage to store form data. Any changes made to the form, such as modifying fields, are synchronized with localStorage in real-time.

### Form Schema Sample

```json
{
  "title": "Test Form",
  "description": "Welcome to Form Builder Demo. Feel free to play around and create your own form.",
  "fields": [
    {
      "id": "1",
      "type": "textField",
      "key": "firstName",
      "title": "First Name",
      "description": "Please enter your first name",
      "isRequired": true,
      "maxLength": null
    },
    {
      "id": "2",
      "type": "textField",
      "key": "lastName",
      "title": "Last Name",
      "description": "Please enter your last name",
      "isRequired": true,
      "maxLength": null
    },
    {
      "id": "3",
      "type": "number",
      "key": "age",
      "title": "Age",
      "description": "Please enter your age",
      "isRequired": false,
      "minValue": "1",
      "maxValue": "150"
    }
  ]
}
```

# RenewTrack

RenewTrack is a React-based **Contract Renewal CRM** developed as a Module 2 project.

The application helps users manage customers and their contracts, monitor renewal dates, track contract status, and view contract information through a dashboard and reports page.

---

## Features

### Dashboard

- Displays total customers
- Displays total contracts
- Displays active contracts
- Displays contracts expiring soon
- Displays expired contracts
- Shows upcoming renewals ordered by expiry date

### Customer Management

- View all customers
- Search customers
- Add new customers
- View customer details
- Edit customer information
- Delete customers that have no contracts
- Prevent deletion when contracts are linked to a customer

### Contract Management

- View all contracts
- Search contracts
- Filter contracts by status
- Add new contracts
- View contract details
- Edit existing contracts
- Track days remaining until expiry
- Display how many days ago a contract expired
- Preserve contracts as historical business records

### Reports

- Display total contract count
- Display active contract count
- Display expiring soon contract count
- Display expired contract count
- Calculate total contract value
- Calculate active contract value
- Display a contract report ordered by expiry date

### Authentication

- Demo login page
- Email format validation
- Password validation
- React Context authentication state
- Protected application routes
- Logout functionality

---

## Demo Login

RenewTrack includes simulated front-end authentication for demonstration purposes.

Use:

- **Email:** Any valid email address
- **Password:** `1234`

Example:

- **Email:** `user@example.com`
- **Password:** `1234`

The authentication feature demonstrates React Context, protected routes, login/logout state, form handling, and validation.

> **Important:** This is demo authentication only. The password is stored in front-end code and this authentication should not be used to protect real or sensitive data.

---

## Technologies Used

- React
- JavaScript
- JSX
- React Router
- React Context API
- React Hooks
- Vite
- CSS
- JSON Server
- REST API concepts
- ESLint
- Git
- GitHub

---

## React Concepts Demonstrated

RenewTrack demonstrates the following React and JavaScript concepts:

- Components
- Props
- State
- `useState`
- `useEffect`
- `useContext`
- Controlled forms
- Form validation
- Conditional rendering
- List rendering
- Event handling
- React Router
- Dynamic routes
- Protected routes
- Context API
- Asynchronous JavaScript
- `async` / `await`
- Fetch API
- REST API operations
- Loading states
- Error handling
- Reusable components
- Array methods such as:
  - `map()`
  - `filter()`
  - `some()`
  - `sort()`
  - `reduce()`

---

## Customer and Contract Relationship

Each contract belongs to a customer.

Contracts store a `customerId` that links the contract to its customer record.

Example:

```json
{
  "id": "1",
  "customerId": "1",
  "customer": "ABC Pte Ltd",
  "contractName": "IT Maintenance Contract",
  "startDate": "2026-01-01",
  "expiryDate": "2026-12-31",
  "value": 24000,
  "status": "Active"
}
```

RenewTrack uses the customer ID relationship to determine whether a customer has existing contracts.

---

## Business Rules

RenewTrack includes several business rules.

### Customer Deletion

A customer can only be deleted when the customer has **no existing contracts**.

If contracts are linked to the customer, the Delete button is disabled.

### Contract Retention

Contracts cannot be deleted.

This applies to:

- Active contracts
- Expiring Soon contracts
- Expired contracts

Contracts are treated as historical business records and are therefore retained in the system.

### Contract Validation

Contract forms validate important information before saving.

Examples include:

- Customer must be selected
- Contract name is required
- Start date is required
- Expiry date is required
- Expiry date must be after the start date
- Contract value must be greater than zero

### Customer Validation

Customer forms validate information such as:

- Company name
- Contact person
- Email
- Phone number

### IDs

Customer and contract IDs are treated as strings.

This supports JSON Server generated IDs that may contain both letters and numbers.

---

## API

RenewTrack uses **JSON Server** as a development REST API.

The application uses two main API resources:

```text
/customers
/contracts
```

Customer operations include:

```text
GET     /customers
POST    /customers
PUT     /customers/:id
DELETE  /customers/:id
```

Contract operations include:

```text
GET     /contracts
POST    /contracts
PUT     /contracts/:id
```

Contract deletion is intentionally not implemented because contracts are retained as historical business records.

---

## Running the Project

### 1. Install Dependencies

Open a terminal in the RenewTrack project folder and run:

```bash
npm install
```

### 2. Start the React Application

Run:

```bash
npm run dev
```

The React development server normally runs at:

```text
http://localhost:5173
```

### 3. Start JSON Server

Open a **second terminal** in the same project folder and run:

```bash
npm run server
```

JSON Server runs at:

```text
http://localhost:3001
```

Both the React application and JSON Server need to be running during local development.

---

## Application Routes

RenewTrack includes the following routes:

```text
/login

/dashboard

/customers
/customers/new
/customers/:customerId
/customers/:customerId/edit

/contracts
/contracts/new
/contracts/:contractId
/contracts/:contractId/edit

/reports
```

The Dashboard, Customers, Contracts, and Reports pages are protected routes.

Users who are not logged in are redirected to the Login page.

---

## Main Pages

### Login

Provides demo authentication using an email address and password.

### Dashboard

Provides an overview of customer and contract information, including upcoming renewals.

### Customers

Displays customer records and provides search, view, edit, add, and controlled delete functionality.

### Contracts

Displays contract records and provides search, status filtering, view, edit, and add functionality.

### Reports

Provides contract statistics, contract values, and a report table sorted by expiry date.

---

## Project Structure

```text
renewtrack/
│
├── src/
│   │
│   ├── components/
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusBadge.jsx
│   │
│   ├── context/
│   │   ├── authContext.js
│   │   └── AuthContext.jsx
│   │
│   ├── layouts/
│   │   └── RootLayout.jsx
│   │
│   ├── pages/
│   │   ├── ContractDetailPage.jsx
│   │   ├── ContractsPage.jsx
│   │   ├── CustomerDetailPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── EditContractPage.jsx
│   │   ├── EditCustomerPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NewContractPage.jsx
│   │   ├── NewCustomerPage.jsx
│   │   └── ReportsPage.jsx
│   │
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── validationUtils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── package.json
├── package-lock.json
└── README.md
```

---

## Data Persistence

RenewTrack uses JSON Server and `db.json` for local development data persistence.

Unlike temporary React state, customer and contract changes stored through JSON Server remain available after refreshing the browser.

The current development database contains:

```text
customers
contracts
```

---

## Loading and Error Handling

RenewTrack includes loading and error states when customer and contract data is retrieved from the API.

For example, while data is loading the application can display:

```text
Loading customers...
```

or:

```text
Loading contracts...
```

If the API is unavailable, the application displays a user-friendly error message instead of failing silently.

---

## Form Validation

RenewTrack performs client-side validation before customer or contract data is sent to the API.

Validation logic is stored in a reusable utility:

```text
src/utils/validationUtils.js
```

This allows the Add and Edit pages to share the same validation rules.

---

## Responsive Design

RenewTrack includes responsive CSS for smaller screens.

The interface adapts elements such as:

- Sidebar navigation
- Dashboard statistics
- Reports
- Tables
- Search and filter controls
- Login page
- User bar

Tables can scroll horizontally when there is not enough screen width to display all columns.

---

## Development Checks

Run ESLint with:

```bash
npm run lint
```

Create a production build with:

```bash
npm run build
```

These commands should be run before committing the final project.

---

## Current Project Scope

RenewTrack is a front-end learning project with a JSON Server development API.

It demonstrates the main concepts covered during the React learning module while applying them to a practical Contract Renewal CRM.

The current version includes:

- Routing
- State management
- Context
- API integration
- CRUD operations
- Search
- Filtering
- Validation
- Loading states
- Error handling
- Protected routes
- Reporting
- Responsive styling

---

## Future Improvements

Possible future enhancements include:

- Production authentication
- User roles and permissions
- Admin and standard user accounts
- Backend application server
- Production database
- Automated renewal reminders
- Email notifications
- Advanced reporting
- Charts and analytics
- Report export
- Pagination
- Automated testing
- Cloud deployment
- Audit history
- Renewal workflow management

---

## Author

**Andrew Leung**

Developed as part of a React learning project.
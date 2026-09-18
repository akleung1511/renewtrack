# RenewTrack

RenewTrack is a React-based **Contract Renewal CRM** designed to help users manage customers, contracts, renewal dates, contract values, and contract statuses through a simple and structured interface.

The application provides customer and contract management, dashboard statistics, renewal tracking, reporting, authentication, search and filtering.

---

## Live Demo

**RenewTrack Live Application**

https://akleung1511.github.io/renewtrack/#/login

### Demo Login

Enter any valid email address.

**Password:**

```text
1234
```

Example:

```text
Email: demo@example.com
Password: 1234
```

> The login system is simulated front-end authentication for demonstration purposes. It is not intended to provide production-level authentication or security.

---

## GitHub Repository

Source code:

https://github.com/akleung1511/renewtrack

---

## About RenewTrack

Managing multiple customer contracts can become difficult when customer information, renewal dates, contract values, and contract statuses are stored separately.

RenewTrack brings this information together in a simple CRM-style application.

The application allows users to:

- Manage customer records
- Manage customer contracts
- Track contract expiry dates
- Identify upcoming renewals
- View expired contracts
- Search and filter records
- View dashboard statistics
- View contract reports
- Add and edit customer records
- Add and edit contract records
- Navigate between related customer and contract information

---

## Main Features

### Dashboard

The dashboard provides an overview of the contract portfolio.

It displays:

- Total Customers
- Total Contracts
- Active Contracts
- Expiring Soon Contracts
- Expired Contracts
- Upcoming Renewals

Upcoming renewals are sorted by expiry date so contracts with nearer renewal dates can be identified quickly.

---

## Customer Management

The Customers section provides a structured view of customer information.

Customer records include:

- Company Name
- Contact Person
- Email
- Phone Number

Users can:

- View customers
- Search customers
- Add customers
- View customer details
- Edit customers
- Delete eligible customers

A customer with an existing contract cannot be deleted. This protects the relationship between customer and contract records.

---

## Contract Management

The Contracts section allows users to manage customer contracts.

Contract records include:

- Customer
- Contract Name
- Start Date
- Expiry Date
- Contract Value
- Status

Available contract statuses include:

- Active
- Expiring Soon
- Expired

Users can:

- View contracts
- Search contracts
- Filter contracts
- Add contracts
- View contract details
- Edit contracts
- Track days remaining until expiry

Contracts are retained as historical business records and therefore are not deleted from the application.

---

## Reports

RenewTrack includes a Reports page that provides an overview of contract information and renewal status.

The reporting functionality helps users understand the overall contract portfolio and identify contracts requiring attention.

---

## Authentication

RenewTrack includes a simulated authentication system using React Context.

Protected routes prevent access to the main application until the user logs in.

The demonstration password is:

```text
1234
```

This authentication system is intended for demonstration purposes only.

A production version would normally use secure server-side authentication and authorization.

---

## Routing

RenewTrack uses React Router to provide navigation within the single-page application.

Main routes include:

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

The public GitHub Pages version uses `HashRouter` to support client-side routing.

For example:

```text
https://akleung1511.github.io/renewtrack/#/dashboard
```

---

## Data Management

RenewTrack has been implemented using two approaches to data persistence.

### API Version

The API-based version uses **JSON Server** as a mock REST API.

The React application communicates with endpoints such as:

```text
GET    /customers
POST   /customers
PUT    /customers/:id
DELETE /customers/:id

GET    /contracts
POST   /contracts
PUT    /contracts/:id
```

The local API runs at:

```text
http://localhost:3001
```

Data is stored in:

```text
db.json
```

This implementation demonstrates asynchronous API communication using JavaScript `fetch()`.

---

### GitHub Pages Version

GitHub Pages provides static website hosting and does not run the local JSON Server backend.

The publicly deployed version therefore uses browser:

```text
localStorage
```

The deployed architecture is:

```text
GitHub Pages
      ↓
React Application
      ↓
React State
      ↓
localStorage
```

This allows users to add and edit records and retain their changes after refreshing the browser.

### Data Persistence Limitation

`localStorage` belongs to an individual browser.

This means:

- Data remains after refreshing the page
- Data remains when reopening the application in the same browser
- Different browsers have separate data
- Different computers have separate data
- Changes are not shared between users

A future full-stack version could replace localStorage with a shared backend API and database.

---

# Technologies Used

RenewTrack was built using:

- React
- JavaScript
- JSX
- HTML
- CSS
- Vite
- React Router
- React Context
- React Hooks
- JSON Server
- REST API
- Fetch API
- localStorage
- ESLint
- Git
- GitHub
- GitHub Actions
- GitHub Pages

---

## React Concepts Demonstrated

### Components

The application is divided into reusable components such as:

```text
Sidebar
StatCard
StatusBadge
ProtectedRoute
```

Reusable components help keep the application organised and reduce duplicated code.

---

### State Management

React state is managed using hooks such as:

```javascript
useState()
```

State is used for:

- Customers
- Contracts
- Forms
- Authentication
- Search
- Filtering

---

### Side Effects

The application uses:

```javascript
useEffect()
```

for operations such as:

- Loading data
- Saving deployed data to localStorage
- Synchronising application state

---

### Context API

React Context is used to manage authentication information across the application.

This allows authentication state to be shared between components without manually passing it through multiple component levels.

---

### Controlled Forms

Customer and contract forms use controlled React inputs.

For example:

```javascript
const [formData, setFormData] = useState({
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
});
```

Input changes update React state through event handlers.

---

### Lists and Array Methods

Customer and contract data is processed using JavaScript array methods including:

```javascript
map()
filter()
sort()
some()
```

These are used for displaying records, searching, filtering, checking relationships and sorting renewals.

---

### Conditional Rendering

RenewTrack uses conditional rendering for:

- Loading states
- Error messages
- Contract statuses
- Expired contracts
- Search results
- Protected routes
- Record-not-found pages

---

### React Router

React Router provides navigation between the different areas of RenewTrack.

Concepts used include:

```text
Routes
Route
Navigate
NavLink
Link
Outlet
useParams
useNavigate
```

---

## Business Rules

RenewTrack includes several business rules to protect data consistency.

### Customer Deletion

Customers with existing contracts cannot be deleted.

This prevents contracts from becoming disconnected from their customer records.

### Contract History

Contracts are retained rather than deleted so historical contract information remains available.

### Customer and Contract Relationship

Contracts reference customers through a customer ID.

When customer information is updated, related contract information can also be kept synchronised.

---

## Project Structure

The project is organised approximately as follows:

```text
renewtrack/
│
├── public/
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
│   │   ├── AuthContext.jsx
│   │   └── authContext.js
│   │
│   ├── layouts/
│   │   └── RootLayout.jsx
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── NewCustomerPage.jsx
│   │   ├── CustomerDetailPage.jsx
│   │   ├── EditCustomerPage.jsx
│   │   ├── ContractsPage.jsx
│   │   ├── NewContractPage.jsx
│   │   ├── ContractDetailPage.jsx
│   │   ├── EditContractPage.jsx
│   │   ├── LoginPage.jsx
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
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── db.json
├── package.json
├── vite.config.js
└── README.md
```

---

## Running RenewTrack Locally

### 1. Clone the repository

```bash
git clone https://github.com/akleung1511/renewtrack.git
```

Move into the project directory:

```bash
cd renewtrack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run dev
```

Vite will display the development URL in the terminal.

---

## Running the JSON Server API

For the API-based version, JSON Server can be started using:

```bash
npm run server
```

The API runs on:

```text
http://localhost:3001
```

Available endpoints include:

```text
http://localhost:3001/customers
http://localhost:3001/contracts
```

The React development server and JSON Server should run in separate terminals.

For example:

```text
Terminal 1
npm run server

Terminal 2
npm run dev
```

---

## Code Quality

RenewTrack uses ESLint for code checking.

Run:

```bash
npm run lint
```

A successful lint check completes without ESLint errors.

---

## Production Build

Create a production build with:

```bash
npm run build
```

Vite generates the production files inside:

```text
dist/
```

The application has been successfully tested using:

```bash
npm run lint
npm run build
```

---

## Deployment

RenewTrack is publicly deployed using:

- GitHub
- GitHub Actions
- GitHub Pages

The deployment workflow performs the following process:

```text
deployment branch
        ↓
Install dependencies
        ↓
Build React application
        ↓
Generate dist/
        ↓
Upload GitHub Pages artifact
        ↓
Deploy to GitHub Pages
```

Live application:

https://akleung1511.github.io/renewtrack/

---

## Repository Branches

RenewTrack maintains separate versions for API development and public deployment.

### `main`

The `main` branch contains the JSON Server / REST API implementation.

It demonstrates API-based data management using:

```text
React
   ↓
fetch()
   ↓
JSON Server
   ↓
db.json
```

### `deployment`

The `deployment` branch contains the publicly hosted version.

It uses:

```text
React
   ↓
HashRouter
   ↓
React State
   ↓
localStorage
```

The deployment branch also includes:

- Vite `/renewtrack/` base path
- GitHub Actions deployment workflow
- GitHub Pages configuration

This separation preserves the API implementation while providing a publicly accessible demonstration.

---

## Current Limitations

The current public version is intended as a demonstration application.

Current limitations include:

- Authentication is simulated
- Data is stored locally in each browser
- No shared multi-user database
- No server-side authorization
- No automatic renewal notifications
- No document storage
- No production backend

---

## Future Improvements

Potential future enhancements include:

- Backend API
- SQL or NoSQL database
- Secure user authentication
- User roles and permissions
- Shared multi-user data
- Automated renewal notifications
- Email reminders
- Contract document uploads
- Advanced reports
- Charts and analytics
- Audit history
- Customer activity history
- Responsive mobile improvements
- Automated testing
- Cloud backend deployment

---

## Project Development

RenewTrack demonstrates how several front-end development concepts can be combined into a larger business application.

The project incorporates:

```text
React Components
        ↓
State Management
        ↓
Forms & Validation
        ↓
Routing
        ↓
Context API
        ↓
API Communication
        ↓
Business Rules
        ↓
Deployment
```

The project also provided practical experience with:

- Git version control
- GitHub repositories
- Branch management
- Production builds
- GitHub Actions
- GitHub Pages
- Separating development and deployment configurations

---

## Author

**Andrew Leung**

RenewTrack — Contract Renewal CRM

GitHub:

https://github.com/akleung1511

---

## Live Project

**RenewTrack Contract Renewal CRM**

https://akleung1511.github.io/renewtrack/#/login

**Source Code**

https://github.com/akleung1511/renewtrack
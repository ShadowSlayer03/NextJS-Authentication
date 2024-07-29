# Next.js Authentication and Profile Management

This project is a Next.js application showcasing client-side authentication and user profile management. It includes routes for login, signup, viewing user profiles, and logging out.

## Features

- **Login**: Authenticates users and grants access to the application.
- **Signup**: Allows users to create a new account.
- **Profile**: Displays user profile information such as username and email.
- **Logout**: Logs the user out and clears their session.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for making API requests.
- [React Hot Toast](https://react-hot-toast.com/) - Simple and customizable toasts for notifications.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShadowSlayer03/https://github.com/ShadowSlayer03/NextJS-Authentication.git

2. **Navigate to the Project Directory:**

    ```bash
    cd NextJS-Authentication

3. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install


### Running the Application

1. **Start the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev

2. **Open Your Browser and Visit**

   ```bash
   http://localhost:3000


### Usage

- Login: Navigate to /login to authenticate.
- Signup: Go to /signup to create a new account.
- Profile: Access /profile to view user details and log out.

### API Endpoints
- POST /api/auth/login - Handles user login.
- POST /api/auth/signup - Registers a new user.
- GET /api/users/profile - Retrieves user profile information.
- GET /api/users/logout - Logs out the user.

### Contributing
Feel free to open issues or submit pull requests. Contributions are welcome!
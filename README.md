# TeensSport - Fitness Application

![TeensSport Logo](Images/logo_teensport.png)

TeensSport is a comprehensive fitness application designed to help users track their workouts and access exercise tutorials. The application features a user-friendly interface with various workout categories and detailed exercise instructions.

## 🌟 Features

- **User Authentication**
  - Secure user registration and login
  - User profile management
  - Protected routes for authenticated users

- **Workout Categories**
  - Abdominals
  - Biceps
  - Chest
  - Shoulders
  - Back (Lats, Traps, Lower Back)
  - Legs (Quads, Hamstrings, Calves)
  - And more!

- **Exercise Library**
  - Detailed exercise instructions
  - Step-by-step tutorials
  - Exercise variations

- **Responsive Design**
  - Works on desktop and mobile devices
  - Intuitive navigation
  - Clean and modern UI

## 🚀 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Bcrypt for password hashing

### Development Tools
- Nodemon for development server
- Mocha & Chai for testing
- Git for version control

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd TeensSport
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database
   - Import the database schema (if available in the repository)
   - Update the database configuration in `backend/db.js`

4. **Configure environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   - Open `index.html` in your web browser
   - Or use a local server to serve the frontend files

## 🧪 Testing

To run the test suite:

```bash
cd backend
npm test
```

## 🛠 Project Structure

```
TeensSport/
├── backend/               # Backend server code
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── routes/           # API routes
│   ├── test/             # Test files
│   ├── db.js             # Database configuration
│   └── server.js         # Server entry point
├── Images/               # Image assets
├── *.html                # Frontend pages
└── README.md             # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Unsplash](https://unsplash.com/) for images
- All contributors who have helped shape this project

## 📧 Contact

For any questions or feedback, please contact [alvinnanda.kurniawan.com](mailto:alvinnanda.kurniawan.com)

---

Made with ❤️ by [Your Name/Team Name]

# Admin Witsawa 🚀

A modern, responsive admin dashboard built with React, TypeScript, and Vite. This application provides comprehensive user management capabilities with a beautiful, intuitive interface designed for scalability and performance.

![Admin Dashboard](src/assets/images/icon.png)

## ✨ Features

### 🔐 Authentication
- Secure login system with JWT token management
- Protected routes with role-based access control
- Automatic token refresh and session management
- Custom error handling with user-friendly modals

### 👥 User Management
- **CRUD Operations**: Create, Read, Update, Delete users
- **Advanced Search**: Real-time search across user data
- **Filtering**: Filter users by role and status
- **Pagination**: Efficient data loading and navigation
- **Bulk Actions**: Multi-select and bulk operations

### 🎨 UI/UX Excellence
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Optimized for all screen sizes
- **Interactive Modals**: Confirmation dialogs for all actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error feedback
- **Success Notifications**: Clear success confirmations

### 🛠️ Technical Features
- **TypeScript**: Full type safety and IntelliSense
- **Ant Design**: Professional UI components
- **Tailwind CSS**: Utility-first styling
- **Axios Interceptors**: Automated API error handling
- **Context API**: Global state management
- **React Router**: Client-side routing

## � Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Lightning-fast build tool
- **Ant Design 5** - Enterprise UI components
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Declarative routing

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS post-processing
- **Autoprefixer** - CSS vendor prefixing

### HTTP Client
- **Axios** - Promise-based HTTP client with interceptors

## 📁 Project Structure

```
admin-witsawa/
├── public/                     # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                 # Images and static files
│   │   ├── images/
│   │   │   ├── bg1.png        # Background images
│   │   │   ├── bg2.png
│   │   │   └── icon.png       # App icon
│   │   └── react.svg
│   ├── components/             # Reusable components
│   │   ├── common/            # Common UI components
│   │   ├── forms/             # Form components
│   │   │   └── UserForm.tsx   # User creation/editing form
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx     # App header
│   │   │   ├── MainLayout.tsx # Main layout wrapper
│   │   │   └── Sidebar.tsx    # Navigation sidebar
│   │   └── table/             # Table components
│   │       └── UserTable.tsx  # User data table
│   ├── context/               # React Context providers
│   │   └── AuthContext.tsx    # Authentication context
│   ├── interceptor/           # HTTP interceptors
│   │   └── axiosInterceptor.ts # Axios configuration
│   ├── pages/                 # Page components
│   │   ├── auth/
│   │   │   └── LoginPage.tsx  # Login page
│   │   └── users/
│   │       └── UsersPage.tsx  # Users management page
│   ├── router/                # Routing configuration
│   │   ├── AppRouter.tsx      # Main router
│   │   ├── ProtectedRoute.tsx # Route protection
│   │   └── routes.tsx         # Route definitions
│   ├── services/              # API services
│   │   ├── api.ts            # API endpoints
│   │   ├── authservice.ts    # Authentication service
│   │   └── userservice.ts    # User management service
│   ├── App.css               # Global styles
│   ├── App.tsx              # Root component
│   ├── index.css            # Base styles
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── eslint.config.js          # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
└── vite.config.ts           # Vite configuration
```

## �️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-witsawa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_TITLE=Admin Witsawa
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## 🔌 API Integration

### Base Configuration
The application uses Axios with a centralized configuration:

```typescript
// Default API base URL
const baseURL = 'http://localhost:3000/api'

// Automatic token management
// Automatic error handling
// Request/Response interceptors
```

### Available Endpoints

#### Authentication
```typescript
POST /auth/login     # User login
POST /auth/logout    # User logout
GET  /auth/profile   # Get user profile
```

#### User Management
```typescript
GET    /users        # Get all users (with pagination/search)
GET    /users/:id    # Get specific user
POST   /users        # Create new user
PUT    /users/:id    # Update user
DELETE /users/:id    # Delete user
```

### Request/Response Format

#### Login Request
```json
{
  "username": "admin",
  "password": "password123"
}
```

#### User Data Format
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "username": "string",
  "roles": ["admin", "user"],
  "status": "active" | "inactive",
  "dateOfBirth": "YYYY-MM-DD",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 🎮 Usage Guide

### Authentication Flow
1. **Login**: Access the login page at `/login`
2. **Credentials**: Enter username and password
3. **Success**: Redirected to users dashboard
4. **Error**: Modal displays error message

### User Management

#### Creating Users
1. Click "Add User" button
2. Fill in the user form
3. Select appropriate roles
4. Confirm creation in modal
5. Success notification displayed

#### Editing Users
1. Click dropdown menu (⋮) on user row
2. Select "Edit"
3. Modify user information
4. Confirm changes in modal
5. Success notification displayed

#### Deleting Users
1. Click dropdown menu (⋮) on user row
2. Select "Delete"
3. Confirm deletion in modal
4. Success notification displayed

### Search & Filter
- **Search**: Use the search bar to find users by name, email, or username
- **Filter**: Use dropdown filters for role and status
- **Reset**: Clear all filters to show all users

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Customize the design by:

1. **Colors**: Modify `tailwind.config.js`
2. **Components**: Update component styles in respective files
3. **Layouts**: Adjust layout components in `src/components/layout/`

### Theme Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        secondary: '#722ed1',
        // Add your custom colors
      }
    }
  }
}
```

### Environment Variables
```env
VITE_API_URL=your-api-url
VITE_APP_TITLE=your-app-title
VITE_APP_VERSION=1.0.0
```

## 🔒 Security Features

- **JWT Token Management**: Secure authentication with automatic token refresh
- **Route Protection**: Private routes require authentication
- **Input Validation**: Form validation for all user inputs
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Cross-site request forgery prevention

## � Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### Static Hosting (Netlify, Vercel)
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

#### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Test Structure
```
src/
├── components/
│   └── __tests__/
├── services/
│   └── __tests__/
└── utils/
    └── __tests__/
```

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check
```

### Performance Optimization

#### Bundle Analysis
```bash
npm run build:analyze
```

#### Lazy Loading
Components are lazy-loaded for optimal performance:
```typescript
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
```

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Team

- **Frontend Team**: React, TypeScript, UI/UX
- **Backend Team**: API development and integration
- **DevOps Team**: Deployment and infrastructure

## � Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Ant Design](https://ant.design/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Vite](https://vitejs.dev/) - Build Tool

## 📞 Support

For support and questions:
- **Email**: support@witsawa.com
- **Documentation**: [Wiki](wiki-link)
- **Issues**: [GitHub Issues](issues-link)

---

**Admin Witsawa** - Built with ❤️ by the Witsawa Team
```

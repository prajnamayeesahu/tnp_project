# Admin Dashboard Web Application

A modern, single-page application (SPA) built with React and TypeScript to serve as an admin dashboard for a placement management system. This application provides a comprehensive interface for managing students, companies, job listings, applications, and announcements via a RESTful API.

## 🚀 Features

### Core Functionality
- **Dashboard**: High-level overview with key statistics and metrics
- **Student Management**: CRUD operations for student profiles with filtering and search
- **Company Management**: Manage partner companies and their information
- **Job Listings**: Create, edit, and manage job postings with status control
- **Application Management**: Track and update application statuses
- **Announcements**: Create targeted announcements for students
- **Analytics**: Detailed insights for jobs and student data

### Technical Features
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS
- **Form Validation**: React Hook Form with Zod schemas
- **State Management**: Zustand for efficient global state
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with responsive sidebar
- **Toast Notifications**: User feedback for all operations

## 🛠️ Technology Stack

- **Frontend Framework**: React.js 19
- **Language**: TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: Zustand
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tnp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service layer
├── store/              # Zustand store
├── types/              # TypeScript interfaces
├── lib/                # Utility functions
└── App.tsx            # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📱 Usage

### Dashboard
- View key statistics and metrics
- Quick access to common actions

### Students
- Add new students with registration numbers
- Filter by branch, year, and CGPA
- Search by name, registration number, or email
- Edit and delete student profiles

### Companies
- Manage partner company information
- Add, edit, and remove companies

### Jobs
- Create new job listings
- Link jobs to specific companies
- Toggle job status (Open/Closed)
- Manage job details and requirements

### Applications
- View all job applications
- Update application statuses
- Track application pipeline

### Announcements
- Create targeted announcements
- Target specific audiences (All, Branch, Batch)
- Manage announcement content

### Analytics
- View job-specific analytics
- Student distribution metrics
- Profile completion statistics

## 🎨 Customization

### Styling
The application uses Tailwind CSS with a custom design system. You can customize colors, spacing, and components in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS variables and base styles

### Components
All UI components are built with Shadcn UI and can be customized in the `src/components/ui/` directory.

## 🔌 API Integration

The application expects a RESTful API with the following endpoints:

- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/students` - List all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/companies` - List all companies
- `GET /api/jobs` - List all jobs
- `GET /api/applications` - List all applications
- `GET /api/announcements` - List all announcements
- `GET /api/analytics/jobs/:id` - Job analytics
- `GET /api/analytics/students` - Student analytics

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Update environment variables** for production API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

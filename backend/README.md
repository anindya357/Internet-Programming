# FitTrack CUET Backend

A FastAPI backend for the FitTrack CUET Gymnasium Management System.

## Features

- **Authentication**: JWT-based authentication with secure password hashing
- **User Management**: Registration, login, profile management
- **Workout Tracking**: Create, manage, and track workout routines with exercises
- **Equipment Catalog**: Browse and manage gym equipment
- **Medical Profiles**: Store and manage health information
- **Diet Planning**: Personalized nutrition plans and meal tracking
- **AI Instructor**: Gemini-powered fitness assistant
- **Admin Dashboard**: Gym status, announcements, and analytics

## Tech Stack

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (python-jose) + bcrypt
- **AI**: Google Gemini API
- **Validation**: Pydantic

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/fittrack_cuet

# JWT Settings
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# App Settings
DEBUG=true
CORS_ORIGINS=http://localhost:3000,http://localhost:5500,http://127.0.0.1:5500
```

### 3. Create PostgreSQL Database

```sql
CREATE DATABASE fittrack_cuet;
```

### 4. Run the Application

```bash
# Development with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or run directly
python main.py
```

### 5. Access API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users/` - List all users (Admin)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/me` - Update current user

### Workouts
- `POST /api/workouts/` - Create workout
- `GET /api/workouts/` - List user's workouts
- `GET /api/workouts/{id}` - Get workout details
- `PUT /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout

### Equipment
- `GET /api/equipment/` - List all equipment
- `GET /api/equipment/{id}` - Get equipment details
- `POST /api/equipment/` - Create equipment (Admin)
- `PUT /api/equipment/{id}` - Update equipment (Admin)

### Medical Profile
- `GET /api/medical-profile/` - Get user's medical profile
- `POST /api/medical-profile/` - Create medical profile
- `PUT /api/medical-profile/` - Update medical profile
- `GET /api/medical-profile/health-metrics` - Get calculated health metrics

### Diet Plans
- `GET /api/diet/` - Get user's diet plan
- `POST /api/diet/` - Create diet plan
- `PUT /api/diet/` - Update diet plan
- `GET /api/diet/diet-types` - Get available diet types
- `GET /api/diet/goals` - Get available diet goals

### Admin
- `GET /api/admin/gym-status` - Get gym status
- `PUT /api/admin/gym-status` - Update gym status (Admin)
- `POST /api/admin/gym-status/toggle` - Toggle gym open/closed (Admin)
- `GET /api/admin/announcements` - List announcements
- `POST /api/admin/announcements` - Create announcement (Admin)
- `GET /api/admin/stats` - Get admin statistics (Admin)

### AI Instructor
- `POST /api/ai-instructor/chat` - Chat with AI instructor
- `GET /api/ai-instructor/history` - Get chat history
- `GET /api/ai-instructor/suggestions` - Get quick suggestions
- `GET /api/ai-instructor/contexts` - Get available chat contexts

## Project Structure

```
backend/
├── main.py                 # Application entry point
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables
├── app/
│   ├── __init__.py
│   ├── api/               # API route handlers
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── workouts.py
│   │   ├── equipment.py
│   │   ├── medical_profile.py
│   │   ├── diet.py
│   │   ├── admin.py
│   │   └── ai_instructor.py
│   ├── core/              # Core configuration
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/            # SQLAlchemy models
│   │   ├── user.py
│   │   ├── workout.py
│   │   ├── equipment.py
│   │   ├── medical_profile.py
│   │   ├── diet_plan.py
│   │   ├── gym_status.py
│   │   └── chat_history.py
│   ├── schemas/           # Pydantic schemas
│   │   ├── user.py
│   │   ├── workout.py
│   │   ├── equipment.py
│   │   ├── medical_profile.py
│   │   ├── diet_plan.py
│   │   ├── gym_status.py
│   │   └── chat.py
│   └── services/          # Business logic
│       └── gemini_service.py
```

## License

MIT License

# 🔍 NutriGuardAI

**AI-Powered Personalized Nutrition Platform**

NutriGuardAI is a comprehensive AI-driven application that revolutionizes nutrition management through personalized diet planning and intelligent ingredient analysis. Built with cutting-edge technologies, it provides users with interactive chat-based diet planning and real-time ingredient scanning capabilities.

[![License](https://img.shields.io/badge/license-Private-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features

### 🤖 AI-Powered Diet Planning
- **Interactive Chat Interface**: Conversational AI that collects user preferences through natural language
- **Personalized Recommendations**: Generates customized diet plans based on user goals, preferences, and location
- **Multiple Diet Goals**: Supports Weight Loss, Weight Gain, and Maintenance plans
- **Location-Aware**: Provides region-specific food recommendations and cultural preferences
- **Real-time Feedback**: Live conversation with instant AI responses via Socket.IO

### 📱 Ingredient Analysis & Scanning
- **OCR Technology**: Advanced image processing for food label analysis
- **Intelligent Extraction**: Uses AI to identify ingredients and nutritional information
- **Cloud Storage**: Secure image upload and processing with Cloudinary
- **Research Integration**: Connects with external APIs for comprehensive ingredient research
- **Workflow Automation**: Integrated with Kestra for automated processing pipelines

### 👤 User Management
- **Secure Authentication**: JWT-based authentication with hashed passwords
- **User Profiles**: Comprehensive user management with preferences and history
- **Session Management**: Cookie-based sessions for seamless experience

### 🎨 Modern Web Interface
- **Responsive Design**: Fully responsive UI built with Next.js
- **Rich Text Support**: Markdown rendering for formatted AI responses
- **Real-time Updates**: Live chat experience with WebSocket integration
- **Intuitive UX**: Clean, modern interface with actionable cards and navigation

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Framework**: Tailwind CSS v4
- **Component Library**: Radix UI
- **Icons**: Phosphor Icons, Lucide React
- **Real-time Communication**: Socket.IO Client
- **HTTP Client**: Axios
- **Markdown Processing**: React Markdown with GFM Support

### Backend (Server)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js v5
- **AI/ML**: LangChain, LangGraph, OpenAI GPT-4
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **Real-time**: Socket.IO
- **Validation**: Zod
- **Logging**: Winston
- **Middleware**: Morgan, CORS, Cookie Parser
- **Workflow**: Kestra Integration

### Development & DevOps
- **Package Managers**: npm / yarn / pnpm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript
- **Containerization**: Docker (via docker-compose)
- **Environment Management**: dotenv
- **Process Management**: Nodemon

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NutriGuardAI Platform                     │
├─────────────────────────────────────────────────────────────┤
│  Frontend Layer (Next.js)                                   │
│  ├── Interactive Chat Interface                             │
│  ├── Responsive Web Components                              │
│  └── Real-time Socket Client                                │
├─────────────────────────────────────────────────────────────┤
│  Backend Layer (Express/Node.js)                            │
│  ├── API Routes                                             │
│  │   ├── /v1/ai/dietplan                                   │
│  │   ├── /v1/ai/ingredient/check                           │
│  │   └── /v1/ai/kestra/callback                            │
│  ├── Core Services                                         │
│  │   ├── AI Orchestration (LangGraph)                      │
│  │   ├── Authentication (JWT)                              │
│  │   ├── Image Processing (Cloudinary)                     │
│  │   └── Real-time Events (Socket.IO)                      │
│  ├── Business Logic                                        │
│  │   ├── Diet Plan Generation                              │
│  │   ├── Ingredient Analysis                               │
│  │   └── Workflow Management                               │
│  └── Database Layer                                        │
│      ├── User Management (MongoDB)                         │
│      ├── Diet Plans & Sessions                             │
│      └── Photo & Scan History                              │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ├── OpenAI GPT-4                                          │
│  ├── Kestra Workflow Engine                                │
│  ├── Cloudinary (Image Hosting)                            │
│  └── MongoDB Atlas                                         │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

Before setting up NutriGuardAI, ensure you have:

- **Node.js**: v18 or higher
- **Package Manager**: npm, yarn, pnpm, or bun
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For cloning the repository
- **API Keys**:
  - OpenAI API Key (for GPT-4 access)
  - Cloudinary Account (for image processing)

### System Requirements
- **Operating System**: macOS, Linux, or Windows
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: 500MB+ free space for dependencies and binaries

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/virajpwdn/NutriGuardAI.git
cd NutriGuardAI
```

### 2. Environment Setup

Create environment files for both client and server:

```bash
# Copy environment templates
cp client/.env.example client/.env.local
cp server/.env.example server/.env
```

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm run start
```

### 4. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm run start
```

### 5. Using Docker (Alternative)

If you prefer containerized deployment:

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

## 🔐 Environment Configuration

### Client (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:2001/v1/ai
NEXT_PUBLIC_SOCKET_URL=http://localhost:2001
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Server (.env)
```
# Server Configuration
PORT=2001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nutriguardai

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXP_TIME=24h

# OpenAI
OPENAI_API_KEY=sk-your_openai_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Logging
LOG_LEVEL=info

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

## 🎯 Usage

### For Users

#### Creating a Personalized Diet Plan

1. **Access the Application**
   - Navigate to `http://localhost:3000`
   - App redirects to diet planning dashboard

2. **Start Conversation**
   - Click "New Diet Plan" or "Get Started"
   - Name your diet plan in the popup modal

3. **Chat with AI Assistant**
   - Provide your preferences naturally:
     - Diet goals (Weight Loss/Gain/Maintenance)
     - Favorite foods and cuisines
     - Physical information (age, height, weight)
     - Activity level and location
   - AI generates personalized recommendations

#### Ingredient Scanning

1. **Upload Image**
   - Click "Scan Ingredients" on dashboard
   - Upload food label photo or ingredient list

2. **AI Analysis**
   - System processes image using OCR
   - Extracts ingredient information
   - Provides nutritional insights

### For Developers

#### Local Development Workflow

```bash
# Terminal 1: Start backend
cd server && npm run dev

# Terminal 2: Start frontend
cd client && npm run dev

# Optional: Start MongoDB (if local)
mongod
```

#### Testing API Endpoints

```bash
# Test diet plan endpoint
curl -X POST http://localhost:2001/v1/ai/dietplan \
  -H "Content-Type: application/json" \
  -d '{"data": "I want to lose weight"}'

# Upload image for ingredient check
curl -X POST http://localhost:2001/v1/ai/ingredient/check \
  -F "image=@food_label.jpg"
```

## 📚 API Documentation

### Base URL
```
http://localhost:2001/v1/ai
```

### Endpoints

#### POST `/dietplan`
Generate personalized diet plans through AI conversation.

**Request Body:**
```json
{
  "data": "User's message or preference input"
}
```

**Response:**
```json
{
  "finalResponse": "AI-generated diet plan content",
  "originalData": "User's input message"
}
```

#### POST `/ingredient/check`
Analyze food images for ingredient extraction.

**Request:**
- Content-Type: multipart/form-data
- Body: image file (food label or ingredient photo)

**Response:**
```json
{
  "imgUrl": "https://cloudinary.com/uploaded_image_url",
  "analysis": {
    "ingredients":[...],
    "nutrients": {...}
  }
}
```

#### POST `/kestra/callback`
Webhook endpoint for Kestra workflow completions.

#### POST `/diet/kestra/callback`
Diet plan generation callback via webhooks.

### Socket.IO Events

#### Client → Server
- `diet-plan-message`: Send user message for diet planning

#### Server → Client
- `dietplan-result`: Receive AI-generated diet plan updates
- `diet-plan`: Real-time diet plan completion notifications

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (unique, required),
  firstName: String,
  lastName: String,
  emailId: String (unique, required),
  profileImg: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Diet Plan Session

```javascript
{
  userId: ObjectId,
  planName: String,
  goals: {
    type: String,
    preferences: [...],
    dietaryInfo: {...}
  },
  generatedPlan: String,
  createdAt: Date
}
```

### Photo Scan History

```javascript
{
  userId: ObjectId,
  imageUrl: String,
  extractedIngredients: [...],
  analysisResult: Object,
  createdAt: Date
}
```

## 🚀 Development

### Project Structure

```
NutriGuardAI/
├── client/                          # Frontend Application
│   ├── app/                         # Next.js App Router
│   │   ├── diet-plan/               # Diet planning pages
│   │   └── chat/                    # Interactive chat interface
│   ├── components/
│   │   ├── dietplan/                # Diet-specific components
│   │   └── ui/                      # Reusable UI components
│   └── lib/                         # Utilities
├── server/                          # Backend Application
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   ├── controllers/             # Route handlers
│   │   ├── db/                      # Database models
│   │   ├── models/                  # Mongoose schemas
│   │   ├── routes/                  # API route definitions
│   │   ├── services/                # Business logic services
│   │   │   └── feature/             # Feature-specific services
│   │   └── utils/                   # Utility functions
│   └── package.json
├── docker-compose.yml               # Multi-container setup
├── .gitignore                       # Git ignore patterns
└── README.md                        # This file
```

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React and Node.js rules
- **Prettier**: Consistent code formatting
- **Commit Standards**: Conventional commit messages

### Testing

```bash
# Run client tests
cd client && npm run test

# Run server tests (if implemented)
cd server && npm run test
```

### Building for Production

```bash
# Build client
cd client && npm run build

# Build server
cd server && npm run build
```

## 🤝 Contributing

We welcome contributions to NutriGuardAI! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/NutriGuardAI.git
   cd NutriGuardAI
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

3. **Make Changes**
   - Follow existing code style
   - Add/update tests if applicable
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-amazing-feature
   # Create Pull Request on GitHub
   ```

### Pull Request Guidelines

- Provide clear descriptions of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update README if needed
- Follow [Conventional Commits](https://conventionalcommits.org/)

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use descriptive variable/function names
- Add JSDoc comments for complex functions
- Maintain consistent file structure

## 📝 License

This project is proprietary and privately licensed. All rights reserved.

## 🙏 Acknowledgments

- **OpenAI**: For GPT-4 language model capabilities
- **LangChain**: For AI orchestration framework
- **MongoDB**: For flexible document database
- **Cloudinary**: For image processing and hosting
- **Next.js**: For exceptional React framework
- **Socket.IO**: For real-time communication
- **Kestra**: For workflow automation

## 📞 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for FAQs

---

**Built with ❤️ using cutting-edge AI technology for better nutrition**

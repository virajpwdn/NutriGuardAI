# NutriGuardAI

An AI-powered personalized diet planning application built with Next.js and modern web technologies. NutriGuardAI helps users create customized diet plans through an interactive chat interface with AI assistance.

## 🚀 Features

- **AI-Powered Diet Planning**: Interactive chatbot that collects user information to generate personalized diet plans
- **Real-time Communication**: Socket.IO integration for live chat experience
- **User-Friendly Interface**: Clean, responsive design with intuitive chat interface
- **Diet Plan Management**: Create, name, and manage multiple diet plans
- **Markdown Support**: Rich text formatting in AI responses
- **Ingredient Scanning**: Coming soon - OCR functionality to analyze food labels

### Key Capabilities

- Collects user preferences: weight goals, favorite foods, height, weight, exercise frequency, and location
- Generates location-specific food recommendations
- Supports various diet goals: Weight Loss, Weight Gain, Maintenance

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide React Icons
- **Icons**: Phosphor Icons

### Communication
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios
- **Markdown Processing**: React Markdown with GitHub Flavored Markdown (GFM)

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js
- **CSS Framework**: Tailwind CSS

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun package manager
- Backend server running on `http://localhost:2001` (API endpoints documented below)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/virajpwdn/NutriGuardAI.git
   cd NutriGuardAI/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

### Creating a Diet Plan

1. **Access the Main Dashboard**
   - App redirects automatically to `/diet-plan`
   - View dashboard with recent plans and action cards

2. **Start a New Diet Plan**
   - Click "New Diet Plan" in the sidebar
   - Or click "Get Started" on the "Build a Diet Plan" card

3. **Name Your Plan**
   - Enter a name for your diet plan in the popup modal
   - Click "Continue" to proceed to chat

4. **Chat with AI Assistant**
   - The AI collects essential information:
     - Primary goal (Weight Loss, Weight Gain, Maintenance)
     - Favorite foods
     - Height and current weight
     - Exercise frequency
     - Country/location
   - AI generates personalized recommendations based on your location

### Interface Overview

- **Sidebar**: Navigation, recent diet plans, user profile
- **Main Dashboard**: Feature cards for diet planning and ingredient scanning
- **Chat Interface**: Real-time conversation with AI assistant
- **Responsive Design**: Optimized for desktop and mobile devices

## 📁 Project Structure

```
NutriGuardAI/client/
├── app/                          # Next.js App Router
│   ├── diet-plan/
│   │   ├── chat/                 # Chat page with AI assistant
│   │   │   └── page.tsx
│   │   └── page.tsx             # Main dashboard
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (redirects to diet-plan)
├── components/
│   ├── dietplan/
│   │   ├── Chat.tsx             # Main chat component with Socket.IO
│   │   └── Popup.tsx            # Diet plan naming modal
│   └── ui/
│       └── button.tsx           # Reusable UI components
├── lib/
│   └── utils.ts                 # Utility functions and constants
└── public/                      # Static assets
    ├── favicon.ico
    └── *.svg                    # Icons and illustrations
```

## 🔌 API Integration

The application communicates with a backend API server running on `http://localhost:2001`:

### Main Endpoints

- **POST `/v1/ai/dietplan`** - Send user input to AI for diet planning
  ```typescript
  // Request
  {
    data: string; // User's message/input
  }

  // Response
  string; // AI response with diet recommendations
  ```

### Socket.IO Events

- **`diet-plan`** - Real-time diet plan updates
  ```typescript
  {
    content: string; // Markdown formatted diet plan content
  }
  ```

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Building for Production

```bash
npm run build
npm run start
```

### Code Quality

The project uses:
- **ESLint** for JavaScript/TypeScript linting
- **TypeScript** for type checking
- **Prettier** configured via ESLint for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style and naming conventions
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is private and proprietary. All rights reserved by the original author.

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org) - The React Framework
- UI components powered by [Radix UI](https://radix-ui.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)
- Font optimization with [Next.js Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This is the client-side application. Ensure you have the corresponding backend API server running to use all features.

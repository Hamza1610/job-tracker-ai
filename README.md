# 🚀 Mini Job Tracker Web App

A modern, production-ready job application tracking system built with **Next.js 14**, **TypeScript**, and **TailwindCSS**. Features smooth animations, AI-powered job analysis, and an intuitive user experience.

## ✨ Features

### 🔹 Core Functionality
- **Add Job Applications** with comprehensive form validation
- **Responsive Dashboard** with statistics and card-based layout
- **Edit & Delete** functionality with confirmation modals
- **Status Tracking** (Applied, Interviewing, Rejected, Offer)
- **Real-time Updates** with smooth animations

### 🔹 AI-Powered Analysis
- **Job Description Analyzer** using OpenAI GPT-4
- **Automatic Summarization** of job postings
- **Key Skills Extraction** for resume optimization
- **Copy-to-clipboard** functionality for easy use

### 🔹 Modern UI/UX
- **Framer Motion** animations and transitions
- **Dark/Light Mode** toggle
- **Fully Responsive** design
- **Accessible** components with proper ARIA labels
- **Clean Design** inspired by Notion and Linear

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Custom CSS Variables
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **AI Integration**: OpenAI API
- **Icons**: Lucide React
- **Theme**: next-themes

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── jobs/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── analyze/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── job-form.tsx
│   ├── job-card.tsx
│   ├── job-edit-modal.tsx
│   ├── delete-confirmation-modal.tsx
│   └── job-analyzer.tsx
├── lib/
│   ├── data/jobs.ts
│   ├── validations/job.ts
│   ├── openai.ts
│   └── utils.ts
├── types/
│   └── job.ts
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- OpenAI API Key (for AI features)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mini-job-tracker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 AI Features Usage

### Job Description Analyzer
1. Navigate to the **"AI Analyzer"** tab
2. Paste a complete job description in the textarea
3. Click **"Analyze Job Description"**
4. View the generated summary and key skills
5. Use the copy buttons to save results to clipboard

**Note**: The AI analyzer requires a valid OpenAI API key. Without it, the feature will show an error message.

## 📊 Data Storage

Currently uses **in-memory storage** for simplicity. In production, you would typically integrate with:
- PostgreSQL/MySQL database
- Prisma ORM
- Supabase
- MongoDB

## 🎨 Customization

### Theme Colors
Edit `app/globals.css` to customize the color scheme:
\`\`\`css
:root {
  --primary: your-color-here;
  --secondary: your-color-here;
  /* ... */
}
\`\`\`

### Animations
Modify `framer-motion` configurations in components for different animation styles.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 AI-Assisted Development

This project was built with AI assistance for:
- **Code Architecture**: Component structure and API design
- **TypeScript Definitions**: Type safety and interfaces
- **UI Components**: Responsive design and animations
- **Form Validation**: Zod schemas and error handling
- **API Integration**: OpenAI service integration

## 🔧 Development Notes

### Form Validation
- Uses **Zod** for runtime type checking
- Client-side and server-side validation
- Real-time error feedback

### State Management
- React hooks for local state
- No external state management needed for this scope
- Easy to extend with Redux/Zustand if needed

### Performance Optimizations
- **Framer Motion** lazy loading
- Optimized re-renders with proper dependency arrays
- Efficient API calls with proper error handling

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Fetch all jobs |
| POST | `/api/jobs` | Create new job |
| GET | `/api/jobs/[id]` | Get specific job |
| PUT | `/api/jobs/[id]` | Update job |
| DELETE | `/api/jobs/[id]` | Delete job |
| POST | `/api/analyze` | Analyze job description |

## 🐛 Troubleshooting

### Common Issues

**OpenAI API Errors**
- Ensure your API key is valid and has credits
- Check the `.env.local` file is properly configured
- Verify the API key has the correct permissions

**Build Errors**
- Run `npm run build` to check for TypeScript errors
- Ensure all dependencies are installed
- Check for any missing environment variables

**Styling Issues**
- Clear browser cache
- Ensure TailwindCSS is properly configured
- Check for conflicting CSS classes

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] User authentication and multi-user support
- [ ] Email notifications for application deadlines
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF/CSV)
- [ ] Calendar integration
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Framer Motion** for smooth animations
- **OpenAI** for AI-powered features
- **Vercel** for hosting and deployment
- **Next.js** team for the amazing framework

---

**Developed by Muhammad Hamza using Next.js 14, TypeScript, and modern web technologies.**

# Vite React TypeScript Shadcn/UI Project

A modern, full-featured React project setup with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 18** - Latest React features
- 🎯 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧩 **shadcn/ui** - Beautiful component library
- 🔀 **React Router** - Client-side routing
- 📊 **React Query** - Data fetching and caching
- 🎣 **React Hook Form** - Form state management
- 🎨 **Next Themes** - Dark mode support
- 📈 **Recharts** - Chart library
- ✨ **Sonner** - Toast notifications

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout component
│   ├── Header.tsx      # Header component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   └── Home.tsx        # Home page
├── hooks/              # Custom React hooks
│   ├── useUsers.ts     # Example hook
│   └── index.ts        # Hooks barrel export
├── lib/                # Utility libraries
│   ├── queryClient.ts  # React Query setup
│   ├── utils.ts        # Utility functions
│   └── api.ts          # API service
├── types/              # TypeScript types
│   └── index.ts        # Type definitions
├── utils/              # Utility functions
│   ├── helpers.ts      # Helper functions
│   └── index.ts        # Utilities barrel export
├── routes/             # Route configuration
│   └── index.tsx       # Route setup
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Configuration Files

- **vite.config.ts** - Vite configuration with path aliases
- **tailwind.config.ts** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration
- **eslint.config.js** - ESLint configuration
- **postcss.config.cjs** - PostCSS configuration

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required for contact form
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key

# Optional social links
VITE_GITHUB_URL=https://github.com/yourusername
VITE_LINKEDIN_URL=https://www.linkedin.com/in/yourusername
```

**Get your Web3Forms access key:** https://web3forms.com/

⚠️ **Important for S3 deployment:** Environment variables are baked into the build at compile time. See [S3_DEPLOYMENT_GUIDE.md](./S3_DEPLOYMENT_GUIDE.md) for details.

## Deployment

### Deploy to AWS S3

This project is configured for static hosting on AWS S3 with automated deployment options.

#### Quick Deploy (Manual)

```powershell
# Set environment variable
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key-here"

# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete
```

#### Automated Deployment

**Option 1: PowerShell Script**
```powershell
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key"
.\deploy-to-s3.ps1 -BucketName "your-bucket"
```

**Option 2: Bash Script**
```bash
VITE_WEB3FORMS_ACCESS_KEY="your-key" ./deploy-to-s3.sh your-bucket
```

**Option 3: GitHub Actions (Recommended)**
- Push to `main` branch auto-deploys
- Configure secrets in GitHub repository settings
- See `.github/workflows/deploy.yml`

**Option 4: AWS CodeBuild**
- Use `buildspec.yml` for AWS CodePipeline
- Configure environment variables in CodeBuild project

📚 **Full deployment guide:** [S3_DEPLOYMENT_GUIDE.md](./S3_DEPLOYMENT_GUIDE.md)  
⚡ **Quick reference:** [S3_QUICK_START.txt](./S3_QUICK_START.txt)

## Available Components

- **Button** - Customizable button component with variants

More components can be added to `src/components/ui/`

## Available Hooks

- **useUsers** - Example hook using React Query

More hooks can be added to `src/hooks/`

## Styling

The project uses Tailwind CSS with a custom color system. Colors are defined in `tailwind.config.ts` and can be customized in `src/index.css`.

### Dark Mode

The app includes dark mode support via `next-themes`. Toggle dark mode by updating the `theme` in your app context or using the theme provider.

## API Integration

The `src/lib/api.ts` file provides a wrapper around fetch with common methods:

```typescript
import { api } from '@/lib/api'

// GET request
const data = await api.get('/users')

// POST request
const response = await api.post('/users', { name: 'John' })

// PUT request
const updated = await api.put('/users/1', { name: 'Jane' })

// DELETE request
await api.delete('/users/1')
```

## Contributing

Feel free to add more components, hooks, and utilities as needed.

## License

MIT


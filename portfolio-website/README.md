# Siddharth Kothiyal - Design Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Optimized for all devices
- **Smooth Animations**: Framer Motion for engaging interactions
- **Clean Architecture**: Component-based structure
- **SEO Optimized**: Built-in Next.js SEO features
- **Performance**: Optimized for fast loading

## 📱 Pages

### Landing Page
- Non-scrollable design
- Hero section with introduction
- Device mockup illustration
- Clean, minimal aesthetic

### Thesis
- Single-page document layout
- Support for images, videos, and GIFs
- Research process documentation
- Key findings and conclusions

### Work
- Project portfolio grid
- Individual project detail pages
- Case study format with:
  - Challenge & Solution
  - Process documentation
  - Results & outcomes

### Play
- Gallery of creative experiments
- Filterable by category
- Support for images, videos, and GIFs
- Grid layout with hover effects

### About
- Personal introduction
- Profile photo
- Skills and education
- Contact information
- Interests and background

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── play/              # Play/Gallery page
│   ├── thesis/            # Thesis page
│   ├── work/              # Work portfolio
│   │   └── [projectId]/   # Individual project pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── navigation.tsx    # Main navigation
│   └── footer.tsx        # Footer component
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## 🎨 Design System

- **Colors**: Gray scale with accent colors
- **Typography**: Inter font family
- **Spacing**: Tailwind's spacing scale
- **Components**: Consistent design patterns
- **Animations**: Subtle, purposeful motion

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any platform supporting Node.js

## 📝 Content Management

The project is structured to easily integrate with:
- Sanity CMS (recommended)
- Contentful
- Strapi
- Any headless CMS

## 🔧 Customization

### Adding New Projects
1. Add project data to the projects array in `/work/page.tsx`
2. Create corresponding project detail pages in `/work/[projectId]/`

### Modifying Styles
- Update Tailwind classes in components
- Modify `tailwind.config.js` for theme customization
- Add custom CSS in `globals.css` if needed

### Adding New Pages
1. Create new directory in `/app/`
2. Add `page.tsx` file
3. Update navigation in `components/navigation.tsx`

## 📄 License

This project is for portfolio purposes. Please respect the design and code.

## 📞 Contact

**Siddharth Kothiyal**
- Email: siddharth@example.com
- Location: Oslo, Norway
- Portfolio: [Your Portfolio URL]

---

Built with ❤️ in Oslo
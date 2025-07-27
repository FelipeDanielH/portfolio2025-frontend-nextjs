import { Footer } from "./footer";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";
}

export function PageLayout({ children, className = "", maxWidth = "4xl" }: PageLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    full: "max-w-full"
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-950/50 dark:to-black pt-24 ${className}`}>
      <main className={`flex-1 ${maxWidthClasses[maxWidth]} mx-auto px-6 py-12 w-full`}>
        {children}
      </main>
      <Footer />
    </div>
  );
} 
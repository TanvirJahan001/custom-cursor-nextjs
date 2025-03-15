import './globals.css';

export const metadata = {
  title: 'Modern Animated Website',
  description: 'A modern animated website built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none bg-black">
        {children}
      </body>
    </html>
  );
}

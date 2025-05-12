import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People Search',
  description: 'Search and view random user details',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
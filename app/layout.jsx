import '../style.css'

import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function AppLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <body>{children}</body>
        </html>
    );
  }
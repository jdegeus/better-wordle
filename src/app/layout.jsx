'use client';

// import Navbar from './navbar';
// import Footer from './footer';

import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ["300", "400", "500", "700"]
});

 
export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <main className={ubuntu.className}>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
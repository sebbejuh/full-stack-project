import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Locksenius Portfolio',
  description: 'A fullstack portfolio created by Sebastian Locksenius',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <AuthProvider>
          <Theme accentColor='indigo' appearance='dark'>
            <header>
              <NavBar />
            </header>
            <main className='p-5 pt-20'>
              {children}
            </main>
            <Toaster
              position='top-center'
              reverseOrder={false}
            />
          </Theme>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Theme, Container } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import { Toaster } from 'react-hot-toast';
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
  title: 'Under Construction',
  description: 'Portfolio under contruction',
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
            <NavBar />
            <main className='p-5'>
              <Container>{children}</Container>
            </main>
            <Toaster
              position='top-center'
              reverseOrder={false}
            />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { SignoutButton } from './auth/SignoutButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Automahiʻai',
  description: 'Automahiʻai',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white`}>
        <header className="bg-green-600 shadow-md border-b border-green-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">Automahiʻai</h1>
              </div>

              <div className="flex items-center gap-4">
                {session ? (
                  <span className="text-white flex items-center gap-3">
                    <span>Welcome {session.user.name}</span>
                    <SignoutButton />
                  </span>
                ) : (
                  <>
                    <span className="text-white">Not authenticated</span>
                    <a
                      href="/login"
                      className="ml-4 px-4 py-2 rounded bg-white text-green-700 font-semibold hover:bg-green-100 transition-colors"
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

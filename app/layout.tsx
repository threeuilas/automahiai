import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { SignoutButton } from '../components/auth/elements/SignoutButton';
import { LoginButton } from '@/components/auth/elements/LoginButton';

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
                <Link
                  href="/"
                  className="text-2xl font-bold text-white hover:text-green-200 transition-colors"
                >
                  Automahiʻai
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <a className="text-white" href="/farm">
                  Farm
                </a>
                {session ? (
                  <span className="text-white flex items-center gap-3">
                    <span>Welcome {session.user.name}</span>
                    <SignoutButton variant="secondary" text="Sign Out" />
                  </span>
                ) : (
                  <>
                    <span className="text-white">Not authenticated</span>
                    <LoginButton variant="secondary" text="Login" />
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

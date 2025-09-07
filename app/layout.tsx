import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { LoginButton } from '@/components/auth/elements/LoginButton';
import { NavigationDropdown } from '@/components/ui/navigation-dropdown';

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

              <div className="flex items-center gap-6">
                {session ? (
                  <NavigationDropdown userName={session.user.name || 'User'} />
                ) : (
                  <>
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

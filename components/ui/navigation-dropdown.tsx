'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { SignoutButton } from '@/components/auth/elements/SignoutButton';

interface NavigationDropdownProps {
  userName: string;
}

export function NavigationDropdown({ userName }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-green-200 transition-colors px-3 py-2 rounded-md hover:bg-green-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Welcome {userName}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <Link
                href="/farms"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                My Farms
              </Link>
              <Link
                href="/crops"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                My Crops
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <div className="px-4 py-2">
                <SignoutButton
                  variant="secondary"
                  text="Sign Out"
                  className="w-full justify-start text-sm"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

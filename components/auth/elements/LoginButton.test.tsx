import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname, useSearchParams } from 'next/navigation';

import { LoginButton } from './LoginButton';
import { REDIRECT_PARAM } from '../constants';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUsePathname = jest.mocked(usePathname);
const mockUseSearchParams = jest.mocked(useSearchParams);

describe('LoginButton', () => {
  const setupUseSearchParams = (target: string | null) => {
    mockUseSearchParams.mockReturnValue({
      get: jest.fn((key) => {
        if (key === REDIRECT_PARAM) {
          return target;
        }
        throw new Error('Unexpected key');
      }),
    } as unknown as ReturnType<typeof useSearchParams>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupUseSearchParams('/target-path');
  });

  it('renders Link with correct href from /signup', () => {
    mockUsePathname.mockReturnValue('/signup');
    render(<LoginButton text="Login" />);
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toHaveAttribute(
      'href',
      `/login?${REDIRECT_PARAM}=%2Ftarget-path`,
    );
  });

  it('renders Link with redirect to / from /signup when there is no param', () => {
    mockUsePathname.mockReturnValue('/signup');
    setupUseSearchParams(null);
    render(<LoginButton text="Login" />);
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toHaveAttribute('href', `/login?${REDIRECT_PARAM}=%2F`);
  });

  it('renders Link with current path if not /signup or /login', () => {
    mockUsePathname.mockReturnValue('/farms');
    render(<LoginButton text="Login" />);
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toHaveAttribute('href', `/login?${REDIRECT_PARAM}=%2Ffarms`);
  });

  it('renders Link with redirect to / from /login', () => {
    mockUsePathname.mockReturnValue('/login');
    setupUseSearchParams(null);
    render(<LoginButton text="Login" />);
    const link = screen.getByRole('link', { name: 'Login' });
    expect(link).toHaveAttribute('href', `/login?${REDIRECT_PARAM}=%2F`);
  });

  it('renders with custom text', () => {
    mockUsePathname.mockReturnValue('/farms');
    render(<LoginButton text="Sign In" />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});

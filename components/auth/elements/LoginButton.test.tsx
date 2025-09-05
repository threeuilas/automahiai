import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { LoginButton } from './LoginButton';
import '@testing-library/jest-dom';
import { REDIRECT_PARAM } from '../constants';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUseRouter = jest.mocked(useRouter);
const mockUsePathname = jest.mocked(usePathname);
const mockUseSearchParams = jest.mocked(useSearchParams);

describe('LoginButton', () => {
  const mockRouter = {
    push: jest.fn(),
  };
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
    mockUseRouter.mockReturnValue(
      mockRouter as unknown as ReturnType<typeof useRouter>,
    );
  });

  it('redirects to /login with correct param from /signup', () => {
    mockUsePathname.mockReturnValue('/signup');
    render(<LoginButton text="Login" />);
    fireEvent.click(screen.getByText('Login'));
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/login?${REDIRECT_PARAM}=%2Ftarget-path`,
    );
  });

  it('redirects to /login with redirect to / from /signup when there is no param', () => {
    mockUsePathname.mockReturnValue('/signup');
    setupUseSearchParams(null);
    render(<LoginButton text="Login" />);
    fireEvent.click(screen.getByText('Login'));
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/login?${REDIRECT_PARAM}=%2F`,
    );
  });

  it('redirects to /login with current path if not /signup or /login', () => {
    mockUsePathname.mockReturnValue('/farm');
    render(<LoginButton text="Login" />);
    fireEvent.click(screen.getByText('Login'));
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/login?${REDIRECT_PARAM}=%2Ffarm`,
    );
  });

  it('does nothing if already at /login', () => {
    mockUsePathname.mockReturnValue('/login');
    render(<LoginButton text="Login" />);
    fireEvent.click(screen.getByText('Login'));
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('renders with custom text', () => {
    mockUsePathname.mockReturnValue('/farm');
    render(<LoginButton text="Sign In" />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

import { useSignout } from '../hooks/useSignout';
import { SignoutButton } from './SignoutButton';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../hooks/useSignout', () => ({
  useSignout: jest.fn(),
}));

const mockUsePathname = jest.mocked(usePathname);
const mockUseSignout = jest.mocked(useSignout);

describe('SignoutButton', () => {
  const signout = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/farms');
    mockUseSignout.mockReturnValue({ signout, loading: false });
  });

  it('calls signout when clicked', () => {
    render(<SignoutButton text="Sign Out" />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(signout).toHaveBeenCalled();
  });

  it('disables button and shows loadingText when loading', () => {
    mockUseSignout.mockReturnValue({ signout, loading: true });
    render(<SignoutButton text="Sign Out" loadingText="Signing out..." />);
    const button = screen.getByText('Signing out...');
    expect(button).toBeDisabled();
  });

  it('shows text when not loading', () => {
    render(<SignoutButton text="Sign Out" loadingText="Signing out..." />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('uses text as loadingText if loadingText is not provided', () => {
    mockUseSignout.mockReturnValue({ signout, loading: true });
    render(<SignoutButton text="Sign Out" />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('uses the correct redirect when signing out', () => {
    render(<SignoutButton text="Sign Out" />);
    expect(mockUseSignout).toHaveBeenCalledWith('/farms');
  });
});

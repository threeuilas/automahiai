import { render, screen } from '@testing-library/react';
import { AuthPage } from '@/components/auth/elements/AuthPage';
import '@testing-library/jest-dom';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';

jest.mock('@/lib/auth/server', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));
const mockGetSession = jest.mocked(auth.api.getSession);

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));
const mockHeaders = jest.mocked(headers, { shallow: true });

jest.mock('@/components/auth/elements/LoginForm', () => ({
  LoginForm: ({ redirect }: { redirect: string }) => (
    <div>LoginForm {redirect}</div>
  ),
}));

jest.mock('@/components/auth/elements/SignupForm', () => ({
  SignupForm: ({ redirect }: { redirect: string }) => (
    <div>SignupForm {redirect}</div>
  ),
}));

jest.mock('@/components/auth/elements/SignoutButton', () => ({
  SignoutButton: ({ text }: { text: string }) => <button>{text}</button>,
}));

describe('AuthPage', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('renders LoginForm when not logged in and type is login', async () => {
    mockGetSession.mockResolvedValueOnce(null);
    mockHeaders.mockResolvedValueOnce({} as ReturnType<typeof headers>);

    render(await AuthPage({ type: 'login', redirect: '/dashboard' }));
    expect(await screen.findByText('LoginForm /dashboard')).toBeInTheDocument();
  });

  it('renders SignupForm when not logged in and type is signup', async () => {
    mockGetSession.mockResolvedValueOnce(null);
    mockHeaders.mockResolvedValueOnce({} as ReturnType<typeof headers>);

    render(await AuthPage({ type: 'signup', redirect: '/dashboard' }));
    expect(
      await screen.findByText('SignupForm /dashboard'),
    ).toBeInTheDocument();
  });

  it('shows logged in message and sign out button when session exists', async () => {
    mockGetSession.mockResolvedValueOnce({
      user: { id: 1 },
    } as unknown as ReturnType<typeof auth.api.getSession>);
    mockHeaders.mockResolvedValueOnce({} as ReturnType<typeof headers>);

    render(await AuthPage({ type: 'login', redirect: '/dashboard' }));
    expect(
      await screen.findByText('You are already logged in.'),
    ).toBeInTheDocument();
    expect(await screen.findByText('Sign Out')).toBeInTheDocument();
  });
});

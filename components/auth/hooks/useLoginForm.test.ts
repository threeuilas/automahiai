import { act, renderHook } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';
import { signIn } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/auth/client', () => ({
  signIn: {
    email: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockSignIn = jest.mocked(signIn.email);
const mockUseRouter = jest.mocked(useRouter);

describe('useLoginForm', () => {
  const push = jest.fn();
  const refresh = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push, refresh } as unknown as ReturnType<
      typeof useRouter
    >);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLoginForm('/dashboard'));
    expect(result.current.form.getValues()).toEqual({
      email: '',
      password: '',
      remember: false,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should set error if signIn returns error', async () => {
    mockSignIn.mockResolvedValueOnce({
      error: { message: 'Invalid credentials' },
    });
    const { result } = renderHook(() => useLoginForm('/dashboard'));
    act(() => {
      result.current.form.setValue('email', 'test@example.com');
      result.current.form.setValue('password', 'wrongpass');
    });
    await act(async () => {
      await result.current.login();
    });
    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.loading).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });

  it('should redirect and refresh on successful login', async () => {
    mockSignIn.mockResolvedValueOnce({ data: { user: { id: 1 } } });
    const { result } = renderHook(() => useLoginForm('/dashboard'));
    act(() => {
      result.current.form.setValue('email', 'test@example.com');
      result.current.form.setValue('password', 'correctpass');
    });
    await act(async () => {
      await result.current.login();
    });
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(push).toHaveBeenCalledWith('/dashboard');
    expect(refresh).toHaveBeenCalled();
  });
});

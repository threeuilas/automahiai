import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { signUp } from '@/lib/auth/client';

import { useSignupForm } from './useSignupForm';

jest.mock('@/lib/auth/client', () => ({
  signUp: {
    email: jest.fn(),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockSignUp = jest.mocked(signUp.email);
const mockUseRouter = jest.mocked(useRouter);

describe('useSignupForm', () => {
  const push = jest.fn();
  const refresh = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push,
      refresh,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSignupForm('/dashboard'));
    expect(result.current.form.getValues()).toEqual({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should set error if signUp returns error', async () => {
    mockSignUp.mockResolvedValueOnce({ error: { message: 'Signup failed' } });
    const { result } = renderHook(() => useSignupForm('/dashboard'));
    act(() => {
      result.current.form.setValue('name', 'Test User');
      result.current.form.setValue('email', 'test@example.com');
      result.current.form.setValue('password', 'password');
      result.current.form.setValue('confirmPassword', 'password');
      result.current.form.setValue('agreeToTerms', true);
    });
    await act(async () => {
      await result.current.signup();
    });
    expect(mockSignUp).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.current.error).toBe('Signup failed');
    expect(result.current.loading).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });

  it('should not call signUp if form contents are invalid', async () => {
    const { result } = renderHook(() => useSignupForm('/dashboard'));
    act(() => {
      result.current.form.setValue('name', ''); // Name is required
      result.current.form.setValue('email', 'invalid-email'); // Invalid email
      result.current.form.setValue('password', 'pass');
      result.current.form.setValue('confirmPassword', 'different'); // Does not match
      result.current.form.setValue('agreeToTerms', false); // Must be true
    });
    await act(async () => {
      await result.current.signup();
    });
    expect(mockSignUp).not.toHaveBeenCalled();
    expect(result.current.form.getFieldState('name').error).toBeDefined();
    expect(result.current.form.getFieldState('email').error).toBeDefined();
    expect(result.current.form.getFieldState('password').error).toBeDefined();
    expect(
      result.current.form.getFieldState('confirmPassword').error,
    ).toBeDefined();
    expect(
      result.current.form.getFieldState('confirmPassword').error,
    ).toBeDefined();
    expect(
      result.current.form.getFieldState('agreeToTerms').error,
    ).toBeDefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it('should redirect and refresh on successful signup', async () => {
    mockSignUp.mockResolvedValueOnce({ data: { user: { id: 1 } } });
    const { result } = renderHook(() => useSignupForm('/dashboard'));
    act(() => {
      result.current.form.setValue('name', 'Test User');
      result.current.form.setValue('email', 'test@example.com');
      result.current.form.setValue('password', 'password');
      result.current.form.setValue('confirmPassword', 'password');
      result.current.form.setValue('agreeToTerms', true);
    });
    await act(async () => {
      await result.current.signup();
    });
    expect(mockSignUp).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(push).toHaveBeenCalledWith('/dashboard');
    expect(refresh).toHaveBeenCalled();
  });
});

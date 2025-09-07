import { act, renderHook } from '@testing-library/react';
import { useSignout } from './useSignout';
import { signOut } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';
import { SuccessContext } from 'better-auth/react';

jest.mock('@/lib/auth/client', () => ({
  signOut: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockSignOut = jest.mocked(signOut);
const mockUseRouter = jest.mocked(useRouter);

describe('useSignout', () => {
  const push = jest.fn();
  const refresh = jest.fn();
  const prefetch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push,
      refresh,
      prefetch,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it('should initialize with loading false', () => {
    const { result } = renderHook(() => useSignout('/dashboard'));
    expect(result.current.loading).toBe(false);
  });

  it('should call signOut and redirect on success', async () => {
    mockSignOut.mockImplementation(async (data) => {
      data?.fetchOptions?.onSuccess?.({} as unknown as SuccessContext);
    });
    const { result } = renderHook(() => useSignout('/dashboard'));
    await act(async () => {
      await result.current.signout();
    });
    expect(mockSignOut).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/dashboard');
    expect(refresh).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });
});

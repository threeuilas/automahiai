import { createAuthClient } from 'better-auth/react';

const { signIn, signUp, useSession, signOut } = createAuthClient();
export { signIn, signUp, useSession, signOut };

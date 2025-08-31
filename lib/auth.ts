import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { createAuthClient } from 'better-auth/client';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()] // make sure nextCookies is the last plugin in the array
});

export const { signIn, signUp, useSession } = createAuthClient();

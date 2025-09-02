import {createAuthClient} from 'better-auth/react';

const {signIn, signUp, useSession} = createAuthClient();
export {signIn, signUp, useSession};

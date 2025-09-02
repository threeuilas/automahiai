import {createAuthClient} from "better-auth/react"

const {signIn, signOut, useSession} = createAuthClient();
export {signIn, signOut, useSession};

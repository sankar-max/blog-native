import { createAuthClient } from 'better-auth/react';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://tan-stack-ten.vercel.app', // Base URL of your Better Auth backend.
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => SecureStore.getItem("bearer_token") || ""
    }
  },
  plugins: [
    expoClient({
      scheme: 'blog-mobile', // must match app.json exactly
      storagePrefix: 'blogmobile', // good (no hyphen, unique prefix)
      storage: SecureStore,
    }),
  ],
});

export const { signOut, useSession } = authClient;

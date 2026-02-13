// app/login.tsx (or wherever your SignIn component lives)
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'expo-router';
import LoginScreen from '@/components/auth/login/screen';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginSchema } from '@/components/auth/validation';
import api from '@/lib/axios-instance';
import * as SecureStore from 'expo-secure-store';

type FormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleLogin = async (data: FormData) => {
    console.log('Login attempt with:', data);

    try {
      const response = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get('set-auth-token');
            // Store the token securely
            if (authToken) {
              SecureStore.setItemAsync('bearer_token', authToken);
              console.log('Bearer token stored');
            }
          },
        }
      );

      console.log('Better Auth response:', response);

      if (response.error) {
        Alert.alert('Login Failed', response.error.message || 'Invalid credentials');
        return;
      }

      Alert.alert('Success', 'Welcome back!');
      router.replace('/(tabs)/home');
    } catch (err: any) {
      console.error('Full login error:', err);
      Alert.alert('Error', err.message || 'An unexpected error occurred');
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user && !sessionLoading) {
      router.replace('/(tabs)/home');
    }
  }, [session, sessionLoading, router]);

  // Optional: GitHub login (if enabled in backend)
  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/(tabs)/home',
      });
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'GitHub login failed');
    }
  };

  return (
    <LoginScreen
      control={control}
      errors={errors}
      loading={isSubmitting || sessionLoading}
      onLogin={handleSubmit(handleLogin)}
      onGoogleLogin={handleGithubLogin} // rename to onGithubLogin if you want
    />
  );
}

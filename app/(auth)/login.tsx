import { useEffect } from 'react';
import { Alert } from 'react-native';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'expo-router';
import LoginScreen from '@/components/auth/login/screen';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginSchema } from '@/components/auth/validation';

type FormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: FormData) => {
    console.log('data', data);
    const { email, password } = data;
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.replace('/(tabs)/home');
          },
          onError: (ctx) => {
            Alert.alert('Login Failed', ctx.error.message || 'Something went wrong');
          },
        }
      );
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.replace('/(tabs)/home');
    }
  }, [session, router]);

  const handleGithubLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Social login failed');
    }
  };

  return (
    <LoginScreen
      control={control}
      errors={errors}
      loading={isSubmitting}
      onLogin={handleSubmit(handleLogin)}
      onGoogleLogin={handleGithubLogin}
    />
  );
}

import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { authClient, useSession } from '@/lib/auth-client';
import { Link, useRouter } from 'expo-router';
import { Github } from 'lucide-react-native';

export default function SignIn() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const res = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.replace('/(tabs)/home');
          },
          onError: (ctx) => {
            alert(ctx.error.message || 'Login failed');
          },
        }
      );
      console.log('👍🏻11', res);
      // better-auth client handles token storage automatically
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (session?.user) {
      router.replace('/(tabs)/home');
    }
  }, [session, router]);

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  console.log('👍🏻', session);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-8 py-12">
          <View className="mb-10">
            <Text className="mb-2 text-4xl font-bold text-gray-900">Welcome Back</Text>
            <Text className="text-lg text-gray-500">Sign in to continue your journey</Text>
          </View>

          <View className="space-y-6">
            <View>
              <Text className="mb-2 ml-1 text-sm font-medium text-gray-700">Email Address</Text>
              <TextInput
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-gray-900 focus:border-blue-500"
              />
            </View>

            <View>
              <Text className="mt-4 mb-2 ml-1 text-sm font-medium text-gray-700">Password</Text>
              <TextInput
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-base text-gray-900 focus:border-blue-500"
              />
            </View>

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              className={`mt-8 flex-row items-center justify-center rounded-2xl py-4 ${
                loading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'
              } shadow-lg shadow-blue-500/30`}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-bold text-white">Sign In</Text>
              )}
            </Pressable>
            {/* github social login */}
            <Pressable
              onPress={handleGithubLogin}
              disabled={loading}
              className={`mt-8 flex-row items-center justify-center rounded-2xl py-4 ${
                loading ? 'bg-gray-400' : 'bg-gray-600 active:bg-gray-700'
              } shadow-lg shadow-gray-500/30`}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <View className="flex-row items-center gap-2 text-lg font-bold text-white!">
                  <Github size={24} color="white" />
                  <Text className="text-white">Sign In with Github</Text>
                </View>
              )}
            </Pressable>

            <View className="mt-8 flex-row justify-center">
              <Text className="text-gray-500">Don&apos;t have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text className="font-bold text-blue-600">Sign Up</Text>
                </Pressable>
              </Link>
            </View>
            {/* github */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

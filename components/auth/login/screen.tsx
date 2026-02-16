import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Github } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useColorScheme } from 'nativewind';

interface LoginScreenProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  loading: boolean;
  onLogin: () => void;
  onGoogleLogin: () => void;
}

function LoginScreen({ control, errors, loading, onLogin, onGoogleLogin }: LoginScreenProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="bg-background flex-1 justify-center">
      <View className="flex-1 justify-center px-8 py-12">
        {/* Header */}
        <View className="mb-12">
          <Text className="text-foreground text-center text-3xl font-bold">Sign in to Blog</Text>
        </View>

        {/* Social Login */}
        <Pressable
          onPress={onGoogleLogin}
          disabled={loading}
          className="border-border hover:bg-muted mb-8 flex-row items-center justify-center rounded-full border py-4 active:opacity-90">
          <Github size={20} color={isDark ? '#F3F4F6' : '#0D0C22'} />
          <Text className="text-foreground ml-3 text-base font-semibold">Sign in with Github</Text>
        </Pressable>

        {/* Divider */}
        <View className="mb-8 flex-row items-center">
          <View className="bg-border h-px flex-1" />
          <Text className="text-muted-foreground mx-4 text-sm">or sign in with email</Text>
          <View className="bg-border h-px flex-1" />
        </View>

        {/* Form */}
        <View className="space-y-6">
          <View>
            <Text className="text-foreground mb-2 text-base font-bold">Username or Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="name@example.com"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#6E6D7A'}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className={`bg-card text-foreground rounded-xl border ${
                    errors.email ? 'border-destructive' : 'border-border'
                  } focus:border-primary px-4 py-4 text-base`}
                />
              )}
            />
            {errors.email && (
              <Text className="text-destructive mt-1 ml-1 text-xs">
                {errors.email.message as string}
              </Text>
            )}
          </View>

          <View>
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-foreground text-base font-bold">Password</Text>
              <Link href="/(auth)/forgot-password" asChild>
                <Pressable>
                  <Text className="text-muted-foreground text-sm underline">Forgot password?</Text>
                </Pressable>
              </Link>
            </View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#6E6D7A'}
                  className={`bg-card text-foreground rounded-xl border ${
                    errors.password ? 'border-destructive' : 'border-border'
                  } focus:border-primary px-4 py-4 text-base`}
                />
              )}
            />
            {errors.password && (
              <Text className="text-destructive mt-1 ml-1 text-xs">
                {errors.password.message as string}
              </Text>
            )}
          </View>

          <Pressable
            key={loading ? 'active' : 'not'}
            onPress={onLogin}
            disabled={loading}
            className={`mt-10 items-center justify-center rounded-full py-4 ${
              loading ? 'bg-primary/80' : 'bg-primary active:opacity-90'
            }`}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-primary-foreground text-lg font-bold">Sign In</Text>
            )}
          </Pressable>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center pt-8">
          <Text className="text-muted-foreground">Don&apos;t have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text className="text-foreground font-semibold underline">Sign up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

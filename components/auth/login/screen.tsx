import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Github } from 'lucide-react-native';
import { Link } from 'expo-router';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface LoginScreenProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  loading: boolean;
  onLogin: () => void;
  onGoogleLogin: () => void;
}

function LoginScreen({
  control,
  errors,
  loading,
  onLogin,
  onGoogleLogin,
}: LoginScreenProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="flex-1 justify-center px-8 py-12">
            {/* Header */}
            <View className="mb-12">
              <Text className="text-3xl font-bold text-center text-[#0D0C22]">Sign in to Dribbble</Text>
            </View>

            {/* Social Login */}
            <Pressable
              onPress={onGoogleLogin}
              disabled={loading}
              className="mb-8 flex-row items-center justify-center rounded-full border border-[#E7E7E9] py-4 active:bg-gray-50">
              <Github size={20} color="#0D0C22" />
              <Text className="ml-3 text-base font-semibold text-[#0D0C22]">
                Sign in with Github
              </Text>
            </Pressable>

            {/* Divider */}
            <View className="mb-8 flex-row items-center">
              <View className="h-px flex-1 bg-[#E7E7E9]" />
              <Text className="mx-4 text-sm text-[#6E6D7A]">or sign in with email</Text>
              <View className="h-px flex-1 bg-[#E7E7E9]" />
            </View>

            {/* Form */}
            <View className="space-y-6">
              <View>
                <Text className="mb-2 text-base font-bold text-[#0D0C22]">Username or Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      className={`rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-[#E7E7E9]'
                      } bg-white px-4 py-4 text-base text-[#0D0C22] focus:border-[#EA4C89]`}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="mt-1 ml-1 text-xs text-red-500">
                    {errors.email.message as string}
                  </Text>
                )}
              </View>

              <View>
                <View className="mb-2 flex-row justify-between items-center">
                  <Text className="text-base font-bold text-[#0D0C22]">Password</Text>
                  <Link href="/(auth)/forgot-password" asChild>
                    <Pressable>
                      <Text className="text-sm text-[#6E6D7A] underline">Forgot?</Text>
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
                      className={`rounded-xl border ${
                        errors.password ? 'border-red-500' : 'border-[#E7E7E9]'
                      } bg-white px-4 py-4 text-base text-[#0D0C22] focus:border-[#EA4C89]`}
                    />
                  )}
                />
                {errors.password && (
                  <Text className="mt-1 ml-1 text-xs text-red-500">
                    {errors.password.message as string}
                  </Text>
                )}
              </View>

              <Pressable
                onPress={onLogin}
                disabled={loading}
                className={`mt-10 items-center justify-center rounded-full py-4 ${
                  loading ? 'bg-[#0D0C22]/80' : 'bg-[#0D0C22] active:bg-[#0D0C22]/90'
                }`}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-lg font-bold text-white">Sign In</Text>
                )}
              </Pressable>
            </View>

            {/* Footer */}
            <View className="pt-8 flex-row justify-center">
              <Text className="text-[#6E6D7A]">Don&apos;t have an account? </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text className="font-semibold text-[#0D0C22] underline">Sign up</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

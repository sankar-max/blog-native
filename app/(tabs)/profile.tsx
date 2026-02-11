import { View, Text, Pressable, Image } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { signOut, useSession } from '@/lib/auth-client';
export default function ProfileScreen() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);
  const logout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/(auth)/login');
        },
      },
    });
  };

  const url = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;
  return (
    <View className="flex-1 items-center justify-center">
      {/* remote image */}
      <View className='flex-row items-center gap-2'> 
        <Image
          source={{ uri: url! }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
        <Text className="mt-2 text-lg ">{name}</Text>
        <Text className="mt-2 text-lg ">{email}</Text>
      </View>

      <Text className="text-2xl font-bold">Welcome to Profile</Text>
      <Text className="mt-4">You&apos;re logged in!</Text>
      <Pressable className="mt-2 rounded-full bg-amber-500 p-2" onPress={logout}>
        <Text className="font-bold text-white">Logout</Text>
      </Pressable>
    </View>
  );
}

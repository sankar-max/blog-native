import { View, Text, Pressable, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut, useSession } from '@/lib/auth-client';
import { useColorScheme } from 'nativewind';

export default function ProfileScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const { colorScheme, toggleColorScheme } = useColorScheme();

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
    <View className="flex-1 items-center justify-center p-4">
      {/* User Card */}
      <View className="border-border bg-card w-full max-w-sm items-center rounded-3xl border p-8 shadow-sm">
        <View className="ring-muted mb-6 h-24 w-24 overflow-hidden rounded-full ring-4">
          {url ? (
            <Image source={{ uri: url }} className="h-full w-full" resizeMode="cover" />
          ) : (
            <View className="bg-muted h-full w-full items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
          )}
        </View>

        <Text className="text-card-foreground mb-1 text-2xl font-bold">{name}</Text>
        <Text className="text-muted-foreground mb-6 text-sm">{email}</Text>

        {/* Theme Toggle */}
        <View className="bg-secondary/50 mb-6 w-full flex-row items-center justify-between rounded-2xl p-4">
          <Text className="text-foreground font-medium">Dark Mode</Text>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleColorScheme}
            trackColor={{ false: '#767577', true: '#D97706' }}
          />
        </View>

        <Pressable
          className="bg-primary w-full rounded-2xl py-4 active:opacity-90"
          onPress={logout}>
          <Text className="text-primary-foreground text-center font-bold">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

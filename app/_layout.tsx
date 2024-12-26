import { Stack } from "expo-router";  // Import Stack for stack navigation

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      {/* Define the routes */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="admin" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
    </Stack>
  );
}


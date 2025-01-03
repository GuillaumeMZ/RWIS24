import { Stack } from "expo-router";
import { DataProvider } from "./DataContext"; // Import the DataProvider

export default function RootLayout() {
  return (
    <DataProvider> {/* Wrap the entire navigation structure */}
      <Stack screenOptions={{ headerShown: true }}>
        {/* Define the routes */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="user" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
}


import { Tabs } from "expo-router";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerStyle: { 
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
        headerTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tabs.Screen name="admin0" options={{ headerShown: false }} />
      <Tabs.Screen name="admin1" options={{ headerShown: false }} />
      <Tabs.Screen name="admin2" options={{ headerShown: false }} />
    </Tabs>
  );
}


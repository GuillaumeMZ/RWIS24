import { Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: route.name === "user0" ? { display: "none" } : null, // Hide Tab Bar on user0
        headerShown: false, // Hide headers on all screens
      })}
    >
      <Tabs.Screen name="user0" />
      <Tabs.Screen name="user1" options={{ title: "User 1" }} />
      <Tabs.Screen name="user2" options={{ title: "User 2" }} />
    </Tabs>
  );
}

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#ff7043" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#f5f5f5",
        headerStyle: { backgroundColor: "#ff7043" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Index") {
            iconName = "home-outline";
          } else if (route.name === "Admin") {
            iconName = "briefcase-outline";
          } else if (route.name === "User") {
            iconName = "people-outline";
          } else if (route.name === "DevTools") {
            iconName = "construct-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="Index"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="Admin"
        options={{
          tabBarLabel: "Admin",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="User"
        options={{
          tabBarLabel: "User",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="DevTools"
        options={{
          tabBarLabel: "Dev Tools",
        }}
      />
    </Tabs>
  );
}
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
          let iconName;
          if (route.name === "Index") {
            iconName = "home-outline";
          } else if (route.name === "AdminBase") {
            iconName = "briefcase-outline";
          } else if (route.name === "DevMenu") {
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
        name="AdminBase"
        options={{
          tabBarLabel: "Admin",
        }}
      />
      <Tabs.Screen
        name="DevMenu"
        options={{
          tabBarLabel: "Dev Menu",
        }}
      />
    </Tabs>
  );
}

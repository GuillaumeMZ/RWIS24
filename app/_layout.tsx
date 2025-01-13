import React, { useEffect, useState } from "react";
import { Stack, usePathname, Slot } from "expo-router";
import { BarbecueProvider, useBarbecueContext } from "../context/BarbecueContext";

export default function Layout() {
  const pathname = usePathname(); // Get the current route path
  const [dynamicTitle, setDynamicTitle] = useState("App"); // State for dynamic header title

  // Component to dynamically update the title based on route and context
  const DynamicTitleWrapper = () => {
    const { barbecues } = useBarbecueContext(); // Access selected barbecue data from context
    const selectedBarbecue = barbecues.find((barbecue) => barbecue.selected); // Find the selected barbecue

    useEffect(() => {
      // Avoid unnecessary updates by only setting the title if it has changed
      let newTitle = "App"; // Default fallback title

      if (pathname.startsWith("/admin/barbecue/") && selectedBarbecue) {
        newTitle = selectedBarbecue.name;
      } else if (pathname.startsWith("/admin/AdminBase")) {
        newTitle = "Your Barbecues";
      } else if (pathname.startsWith("/user/") && selectedBarbecue) {
        newTitle = selectedBarbecue.name;
      } else if (pathname === "/") {
        newTitle = "Main Menu";
      }

      if (dynamicTitle !== newTitle) {
        setDynamicTitle(newTitle);
      }
    }, [pathname, selectedBarbecue]); // Only run when pathname or selectedBarbecue changes

    return null; // No UI needed, just updates the state
  };

  return (
    <BarbecueProvider>
      <DynamicTitleWrapper /> {/* Dynamically updates the title */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ff7043" }, // Header background color
          headerTintColor: "#fff", // Header text/icon color
          headerTitleStyle: {
            fontWeight: "bold", // Bold title text
            textAlign: "center", // Center the header title
          },
          headerBackVisible: false, // Completely hide the default back button
          title: dynamicTitle, // Set the header title dynamically
        }}
      >
        <Slot /> {/* Render child screens */}
      </Stack>
    </BarbecueProvider>
  );
}


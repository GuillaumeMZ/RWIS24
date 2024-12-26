import { Tabs } from "expo-router";  // Import Tabs from expo-router

export default function UserLayout() {
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
      <Tabs.Screen name="user0" options={{ headerShown: false }} />
      <Tabs.Screen name="user1" options={{ headerShown: false }} />
      <Tabs.Screen name="user2" options={{ headerShown: false }} />
    </Tabs>
  );
}


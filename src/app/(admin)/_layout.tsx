import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useAuth } from '../providers/AuthProviders';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuth();  
  if (!isAdmin) {
    return <Redirect href="/" />;
  }



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
        tabBarStyle : {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>

      <Tabs.Screen  name="index" options={{href: null}}/>
     
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
     
     <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        }}
      />
    </Tabs>
  );
}

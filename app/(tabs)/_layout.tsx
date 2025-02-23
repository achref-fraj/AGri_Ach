import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, I18nManager, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Enable RTL layout for Arabic
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          ...Platform.select({
            ios: {
              borderTopWidth: 1,
              borderTopColor: '#e9ecef',
              paddingBottom: 5,
              paddingTop: 5,
            },
            android: {
              elevation: 8,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontFamily: 'arabic',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'المحاصيل',
          headerTitle: 'المحاصيل',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "leaf" : "leaf-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="livestock"
        options={{
          title: 'الثروة الحيوانية',
          headerTitle: 'الثروة الحيوانية',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "paw" : "paw-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'استكشاف',
          headerTitle: 'استكشاف',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={28} 
              name={focused ? "paperplane" : "paperplane.fill"} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

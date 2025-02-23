import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerText}>مرحباً بك في تطبيق الزراعة</ThemedText>
        <ThemedText style={styles.subHeader}>اختر ما تريد معرفة المزيد عنه</ThemedText>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option}
          onPress={() => router.push('/(tabs)')}
        >
          <View style={styles.optionIcon}>
            <Ionicons name="leaf-outline" size={32} color="#2c3e50" />
          </View>
          <ThemedText style={styles.optionTitle}>معلومات عن المحاصيل</ThemedText>
          <ThemedText style={styles.optionDescription}>
            معلومات مفصلة عن زراعة وإدارة المحاصيل المختلفة
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option}
          onPress={() => router.push('/(tabs)/livestock')}
        >
          <View style={styles.optionIcon}>
            <Ionicons name="paw-outline" size={32} color="#2c3e50" />
          </View>
          <ThemedText style={styles.optionTitle}>الثروة الحيوانية</ThemedText>
          <ThemedText style={styles.optionDescription}>
            معلومات عن تربية وإدارة المواشي والدواجن
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 32,
    marginTop: 32,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#2c3e50',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    marginTop: 8,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#2c3e50',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    lineHeight: 20,
  },
}); 
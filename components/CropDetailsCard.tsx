import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CropDetails } from '../types/agriculture';

interface CropDetailsCardProps {
  details: CropDetails;
  cropName: string;
}

export const CropDetailsCard: React.FC<CropDetailsCardProps> = ({ details, cropName }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cropName}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>دليل الزراعة</Text>
        <Text style={styles.content}>{details.plantingGuide}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>دليل الحصاد</Text>
        <Text style={styles.content}>{details.harvestingGuide}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>اعتبارات الطقس</Text>
        <Text style={styles.content}>{details.weatherConsiderations}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>الأسمدة الموصى بها</Text>
        <Text style={styles.content}>{details.fertilizers}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>أفضل الممارسات</Text>
        <Text style={styles.content}>{details.bestPractices}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
}); 
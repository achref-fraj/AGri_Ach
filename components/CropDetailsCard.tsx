import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { CropDetails } from '../types/agriculture';
import { Ionicons } from '@expo/vector-icons';

interface CropDetailsCardProps {
  details: CropDetails;
  cropName: string;
  cropIcon?: string;
  onClose: () => void;
}

export const CropDetailsCard: React.FC<CropDetailsCardProps> = ({ 
  details, 
  cropName, 
  cropIcon,
  onClose 
}) => {
  const renderSection = (title: string, content: string, icon: string) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon as any} size={24} color="#2c3e50" />
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      </View>
      <ThemedText style={styles.content}>{content}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.cropIcon}>{cropIcon}</ThemedText>
          <ThemedText style={styles.title}>{cropName}</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection('دليل الزراعة', details.plantingGuide, 'seed')}
        {renderSection('دليل الحصاد', details.harvestingGuide, 'cut')}
        {renderSection('اعتبارات الطقس', details.weatherConsiderations, 'partly-sunny')}
        {renderSection('الأسمدة والتربة', details.fertilizers, 'leaf')}
        {renderSection('أفضل الممارسات', details.bestPractices, 'checkmark-circle')}
        {renderSection('إدارة الأمراض', details.diseaseManagement, 'medical')}
        {renderSection('مكافحة الآفات', details.pestControl, 'bug')}
        {renderSection('إدارة المياه', details.waterManagement, 'water')}
        {renderSection('تحضير التربة', details.soilPreparation, 'earth')}
        {renderSection('إرشادات التخزين', details.storageGuidelines, 'archive')}
        {renderSection('القيمة السوقية', details.marketValue, 'cash')}
        {renderSection('الأثر البيئي', details.environmentalImpact, 'leaf')}
        {renderSection('الزراعة العضوية', details.organicFarming, 'flower')}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40, // To balance with close button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
  cropIcon: {
    fontSize: 32,
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'right',
  },
}); 
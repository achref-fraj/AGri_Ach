import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Modal, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCropInformation } from '../../services/geminiService';
import { CropDetailsCard } from '../../components/CropDetailsCard';
import { CropDetails } from '../../types/agriculture';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const crops = [
  // Grains & Cereals
  { id: '1', name: 'القمح', icon: '🌾' },
  { id: '2', name: 'الأرز', icon: '🌾' },
  { id: '3', name: 'الذرة', icon: '🌽' },
  { id: '4', name: 'الشعير', icon: '🌾' },
  
  // Vegetables
  { id: '5', name: 'الطماطم', icon: '🍅' },
  { id: '6', name: 'البطاطس', icon: '🥔' },
  { id: '7', name: 'الباذنجان', icon: '🍆' },
  { id: '8', name: 'الخيار', icon: '🥒' },
  { id: '9', name: 'الجزر', icon: '🥕' },
  { id: '10', name: 'البصل', icon: '🧅' },
  { id: '11', name: 'الثوم', icon: '🧄' },
  { id: '12', name: 'الفلفل', icon: '🫑' },
  { id: '13', name: 'البامية', icon: '🥬' },
  { id: '14', name: 'الكوسة', icon: '🥬' },
  { id: '15', name: 'الملفوف', icon: '🥬' },
  
  // Legumes
  { id: '16', name: 'الفول', icon: '🫘' },
  { id: '17', name: 'العدس', icon: '🫘' },
  { id: '18', name: 'الحمص', icon: '🫘' },
  { id: '19', name: 'الفاصوليا', icon: '🫘' },
  
  // Fruits
  { id: '20', name: 'البرتقال', icon: '🍊' },
  { id: '21', name: 'الليمون', icon: '🍋' },
  { id: '22', name: 'العنب', icon: '🍇' },
  { id: '23', name: 'التفاح', icon: '🍎' },
  { id: '24', name: 'المانجو', icon: '🥭' },
  { id: '25', name: 'الموز', icon: '🍌' },
  { id: '26', name: 'التين', icon: '🫐' },
  { id: '27', name: 'الرمان', icon: '🍎' },
  { id: '28', name: 'المشمش', icon: '🍑' },
  { id: '29', name: 'الخوخ', icon: '🍑' },
  
  // Oil Crops
  { id: '30', name: 'عباد الشمس', icon: '🌻' },
  { id: '31', name: 'الزيتون', icon: '🫒' },
  { id: '32', name: 'السمسم', icon: '🌱' },
  
  // Other Important Crops
  { id: '33', name: 'القصن', icon: '🌿' },
  { id: '34', name: 'قصب السكر', icon: '🎋' },
  { id: '35', name: 'البنجر', icon: '🥬' },
  { id: '36', name: 'البطاطا الحلوة', icon: '🥔' },
  
  // Herbs & Spices
  { id: '37', name: 'النعناع', icon: '🌿' },
  { id: '38', name: 'الريحان', icon: '🌿' },
  { id: '39', name: 'الكزبرة', icon: '🌿' },
  { id: '40', name: 'الشبت', icon: '🌿' }
];

export default function AgricultureScreen() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [cropDetails, setCropDetails] = useState<CropDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const renderCropSection = (title: string, cropsArray: typeof crops) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.cropGrid}>
        {cropsArray.map((crop) => (
          <TouchableOpacity
            key={crop.id}
            style={styles.cropItem}
            onPress={() => handleCropSelect(crop.name)}
            activeOpacity={0.7}
          >
            <View style={styles.cropIconContainer}>
              <ThemedText style={styles.cropIcon}>{crop.icon}</ThemedText>
            </View>
            <ThemedText style={styles.cropName}>{crop.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const handleCropSelect = async (cropName: string) => {
    setIsLoading(true);
    try {
      const details = await getCropInformation(cropName);
      setCropDetails(details);
      setSelectedCrop(cropName);
    } catch (error) {
      console.error('Error fetching crop details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group crops by category
  const grainCrops = crops.slice(0, 4);
  const vegetables = crops.slice(4, 15);
  const legumes = crops.slice(15, 19);
  const fruits = crops.slice(19, 29);
  const oilCrops = crops.slice(29, 32);
  const otherCrops = crops.slice(32, 36);
  const herbs = crops.slice(36);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText style={styles.headerText}>المحاصيل الزراعية</ThemedText>
          <ThemedText style={styles.subHeader}>معلومات عن زراعة وإدارة المحاصيل</ThemedText>
        </View>

        <ScrollView 
          style={styles.contentScrollView}
          showsVerticalScrollIndicator={false}
        >
          {renderCropSection('الحبوب والأرز', grainCrops)}
          {renderCropSection('الخضروات', vegetables)}
          {renderCropSection('البقوليات', legumes)}
          {renderCropSection('الفواكه', fruits)}
          {renderCropSection('المحاصيل الزيتية', oilCrops)}
          {renderCropSection('محاصيل أخرى', otherCrops)}
          {renderCropSection('الأعشاب والتوابل', herbs)}
        </ScrollView>

        <Modal
          visible={!!selectedCrop && !!cropDetails}
          animationType="slide"
          onRequestClose={() => {
            setSelectedCrop(null);
            setCropDetails(null);
          }}
        >
          {cropDetails && selectedCrop && (
            <CropDetailsCard
              details={cropDetails}
              cropName={selectedCrop}
              cropIcon={crops.find(c => c.name === selectedCrop)?.icon}
              onClose={() => {
                setSelectedCrop(null);
                setCropDetails(null);
              }}
            />
          )}
        </Modal>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <ThemedText style={styles.loadingText}>جاري تحميل المعلومات...</ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentScrollView: {
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#2c3e50',
  },
  subHeader: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'right',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
    color: '#2c3e50',
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  cropItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cropIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropIcon: {
    fontSize: 28,
  },
  cropName: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    color: '#2c3e50',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#2c3e50',
    fontSize: 16,
  },
});

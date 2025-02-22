import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Modal, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GeminiService } from '../../services/geminiService';
import { CropDetailsCard } from '../../components/CropDetailsCard';
import { CropDetails } from '../../types/agriculture';

const crops = [
  { id: '1', name: 'البابايا', icon: '🥭' },
  { id: '2', name: 'الإجاص', icon: '🍐' },
  { id: '3', name: 'الأرز', icon: '🌾' },
  { id: '4', name: 'البامية', icon: '🥬' },
  { id: '5', name: 'البازيلاء والحمص', icon: '🫘' },
  { id: '6', name: 'الباذنجان', icon: '🍆' },
  { id: '7', name: 'البصل', icon: '🧅' },
  { id: '8', name: 'البسلة', icon: '🫛' },
  { id: '9', name: 'الموز', icon: '🍌' },
  { id: '10', name: 'المشمش', icon: '🍑' },
  { id: '11', name: 'القمح', icon: '🌾' },
  { id: '12', name: 'الطماطم', icon: '🍅' },
  // Add more crops as needed
];

export default function HomeScreen() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [cropDetails, setCropDetails] = useState<CropDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const geminiService = new GeminiService();

  const handleCropSelect = async (cropName: string) => {
    setIsLoading(true);
    try {
      const details = await geminiService.getCropInformation(cropName);
      setCropDetails(details);
      setSelectedCrop(cropName);
    } catch (error) {
      console.error('Error fetching crop details:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>قم بتحديد المحاصيل</ThemedText>
      <ThemedText style={styles.subHeader}>حدد ما يصل إلى 8 من المحاصيل التي تهمك</ThemedText>

      <View style={styles.cropGrid}>
        {crops.map((crop) => (
          <TouchableOpacity
            key={crop.id}
            style={styles.cropItem}
            onPress={() => handleCropSelect(crop.name)}
          >
            <View style={styles.cropIconContainer}>
              <ThemedText style={styles.cropIcon}>{crop.icon}</ThemedText>
            </View>
            <ThemedText style={styles.cropName}>{crop.name}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

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
          />
        )}
      </Modal>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <ThemedText>جاري تحميل المعلومات...</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    marginBottom: 24,
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  cropItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  cropIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropIcon: {
    fontSize: 32,
  },
  cropName: {
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

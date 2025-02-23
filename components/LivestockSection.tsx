import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Modal,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { AnimalDetailsCard } from './AnimalDetailsCard';
import { getAnimalInformation } from '../services/animalService';
import { AnimalDetails } from '../types/animals';

const livestock = [
  { id: '1', name: 'الأبقار', icon: '🐄', category: 'ماشية' },
  { id: '2', name: 'الأغنام', icon: '🐑', category: 'ماشية' },
  { id: '3', name: 'الماعز', icon: '🐐', category: 'ماشية' },
  { id: '4', name: 'الجمال', icon: '🐪', category: 'ماشية' },
  { id: '5', name: 'الجاموس', icon: '🐃', category: 'ماشية' },
  { id: '6', name: 'الدجاج', icon: '🐔', category: 'دواجن' },
  { id: '7', name: 'البط', icon: '🦆', category: 'دواجن' },
  { id: '8', name: 'الديك الرومي', icon: '🦃', category: 'دواجن' },
  { id: '9', name: 'الأرانب', icon: '🐰', category: 'حيوانات صغيرة' },
  { id: '10', name: 'الحمام', icon: '🕊️', category: 'طيور' }
];

export const LivestockSection = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [animalDetails, setAnimalDetails] = useState<AnimalDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnimalSelect = async (animalName: string) => {
    setIsLoading(true);
    setAnimalDetails(null);
    
    try {
      console.log('Starting fetch for:', animalName);
      const details = await getAnimalInformation(animalName);
      
      if (!details) {
        throw new Error('No details returned');
      }
      
      // Verify we have actual content
      const hasContent = Object.values(details).some(value => value && value !== 'جاري تحميل المعلومات...');
      if (!hasContent) {
        throw new Error('No content found in response');
      }
      
      setAnimalDetails(details);
      setSelectedAnimal(animalName);
    } catch (error) {
      console.error('Fetch Error:', error);
      if (error instanceof Error) {
        Alert.alert(
          'خطأ',
          error.message.includes('API') 
            ? 'خطأ في الاتصال بالخدمة. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.'
            : 'حدث خطأ أثناء تحميل المعلومات. يرجى المحاولة مرة أخرى.',
          [{ text: 'حسناً', onPress: () => setSelectedAnimal(null) }]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategory = (category: string) => {
    const categoryAnimals = livestock.filter(animal => animal.category === category);
    
    return (
      <View style={styles.categoryContainer}>
        <ThemedText style={styles.categoryTitle}>{category}</ThemedText>
        <View style={styles.animalGrid}>
          {categoryAnimals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={styles.animalItem}
              onPress={() => handleAnimalSelect(animal.name)}
              activeOpacity={0.7}
            >
              <View style={styles.animalIconContainer}>
                <ThemedText style={styles.animalIcon}>{animal.icon}</ThemedText>
              </View>
              <ThemedText style={styles.animalName}>{animal.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText style={styles.loadingText}>جاري تحميل المعلومات...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText style={styles.headerText}>الثروة الحيوانية</ThemedText>
          <ThemedText style={styles.subHeader}>معلومات عن تربية وإدارة المواشي</ThemedText>
        </View>

        {renderCategory('ماشية')}
        {renderCategory('دواجن')}
        {renderCategory('حيوانات صغيرة')}
        {renderCategory('طيور')}
      </ScrollView>

      <Modal
        visible={!!selectedAnimal && !!animalDetails}
        animationType="slide"
        onRequestClose={() => {
          setSelectedAnimal(null);
          setAnimalDetails(null);
        }}
      >
        {animalDetails && selectedAnimal && (
          <AnimalDetailsCard
            details={animalDetails}
            animalName={selectedAnimal}
            animalIcon={livestock.find(a => a.name === selectedAnimal)?.icon}
            onClose={() => {
              setSelectedAnimal(null);
              setAnimalDetails(null);
            }}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
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
  categoryContainer: {
    marginBottom: 24,
    padding: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 16,
    color: '#2c3e50',
  },
  animalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  animalItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  animalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  animalIcon: {
    fontSize: 32,
  },
  animalName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
}); 
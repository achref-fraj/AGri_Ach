import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Platform,
  Dimensions,
  Share
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { CropDetails } from '../types/agriculture';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [scrollY] = useState(new Animated.Value(0));

  // Header animation based on scroll
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `معلومات عن ${cropName}:\n\n` +
                `🌱 دليل الزراعة: ${details.plantingGuide}\n\n` +
                `🌾 دليل الحصاد: ${details.harvestingGuide}\n\n` +
                `🌤️ اعتبارات الطقس: ${details.weatherConsiderations}\n\n` +
                `🌿 الأسمدة والتربة: ${details.fertilizers}`,
        title: `معلومات زراعية عن ${cropName}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderSection = (title: string, content: string, icon: string) => {
    const isExpanded = expandedSection === title;

    return (
      <TouchableOpacity
        style={[styles.section, isExpanded && styles.expandedSection]}
        onPress={() => setExpandedSection(isExpanded ? null : title)}
        activeOpacity={0.8}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name={icon as any} size={24} color="#2c3e50" />
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#2c3e50" 
          />
        </View>
        {isExpanded && (
          <Animated.View style={styles.contentContainer}>
            <ThemedText style={styles.content}>{content}</ThemedText>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight, opacity: headerOpacity }]}>
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="#2c3e50" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.cropIcon}>{cropIcon}</ThemedText>
          <ThemedText style={styles.title}>{cropName}</ThemedText>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {renderSection('دليل الزراعة', details.plantingGuide, 'leaf-outline')}
        {renderSection('دليل الحصاد', details.harvestingGuide, 'cut-outline')}
        {renderSection('اعتبارات الطقس', details.weatherConsiderations, 'partly-sunny-outline')}
        {renderSection('الأسمدة والتربة', details.fertilizers, 'nutrition-outline')}
        {renderSection('أفضل الممارسات', details.bestPractices, 'checkmark-circle-outline')}
        {renderSection('إدارة الأمراض', details.diseaseManagement, 'medical-outline')}
        {renderSection('مكافحة الآفات', details.pestControl, 'warning-outline')}
        {renderSection('إدارة المياه', details.waterManagement, 'water-outline')}
        {renderSection('تحضير التربة', details.soilPreparation, 'layers-outline')}
        {renderSection('إرشادات التخزين', details.storageGuidelines, 'archive-outline')}
        {renderSection('القيمة السوقية', details.marketValue, 'cash-outline')}
        {renderSection('الأثر البيئي', details.environmentalImpact, 'leaf-outline')}
        {renderSection('الزراعة العضوية', details.organicFarming, 'flower-outline')}
      </Animated.ScrollView>
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
  expandedSection: {
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  contentContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: '#34495e',
    textAlign: 'right',
  },
}); 
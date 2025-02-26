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
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

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
                `🌱 دليل الزراعة: ${details.plantingGuide || 'غير متوفر'}\n\n` +
                `🌾 دليل الحصاد: ${details.harvestingGuide || 'غير متوفر'}\n\n` +
                `🌤️ اعتبارات الطقس: ${details.weatherConsiderations || 'غير متوفر'}\n\n` +
                `🌿 الأسمدة والتربة: ${details.fertilizers || 'غير متوفر'}\n\n` +
                `⭐ أفضل الممارسات: ${details.bestPractices || 'غير متوفر'}\n\n` +
                `🦠 إدارة الأمراض: ${details.diseaseManagement || 'غير متوفر'}\n\n` +
                `🐛 مكافحة الآفات: ${details.pestControl || 'غير متوفر'}\n\n` +
                `💧 إدارة المياه: ${details.waterManagement || 'غير متوفر'}\n\n` +
                `🏞️ تحضير التربة: ${details.soilPreparation || 'غير متوفر'}\n\n` +
                `🏪 إرشادات التخزين: ${details.storageGuidelines || 'غير متوفر'}\n\n` +
                `📈 القيمة السوقية: ${details.marketValue || 'غير متوفر'}\n\n` +
                `🌍 الأثر البيئي: ${details.environmentalImpact || 'غير متوفر'}\n\n` +
                `🌿 الزراعة العضوية: ${details.organicFarming || 'غير متوفر'}`,
                
        title: `معلومات زراعية عن ${cropName}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderSection = (title: string, content: string) => {
    const isExpanded = expandedSection === title;
    console.log(`Rendering section ${title}:`, content);
    const displayContent = content || `لم يتم العثور على معلومات ل${title}`;

    // Enhanced icon mapping with better icons and colors
    const iconConfig: { [key: string]: { icon: JSX.Element, color: string } } = {
      'دليل الزراعة': {
        icon: <MaterialCommunityIcons name="seed-outline" size={24} color="#2ecc71" />,
        color: '#2ecc71'
      },
      'دليل الحصاد': {
        icon: <MaterialCommunityIcons name="grain" size={24} color="#f39c12" />,
        color: '#f39c12'
      },
      'اعتبارات الطقس': {
        icon: <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#3498db" />,
        color: '#3498db'
      },
      'الأسمدة والتربة': {
        icon: <FontAwesome5 name="hand-holding-water" size={24} color="#8e44ad" />,
        color: '#8e44ad'
      },
      'أفضل الممارسات': {
        icon: <MaterialCommunityIcons name="star-check-outline" size={24} color="#e67e22" />,
        color: '#e67e22'
      },
      'إدارة الأمراض': {
        icon: <FontAwesome5 name="disease" size={24} color="#e74c3c" />,
        color: '#e74c3c'
      },
      'مكافحة الآفات': {
        icon: <MaterialCommunityIcons name="bug-outline" size={24} color="#c0392b" />,
        color: '#c0392b'
      },
      'إدارة المياه': {
        icon: <MaterialCommunityIcons name="water-outline" size={24} color="#3498db" />,
        color: '#3498db'
      },
      'تحضير التربة': {
        icon: <MaterialCommunityIcons name="terrain" size={24} color="#795548" />,
        color: '#795548'
      },
      'إرشادات التخزين': {
        icon: <MaterialCommunityIcons name="warehouse" size={24} color="#7f8c8d" />,
        color: '#7f8c8d'
      },
      'القيمة السوقية': {
        icon: <MaterialCommunityIcons name="trending-up" size={24} color="#27ae60" />,
        color: '#27ae60'
      },
      'الأثر البيئي': {
        icon: <MaterialCommunityIcons name="nature" size={24} color="#16a085" />,
        color: '#16a085'
      },
      'الزراعة العضوية': {
        icon: <MaterialCommunityIcons name="sprout" size={24} color="#27ae60" />,
        color: '#27ae60'
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.section, 
          isExpanded && styles.expandedSection,
          { borderLeftColor: iconConfig[title]?.color || '#2c3e50' }
        ]}
        onPress={() => setExpandedSection(isExpanded ? null : title)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <ThemedText style={[styles.sectionTitle, { color: iconConfig[title]?.color }]}>
              {title}
            </ThemedText>
            {iconConfig[title]?.icon}
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={iconConfig[title]?.color || '#2c3e50'} 
          />
        </View>
        {isExpanded && (
          <Animated.View style={styles.contentContainer}>
            <ThemedText style={styles.content}>{displayContent}</ThemedText>
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
        {renderSection('دليل الزراعة', details.plantingGuide)}
        {renderSection('دليل الحصاد', details.harvestingGuide)}
        {renderSection('اعتبارات الطقس', details.weatherConsiderations)}
        {renderSection('الأسمدة والتربة', details.fertilizers)}
        {renderSection('أفضل الممارسات', details.bestPractices)}
        {renderSection('إدارة الأمراض', details.diseaseManagement)}
        {renderSection('مكافحة الآفات', details.pestControl)}
        {renderSection('إدارة المياه', details.waterManagement)}
        {renderSection('تحضير التربة', details.soilPreparation)}
        {renderSection('إرشادات التخزين', details.storageGuidelines)}
        {renderSection('القيمة السوقية', details.marketValue)}
        {renderSection('الأثر البيئي', details.environmentalImpact)}
        {renderSection('الزراعة العضوية', details.organicFarming)}
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
    flexDirection: 'row-reverse',
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
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderLeftWidth: 4,  // Add colored border on the left
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  expandedSection: {
    backgroundColor: '#f8f9fa',
    borderColor: '#dee2e6',
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
    gap: 12,  // Add space between icon and text
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginRight: 12,
    textAlign: 'right',
    flex: 1,
  },
  contentContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingHorizontal: 8,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'right',
    paddingVertical: 8,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
  },
}); 
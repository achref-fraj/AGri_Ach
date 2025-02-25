import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Platform,
  Share
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { AnimalDetails } from '../types/animals';
import { Ionicons } from '@expo/vector-icons';

interface AnimalDetailsCardProps {
  details: AnimalDetails;
  animalName: string;
  animalIcon?: string;
  onClose: () => void;
}

export const AnimalDetailsCard: React.FC<AnimalDetailsCardProps> = ({ 
  details, 
  animalName, 
  animalIcon,
  onClose 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      const message = `معلومات عن ${animalName}:\n\n` +
        `التغذية: ${details.feeding}\n` +
        `العناية اليومية: ${details.care}\n` +
        `الرعاية الصحية: ${details.health}\n` +
        `السكن والبيئة: ${details.housing}\n` +
        `معلومات التربية: ${details.breeding}`;

      await Share.share({
        message,
        title: `معلومات عن ${animalName}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!details) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            لم يتم العثور على معلومات. يرجى المحاولة مرة أخرى.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const renderSection = (title: string, content: string, icon: string) => {
    const isExpanded = expandedSection === title;
    const displayContent = content || `لم يتم العثور على معلومات ل${title}`;

    return (
      <TouchableOpacity
        style={[styles.section, isExpanded && styles.expandedSection]}
        onPress={() => setExpandedSection(isExpanded ? null : title)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <ThemedText>{icon}</ThemedText>
            <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={24} 
            color="#2c3e50" 
          />
        </View>
        {isExpanded && (
          <View style={styles.contentContainer}>
            <ThemedText style={styles.content}>{displayContent}</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>{animalName} {animalIcon}</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderSection('التغذية', details.feeding, '🍎')}
        {renderSection('العناية اليومية', details.care, '☀️')}
        {renderSection('الرعاية الصحية', details.health, '❄️')}
        {renderSection('السكن والبيئة', details.housing, '🏠')}
        {renderSection('معلومات التربية', details.breeding, '❤️')}
        {renderSection('الأمراض الشائعة', details.diseases, '⚠️')}
        {renderSection('الأدوية والعلاجات', details.medications, '💊')}
        {renderSection('السلوك والتدريب', details.behavior, '🎓')}
        {renderSection('الجدوى الاقتصادية', details.economics, '💰')}
        {renderSection('جدول التطعيمات', details.vaccination, '📅')}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  shareButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
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
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  expandedSection: {
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
    textAlign: 'right',
  },
  contentContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'right',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
}); 
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Modal, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCropInformation } from '../../services/geminiService';
import { CropDetailsCard } from '../../components/CropDetailsCard';
import { CropDetails } from '../../types/agriculture';

// ... rest of your original index.tsx code for crops

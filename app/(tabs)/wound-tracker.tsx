import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, FlipHorizontal, Image as ImageIcon, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function WoundTrackerTab() {
  const { isDarkMode, colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const [healingHistory, setHealingHistory] = useState([
    { date: '2024-01-15', score: 8.2, status: 'Excellent', color: colors.success },
    { date: '2024-01-14', score: 7.8, status: 'Good', color: '#8bc34a' },
    { date: '2024-01-13', score: 7.5, status: 'Good', color: '#8bc34a' },
    { date: '2024-01-12', score: 6.9, status: 'Fair', color: colors.warning },
  ]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    // Simulate taking a photo
    setLastPhoto('https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg');
    setShowCamera(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      Alert.alert(
        'Analysis Complete',
        'Healing Score: 8.2/10\n\nYour wound is healing excellently! Continue following your care routine.',
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const openCamera = () => {
    if (!permission) {
      requestPermission();
      return;
    }
    
    if (!permission.granted) {
      Alert.alert(
        'Camera Permission',
        'We need camera access to analyze your wound photos.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Allow', onPress: requestPermission },
        ]
      );
      return;
    }
    
    setShowCamera(true);
  };

  const styles = createStyles(colors);

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.cameraButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
                <FlipHorizontal color="#ffffff" size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.cameraFrame}>
              <View style={styles.frameCorner} />
              <View style={[styles.frameCorner, styles.topRight]} />
              <View style={[styles.frameCorner, styles.bottomLeft]} />
              <View style={[styles.frameCorner, styles.bottomRight]} />
            </View>
            
            <Text style={styles.cameraInstructions}>
              Position your wound within the frame for analysis
            </Text>
            
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#42a5f5', '#2196f3'] : ['#2196f3', '#21cbf3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Wound Monitoring</Text>
        <Text style={styles.headerSubtitle}>Track your healing progress with AI</Text>
      </LinearGradient>

      {/* Camera Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.cameraCard} onPress={openCamera}>
          <LinearGradient
            colors={isDarkMode ? ['#42a5f5', '#2196f3'] : ['#4fc3f7', '#29b6f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cameraGradient}
          >
            <Camera color="#ffffff" size={32} />
            <Text style={styles.cameraCardTitle}>Take Wound Photo</Text>
            <Text style={styles.cameraCardSubtitle}>
              AI will analyze your healing progress
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Last Analysis */}
      {lastPhoto && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Analysis</Text>
          <View style={styles.analysisCard}>
            <Image source={{ uri: lastPhoto }} style={styles.woundImage} />
            <View style={styles.analysisContent}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreText}>8.2</Text>
                <Text style={styles.scoreMax}>/10</Text>
                <View style={styles.statusBadge}>
                  <CheckCircle color="#ffffff" size={16} />
                  <Text style={styles.statusText}>Excellent</Text>
                </View>
              </View>
              <Text style={styles.analysisDate}>Today, 2:30 PM</Text>
              <Text style={styles.analysisNote}>
                Great progress! Minimal redness and good tissue formation.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Healing Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Healing History</Text>
        <View style={styles.historyContainer}>
          {healingHistory.map((entry, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyDate}>
                <Text style={styles.historyDateText}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyScore}>
                  <Text style={styles.historyScoreText}>{entry.score}</Text>
                  <View style={[styles.historyStatus, { backgroundColor: entry.color }]}>
                    <Text style={styles.historyStatusText}>{entry.status}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <View style={styles.tipCard}>
          <TrendingUp color={colors.primary} size={24} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Photography Tips</Text>
            <Text style={styles.tipText}>
              • Take photos in good lighting{'\n'}
              • Keep the wound in focus{'\n'}
              • Use the same angle each time{'\n'}
              • Clean the wound area before photographing
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  cameraCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cameraGradient: {
    padding: 30,
    alignItems: 'center',
  },
  cameraCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  cameraCardSubtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },
  cameraButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cameraButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraFrame: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    right: '20%',
    bottom: '40%',
  },
  frameCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#ffffff',
    borderWidth: 3,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  cameraInstructions: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.info,
  },
  analysisCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  woundImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  analysisContent: {
    paddingHorizontal: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.success,
  },
  scoreMax: {
    fontSize: 20,
    color: colors.textSecondary,
    marginLeft: 4,
    marginRight: 16,
  },
  statusBadge: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  analysisDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  analysisNote: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  historyContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyDate: {
    width: 60,
    marginRight: 16,
  },
  historyDateText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  historyContent: {
    flex: 1,
  },
  historyScore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  historyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyStatusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipContent: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});
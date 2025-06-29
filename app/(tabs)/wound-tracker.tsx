import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, FlipHorizontal, Image as ImageIcon, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, Zap, Grid3x3, X, Share, Download } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface WoundPhoto {
  id: string;
  uri: string;
  date: string;
  score: number;
  status: string;
  color: string;
  analysis: string;
}

export default function WoundTrackerTab() {
  const { isDarkMode, colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<WoundPhoto | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [woundPhotos, setWoundPhotos] = useState<WoundPhoto[]>([
    {
      id: '1',
      uri: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
      date: '2024-01-15',
      score: 8.2,
      status: 'Excellent',
      color: colors.success,
      analysis: 'Great progress! Minimal redness and good tissue formation.'
    },
    {
      id: '2',
      uri: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
      date: '2024-01-14',
      score: 7.8,
      status: 'Good',
      color: '#8bc34a',
      analysis: 'Healing well with some minor inflammation.'
    },
    {
      id: '3',
      uri: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      date: '2024-01-13',
      score: 7.5,
      status: 'Good',
      color: '#8bc34a',
      analysis: 'Steady improvement in wound closure.'
    },
    {
      id: '4',
      uri: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg',
      date: '2024-01-12',
      score: 6.9,
      status: 'Fair',
      color: colors.warning,
      analysis: 'Some swelling present, continue monitoring.'
    },
  ]);

  const [healingHistory] = useState([
    { date: '2024-01-15', score: 8.2, status: 'Excellent', color: colors.success },
    { date: '2024-01-14', score: 7.8, status: 'Good', color: '#8bc34a' },
    { date: '2024-01-13', score: 7.5, status: 'Good', color: '#8bc34a' },
    { date: '2024-01-12', score: 6.9, status: 'Fair', color: colors.warning },
  ]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    setIsAnalyzing(true);
    setShowCamera(false);
    
    // Simulate photo capture and analysis
    const newPhoto: WoundPhoto = {
      id: Date.now().toString(),
      uri: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
      date: new Date().toISOString().split('T')[0],
      score: 8.2 + Math.random() * 0.5,
      status: 'Excellent',
      color: colors.success,
      analysis: 'Latest analysis shows excellent healing progress with minimal inflammation.'
    };
    
    setTimeout(() => {
      setWoundPhotos(prev => [newPhoto, ...prev]);
      setIsAnalyzing(false);
      Alert.alert(
        'Analysis Complete',
        `Healing Score: ${newPhoto.score.toFixed(1)}/10\n\n${newPhoto.analysis}`,
        [{ text: 'OK' }]
      );
    }, 3000);
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

  const openPhotoDetail = (photo: WoundPhoto) => {
    setSelectedPhoto(photo);
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
              Position your wound within the frame for AI analysis
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
        <Text style={styles.headerTitle}>AI Wound Analysis</Text>
        <Text style={styles.headerSubtitle}>Track healing with computer vision</Text>
      </LinearGradient>

      {/* Analysis Status */}
      {isAnalyzing && (
        <View style={styles.analysisStatus}>
          <View style={styles.analysisIndicator}>
            <Zap color={colors.warning} size={20} />
            <Text style={styles.analysisText}>Analyzing wound photo...</Text>
          </View>
        </View>
      )}

      {/* Action Cards */}
      <View style={styles.section}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryActionCard} onPress={openCamera}>
            <LinearGradient
              colors={isDarkMode ? ['#42a5f5', '#2196f3'] : ['#4fc3f7', '#29b6f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionGradient}
            >
              <Camera color="#ffffff" size={28} />
              <Text style={styles.actionCardTitle}>Take Photo</Text>
              <Text style={styles.actionCardSubtitle}>AI Analysis</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionCard} 
            onPress={() => setShowGallery(true)}
          >
            <Grid3x3 color={colors.info} size={24} />
            <Text style={styles.secondaryActionTitle}>View Gallery</Text>
            <Text style={styles.secondaryActionSubtitle}>{woundPhotos.length} photos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Latest Analysis */}
      {woundPhotos.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Analysis</Text>
          <TouchableOpacity 
            style={styles.analysisCard}
            onPress={() => openPhotoDetail(woundPhotos[0])}
          >
            <Image source={{ uri: woundPhotos[0].uri }} style={styles.woundImage} />
            <View style={styles.analysisContent}>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreText}>{woundPhotos[0].score.toFixed(1)}</Text>
                <Text style={styles.scoreMax}>/10</Text>
                <View style={[styles.statusBadge, { backgroundColor: woundPhotos[0].color }]}>
                  <CheckCircle color="#ffffff" size={16} />
                  <Text style={styles.statusText}>{woundPhotos[0].status}</Text>
                </View>
              </View>
              <Text style={styles.analysisDate}>
                {new Date(woundPhotos[0].date).toLocaleDateString()}
              </Text>
              <Text style={styles.analysisNote}>{woundPhotos[0].analysis}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Healing Progress Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Healing Progress</Text>
        <View style={styles.progressChart}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Recovery Trend</Text>
            <View style={styles.trendIndicator}>
              <TrendingUp color={colors.success} size={16} />
              <Text style={styles.trendText}>+0.4 this week</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            {healingHistory.reverse().map((entry, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      height: `${(entry.score / 10) * 100}%`,
                      backgroundColor: entry.color 
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.barScore}>{entry.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Recent Photos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Photos</Text>
          <TouchableOpacity onPress={() => setShowGallery(true)}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
          {woundPhotos.slice(0, 5).map((photo) => (
            <TouchableOpacity 
              key={photo.id} 
              style={styles.photoThumbnail}
              onPress={() => openPhotoDetail(photo)}
            >
              <Image source={{ uri: photo.uri }} style={styles.thumbnailImage} />
              <View style={styles.thumbnailOverlay}>
                <Text style={styles.thumbnailScore}>{photo.score.toFixed(1)}</Text>
                <Text style={styles.thumbnailDate}>
                  {new Date(photo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <View style={styles.tipCard}>
          <TrendingUp color={colors.primary} size={24} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Photography Best Practices</Text>
            <Text style={styles.tipText}>
              • Use natural lighting when possible{'\n'}
              • Keep the wound in sharp focus{'\n'}
              • Maintain consistent distance and angle{'\n'}
              • Clean the area gently before photographing{'\n'}
              • Take photos at the same time each day
            </Text>
          </View>
        </View>
      </View>

      {/* Photo Detail Modal */}
      <Modal
        visible={selectedPhoto !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Wound Analysis</Text>
                <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
                  <X color={colors.textSecondary} size={24} />
                </TouchableOpacity>
              </View>
              
              <Image source={{ uri: selectedPhoto.uri }} style={styles.modalImage} />
              
              <View style={styles.modalDetails}>
                <View style={styles.modalScoreRow}>
                  <Text style={styles.modalScore}>{selectedPhoto.score.toFixed(1)}</Text>
                  <Text style={styles.modalScoreMax}>/10</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: selectedPhoto.color }]}>
                    <Text style={styles.modalStatusText}>{selectedPhoto.status}</Text>
                  </View>
                </View>
                
                <Text style={styles.modalDate}>
                  {new Date(selectedPhoto.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
                
                <Text style={styles.modalAnalysis}>{selectedPhoto.analysis}</Text>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.modalActionButton}>
                    <Share color={colors.info} size={20} />
                    <Text style={styles.modalActionText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalActionButton}>
                    <Download color={colors.info} size={20} />
                    <Text style={styles.modalActionText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>

      {/* Gallery Modal */}
      <Modal
        visible={showGallery}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGallery(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.galleryModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Photo Gallery</Text>
              <TouchableOpacity onPress={() => setShowGallery(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.galleryGrid}>
              <View style={styles.gridContainer}>
                {woundPhotos.map((photo) => (
                  <TouchableOpacity 
                    key={photo.id} 
                    style={styles.gridItem}
                    onPress={() => {
                      setShowGallery(false);
                      openPhotoDetail(photo);
                    }}
                  >
                    <Image source={{ uri: photo.uri }} style={styles.gridImage} />
                    <View style={styles.gridOverlay}>
                      <Text style={styles.gridScore}>{photo.score.toFixed(1)}</Text>
                      <Text style={styles.gridDate}>
                        {new Date(photo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  analysisStatus: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.warning + '20',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning + '40',
  },
  analysisIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.warning,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 16,
    color: colors.info,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryActionCard: {
    flex: 2,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  actionGradient: {
    padding: 24,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  actionCardSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
  },
  secondaryActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  secondaryActionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
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
  progressChart: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  barFill: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  barScore: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  photosScroll: {
    paddingLeft: 0,
  },
  photoThumbnail: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 6,
    alignItems: 'center',
  },
  thumbnailScore: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  thumbnailDate: {
    color: '#ffffff',
    fontSize: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalDetails: {
    padding: 20,
  },
  modalScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.success,
  },
  modalScoreMax: {
    fontSize: 24,
    color: colors.textSecondary,
    marginLeft: 4,
    marginRight: 16,
  },
  modalStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalStatusText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDate: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  modalAnalysis: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalActionText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.info,
    fontWeight: '600',
  },
  galleryModal: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  galleryGrid: {
    flex: 1,
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 120,
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    alignItems: 'center',
  },
  gridScore: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gridDate: {
    color: '#ffffff',
    fontSize: 12,
  },
});
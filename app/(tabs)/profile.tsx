import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Shield, CircleHelp as HelpCircle, Calendar, Pill, Camera, CreditCard as Edit3, ChevronRight, Trash2, Save, X, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileTab() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPhotoStorageModal, setShowPhotoStorageModal] = useState(false);
  const [showAppSettingsModal, setShowAppSettingsModal] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: 'Sarah Johnson',
    surgeryType: 'Knee Replacement',
    surgeryDate: '2024-01-08',
    surgeon: 'Dr. Michael Smith',
    hospital: 'Central Medical Center',
  });

  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const settingsOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Medication & appointment reminders',
      type: 'switch',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: Shield,
      title: 'Biometric Login',
      subtitle: 'Use fingerprint or face ID',
      type: 'switch',
      value: biometrics,
      onToggle: setBiometrics,
    },
    {
      icon: Camera,
      title: 'Photo Storage',
      subtitle: 'Manage wound progress photos',
      type: 'navigation',
      onPress: () => setShowPhotoStorageModal(true),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'FAQs and contact support',
      type: 'navigation',
      onPress: () => setShowHelpModal(true),
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Language, theme, and more',
      type: 'navigation',
      onPress: () => setShowAppSettingsModal(true),
    },
  ];

  const medicalHistory = [
    { type: 'Surgery', details: 'Knee Replacement', date: '2024-01-08' },
    { type: 'Medication', details: 'Prescribed pain management', date: '2024-01-08' },
    { type: 'Follow-up', details: 'First post-op appointment', date: '2024-01-16' },
  ];

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Profile Deleted',
      'Your profile has been deleted. You can create a new one anytime.',
      [{ text: 'OK' }]
    );
    setShowDeleteConfirm(false);
  };

  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#4a148c', '#6a1b9a'] : ['#7b1fa2', '#9c27b0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <User color="#ffffff" size={32} />
          </View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userSubtitle}>Recovering Strong</Text>
        </View>
      </LinearGradient>

      {/* Recovery Info */}
      <View style={styles.section}>
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Calendar color={colors.secondary} size={24} />
            <Text style={styles.infoTitle}>Recovery Information</Text>
            <View style={styles.headerButtons}>
              {isEditing ? (
                <>
                  <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
                    <X color={colors.textSecondary} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                    <Save color={colors.success} size={20} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setIsEditing(true)}
                  >
                    <Edit3 color={colors.textSecondary} size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 color={colors.error} size={20} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempUserInfo.name}
                  onChangeText={(text) => setTempUserInfo({...tempUserInfo, name: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.name}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Surgery Type:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempUserInfo.surgeryType}
                  onChangeText={(text) => setTempUserInfo({...tempUserInfo, surgeryType: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.surgeryType}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Surgery Date:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempUserInfo.surgeryDate}
                  onChangeText={(text) => setTempUserInfo({...tempUserInfo, surgeryDate: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{new Date(userInfo.surgeryDate).toLocaleDateString()}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Surgeon:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempUserInfo.surgeon}
                  onChangeText={(text) => setTempUserInfo({...tempUserInfo, surgeon: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.surgeon}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hospital:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempUserInfo.hospital}
                  onChangeText={(text) => setTempUserInfo({...tempUserInfo, hospital: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.hospital}</Text>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Medical History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical History</Text>
        <View style={styles.historyContainer}>
          {medicalHistory.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Pill color={colors.info} size={16} />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyType}>{item.type}</Text>
                <Text style={styles.historyDetails}>{item.details}</Text>
                <Text style={styles.historyDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              onPress={option.type === 'navigation' ? option.onPress : undefined}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <option.icon color={colors.textSecondary} size={20} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              
              <View style={styles.settingRight}>
                {option.type === 'switch' ? (
                  <Switch
                    value={option.value}
                    onValueChange={option.onToggle}
                    trackColor={{ false: colors.border, true: colors.secondary }}
                    thumbColor={option.value ? '#ffffff' : '#ffffff'}
                  />
                ) : (
                  <ChevronRight color={colors.border} size={20} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfoCard}>
          <Text style={styles.appInfoTitle}>RecoveryTracker AI</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoDescription}>
            Your trusted companion for post-surgical recovery, powered by artificial intelligence to help you heal better and faster.
          </Text>
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Profile</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete your profile? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeleteProfile}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Help & Support</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>How do I take a wound photo?</Text>
                <Text style={styles.faqAnswer}>Go to the Wound tab and tap "Take Wound Photo". Make sure you have good lighting and the wound is clearly visible.</Text>
              </View>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>What should I do if I have severe pain?</Text>
                <Text style={styles.faqAnswer}>Contact your healthcare provider immediately. You can also use the Symptoms tab to report your pain level.</Text>
              </View>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>How accurate is the AI analysis?</Text>
                <Text style={styles.faqAnswer}>Our AI is trained on medical data but should not replace professional medical advice. Always consult your doctor for serious concerns.</Text>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Contact Support</Text>
                <Text style={styles.contactInfo}>Email: support@recoverytracker.com</Text>
                <Text style={styles.contactInfo}>Phone: 1-800-RECOVERY</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Photo Storage Modal */}
      <Modal
        visible={showPhotoStorageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPhotoStorageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Photo Storage</Text>
              <TouchableOpacity onPress={() => setShowPhotoStorageModal(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.storageInfo}>
                <Text style={styles.storageTitle}>Storage Usage</Text>
                <Text style={styles.storageText}>Photos stored: 12</Text>
                <Text style={styles.storageText}>Storage used: 2.4 MB</Text>
                <Text style={styles.storageText}>Available: 97.6 MB</Text>
              </View>
              <TouchableOpacity style={styles.storageButton}>
                <Text style={styles.storageButtonText}>View All Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.storageButton}>
                <Text style={styles.storageButtonText}>Export Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.storageButton, styles.dangerButton]}>
                <Text style={styles.dangerButtonText}>Clear All Photos</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* App Settings Modal */}
      <Modal
        visible={showAppSettingsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAppSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.fullModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>App Settings</Text>
              <TouchableOpacity onPress={() => setShowAppSettingsModal(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.settingGroup}>
                <Text style={styles.settingGroupTitle}>Appearance</Text>
                <TouchableOpacity style={styles.settingOption} onPress={toggleTheme}>
                  <View style={styles.settingOptionLeft}>
                    {isDarkMode ? (
                      <Moon color={colors.text} size={20} />
                    ) : (
                      <Sun color={colors.text} size={20} />
                    )}
                    <Text style={styles.settingOptionText}>Theme</Text>
                  </View>
                  <Text style={styles.settingOptionValue}>
                    {isDarkMode ? 'Dark' : 'Light'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption}>
                  <View style={styles.settingOptionLeft}>
                    <Text style={styles.settingOptionText}>Language</Text>
                  </View>
                  <Text style={styles.settingOptionValue}>English</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.settingGroup}>
                <Text style={styles.settingGroupTitle}>Data & Privacy</Text>
                <TouchableOpacity style={styles.settingOption}>
                  <Text style={styles.settingOptionText}>Data Export</Text>
                  <ChevronRight color={colors.border} size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingOption}>
                  <Text style={styles.settingOptionText}>Privacy Policy</Text>
                  <ChevronRight color={colors.border} size={16} />
                </TouchableOpacity>
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  userSubtitle: {
    fontSize: 16,
    color: '#e1bee7',
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
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  infoContent: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  infoInput: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    paddingVertical: 4,
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
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  settingsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  settingRight: {
    marginLeft: 16,
  },
  appInfoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  appInfoVersion: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  appInfoDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  fullModalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  faqItem: {
    marginBottom: 24,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  storageInfo: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  storageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  storageText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  storageButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  storageButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  dangerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  settingGroup: {
    marginBottom: 32,
  },
  settingGroupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  settingOptionValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Calendar, User, Stethoscope, Building2, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface UserData {
  name: string;
  surgeryType: string;
  surgeryDate: string;
  surgeon: string;
  hospital: string;
}

export default function OnboardingScreen() {
  const { isDarkMode, colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surgeryType: '',
    surgeryDate: '',
    surgeon: '',
    hospital: '',
  });

  const steps = [
    {
      title: 'Welcome to RecoveryTracker',
      subtitle: 'Let\'s set up your recovery journey',
      icon: User,
      fields: [
        { key: 'name', label: 'Your Name', placeholder: 'Enter your full name' }
      ]
    },
    {
      title: 'Surgery Information',
      subtitle: 'Tell us about your procedure',
      icon: Stethoscope,
      fields: [
        { key: 'surgeryType', label: 'Surgery Type', placeholder: 'e.g., Knee Replacement, Appendectomy' },
        { key: 'surgeryDate', label: 'Surgery Date', placeholder: 'YYYY-MM-DD' }
      ]
    },
    {
      title: 'Medical Team',
      subtitle: 'Your healthcare providers',
      icon: Building2,
      fields: [
        { key: 'surgeon', label: 'Surgeon Name', placeholder: 'Dr. Smith' },
        { key: 'hospital', label: 'Hospital/Clinic', placeholder: 'Central Medical Center' }
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  const handleNext = () => {
    // Validate current step
    const requiredFields = currentStepData.fields.map(field => field.key);
    const missingFields = requiredFields.filter(field => !userData[field as keyof UserData].trim());
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Here you would typically save the user data to your storage/database
    console.log('User data:', userData);
    
    Alert.alert(
      'Setup Complete!',
      'Your recovery journey starts now. Let\'s help you heal better and faster.',
      [
        {
          text: 'Get Started',
          onPress: () => router.replace('/(tabs)'),
        }
      ]
    );
  };

  const updateUserData = (key: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#4db6ac', '#26a69a'] : ['#00695c', '#00897b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.iconContainer}>
          <IconComponent color="#ffffff" size={32} />
        </View>
        <Text style={styles.headerTitle}>{currentStepData.title}</Text>
        <Text style={styles.headerSubtitle}>{currentStepData.subtitle}</Text>
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>
      </LinearGradient>

      {/* Form */}
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          {currentStepData.fields.map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.label}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textSecondary}
                value={userData[field.key as keyof UserData]}
                onChangeText={(value) => updateUserData(field.key as keyof UserData, value)}
              />
            </View>
          ))}

          {/* Step-specific content */}
          {currentStep === 0 && (
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeText}>
                RecoveryTracker uses AI to monitor your healing progress, track symptoms, and provide personalized guidance throughout your recovery journey.
              </Text>
            </View>
          )}

          {currentStep === 1 && (
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>
                This information helps us create a personalized recovery plan tailored to your specific procedure and timeline.
              </Text>
            </View>
          )}

          {currentStep === 2 && (
            <View style={styles.infoContent}>
              <Text style={styles.infoText}>
                We'll use this information to provide relevant guidance and help you communicate effectively with your healthcare team.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft color={colors.textSecondary} size={20} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </Text>
          <ArrowRight color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0f2f1',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressDotActive: {
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  welcomeContent: {
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.primary,
    lineHeight: 24,
    textAlign: 'center',
  },
  infoContent: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.info + '10',
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.info,
    lineHeight: 20,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 8,
  },
});
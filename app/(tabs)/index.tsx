import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Bell, Calendar, Camera, TrendingUp, Heart, Clock, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, MessageCircle, Plus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeTab() {
  const { isDarkMode, colors } = useTheme();
  const [daysSinceSurgery, setDaysSinceSurgery] = useState(7);
  const [healingScore, setHealingScore] = useState(8.2);
  const [nextAppointment, setNextAppointment] = useState('Tomorrow at 2:00 PM');
  const [isNewUser, setIsNewUser] = useState(false); // This would come from your user state

  const quickActions = [
    {
      icon: Camera,
      title: 'Photo Check',
      subtitle: 'Upload wound photo',
      color: '#4fc3f7',
      action: () => router.push('/(tabs)/wound-tracker'),
    },
    {
      icon: MessageCircle,
      title: 'Log Symptoms',
      subtitle: 'Quick assessment',
      color: '#81c784',
      action: () => router.push('/(tabs)/symptoms'),
    },
    {
      icon: Calendar,
      title: 'View Plan',
      subtitle: 'Recovery timeline',
      color: '#ffb74d',
      action: () => router.push('/(tabs)/recovery'),
    },
  ];

  const todaysTasks = [
    { task: 'Take morning medication', completed: true },
    { task: 'Upload wound photo', completed: false },
    { task: 'Light walking (10 minutes)', completed: false },
    { task: 'Apply wound dressing', completed: true },
  ];

  const handleSetupProfile = () => {
    router.push('/onboarding');
  };

  const styles = createStyles(colors, isDarkMode);

  // Show setup prompt for new users
  if (isNewUser) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={isDarkMode ? ['#4db6ac', '#26a69a'] : ['#00695c', '00897b']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.setupContainer}
        >
          <View style={styles.setupContent}>
            <View style={styles.setupIcon}>
              <Plus color="#ffffff" size={32} />
            </View>
            <Text style={styles.setupTitle}>Welcome to RecoveryTracker!</Text>
            <Text style={styles.setupSubtitle}>
              Let's set up your profile to start tracking your recovery journey
            </Text>
            <TouchableOpacity style={styles.setupButton} onPress={handleSetupProfile}>
              <Text style={styles.setupButtonText}>Set Up Profile</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with gradient */}
      <LinearGradient
        colors={isDarkMode ? ['#4db6ac', '#26a69a'] : ['#00695c', '#00897b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning, Sarah!</Text>
          <Text style={styles.subtitle}>Day {daysSinceSurgery} of Recovery</Text>
          
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Heart color={colors.primary} size={24} />
              <Text style={styles.progressTitle}>Healing Progress</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.healingScore}>{healingScore}</Text>
              <Text style={styles.scoreMax}>/10</Text>
            </View>
            <Text style={styles.scoreLabel}>Excellent Recovery!</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.action}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <action.icon color="#ffffff" size={24} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Today's Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.tasksContainer}>
          {todaysTasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <View style={styles.taskContent}>
                {task.completed ? (
                  <CheckCircle2 color={colors.success} size={20} />
                ) : (
                  <View style={styles.taskCircle} />
                )}
                <Text style={[styles.taskText, task.completed && styles.completedTask]}>
                  {task.task}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <Clock color={colors.warning} size={20} />
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Next Appointment</Text>
            <Text style={styles.reminderSubtitle}>{nextAppointment}</Text>
          </View>
        </View>
        
        <View style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <Bell color={colors.info} size={20} />
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>Medication Reminder</Text>
            <Text style={styles.reminderSubtitle}>Pain medication in 2 hours</Text>
          </View>
        </View>
      </View>

      {/* Recovery Tip */}
      <View style={styles.section}>
        <View style={styles.tipCard}>
          <TrendingUp color={colors.primary} size={24} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Recovery Tip</Text>
            <Text style={styles.tipText}>
              Keep your incision clean and dry. Gentle walking helps improve circulation and speeds healing.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  setupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  setupContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 40,
    width: '100%',
    maxWidth: 350,
  },
  setupIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  setupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  setupSubtitle: {
    fontSize: 16,
    color: '#e0f2f1',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  setupButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f2f1',
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    width: width - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  healingScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  scoreMax: {
    fontSize: 24,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.success,
    fontWeight: '600',
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
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tasksContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskItem: {
    marginBottom: 16,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  taskText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tipCard: {
    backgroundColor: isDarkMode ? 'rgba(77, 182, 172, 0.1)' : '#e8f5e8',
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
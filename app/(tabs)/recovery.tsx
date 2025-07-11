import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CircleCheck as CheckCircle2, Clock, Target, TrendingUp, Activity, Heart, Pill, Plus, X, CreditCard as Edit3 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface RecoveryTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  important: boolean;
  category: 'medication' | 'exercise' | 'care' | 'appointment';
  time?: string;
}

interface DayPlan {
  day: number;
  date: string;
  tasks: RecoveryTask[];
  milestone?: string;
}

export default function RecoveryTab() {
  const { isDarkMode, colors } = useTheme();
  const [currentDay, setCurrentDay] = useState(7);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'care' as RecoveryTask['category'],
    time: '',
  });
  
  const [recoveryPlans, setRecoveryPlans] = useState<DayPlan[]>([
    {
      day: 7,
      date: 'Today',
      tasks: [
        {
          id: '1',
          title: 'Morning Medication',
          description: 'Take pain medication with food',
          completed: true,
          important: true,
          category: 'medication',
          time: '8:00 AM',
        },
        {
          id: '2',
          title: 'Wound Care',
          description: 'Clean and redress incision site',
          completed: false,
          important: true,
          category: 'care',
          time: '10:00 AM',
        },
        {
          id: '3',
          title: 'Light Walking',
          description: '10 minutes of gentle walking',
          completed: false,
          important: false,
          category: 'exercise',
          time: '2:00 PM',
        },
        {
          id: '4',
          title: 'Photo Documentation',
          description: 'Take wound progress photo',
          completed: false,
          important: false,
          category: 'care',
          time: '6:00 PM',
        },
      ],
    },
    {
      day: 8,
      date: 'Tomorrow',
      tasks: [
        {
          id: '5',
          title: 'Doctor Appointment',
          description: 'Follow-up visit at 2:00 PM',
          completed: false,
          important: true,
          category: 'appointment',
          time: '2:00 PM',
        },
        {
          id: '6',
          title: 'Medication Review',
          description: 'Discuss pain management with doctor',
          completed: false,
          important: true,
          category: 'medication',
          time: '2:30 PM',
        },
      ],
      milestone: 'First Follow-up Appointment',
    },
    {
      day: 14,
      date: 'Jan 22',
      tasks: [
        {
          id: '7',
          title: 'Stitch Removal',
          description: 'Schedule with healthcare provider',
          completed: false,
          important: true,
          category: 'appointment',
          time: '10:00 AM',
        },
      ],
      milestone: 'Stitch Removal Day',
    },
  ]);

  const toggleTask = (dayIndex: number, taskId: string) => {
    setRecoveryPlans(prev =>
      prev.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              tasks: day.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : day
      )
    );
  };

  const addNewTask = () => {
    if (!newTask.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const task: RecoveryTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      important: false,
      category: newTask.category,
      time: newTask.time,
    };

    setRecoveryPlans(prev =>
      prev.map((day, index) =>
        index === 0 // Add to today
          ? { ...day, tasks: [...day.tasks, task] }
          : day
      )
    );

    setNewTask({ title: '', description: '', category: 'care', time: '' });
    setShowAddTask(false);
  };

  const getCategoryIcon = (category: RecoveryTask['category']) => {
    switch (category) {
      case 'medication':
        return Pill;
      case 'exercise':
        return Activity;
      case 'care':
        return Heart;
      case 'appointment':
        return Calendar;
      default:
        return Clock;
    }
  };

  const getCategoryColor = (category: RecoveryTask['category']) => {
    switch (category) {
      case 'medication':
        return colors.info;
      case 'exercise':
        return colors.success;
      case 'care':
        return colors.warning;
      case 'appointment':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  const completedTasks = recoveryPlans[0]?.tasks.filter(task => task.completed).length || 0;
  const totalTasks = recoveryPlans[0]?.tasks.length || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const weeklyStats = {
    tasksCompleted: 28,
    totalTasks: 35,
    streak: 5,
    weeklyGoal: 80,
  };

  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#ffb74d', '#ff9800'] : ['#ff9800', '#ffb74d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Calendar color="#ffffff" size={32} />
        <Text style={styles.headerTitle}>Recovery Plan</Text>
        <Text style={styles.headerSubtitle}>Day {currentDay} of your journey</Text>
      </LinearGradient>

      {/* Weekly Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{weeklyStats.tasksCompleted}</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
          <Text style={styles.statSubtext}>This Week</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{weeklyStats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
          <Text style={styles.statSubtext}>Keep Going!</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{Math.round((weeklyStats.tasksCompleted / weeklyStats.totalTasks) * 100)}%</Text>
          <Text style={styles.statLabel}>Weekly Goal</Text>
          <Text style={styles.statSubtext}>Target: {weeklyStats.weeklyGoal}%</Text>
        </View>
      </View>

      {/* Progress Overview */}
      <View style={styles.section}>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Target color={colors.warning} size={24} />
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <TouchableOpacity 
              style={styles.addTaskButton}
              onPress={() => setShowAddTask(true)}
            >
              <Plus color={colors.primary} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.progressStats}>
            <Text style={styles.progressText}>
              {completedTasks} of {totalTasks} tasks completed
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>
      </View>

      {/* Recovery Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recovery Timeline</Text>
        {recoveryPlans.map((dayPlan, dayIndex) => (
          <View key={dayPlan.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <View style={styles.dayInfo}>
                <Text style={styles.dayNumber}>Day {dayPlan.day}</Text>
                <Text style={styles.dayDate}>{dayPlan.date}</Text>
              </View>
              {dayPlan.milestone && (
                <View style={styles.milestoneContainer}>
                  <TrendingUp color={colors.warning} size={16} />
                  <Text style={styles.milestoneText}>{dayPlan.milestone}</Text>
                </View>
              )}
            </View>

            <View style={styles.tasksContainer}>
              {dayPlan.tasks.map((task, taskIndex) => {
                const IconComponent = getCategoryIcon(task.category);
                const categoryColor = getCategoryColor(task.category);
                
                return (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
                    onPress={() => toggleTask(dayIndex, task.id)}
                  >
                    <View style={styles.taskLeft}>
                      <View style={styles.taskCheck}>
                        {task.completed ? (
                          <CheckCircle2 color={colors.success} size={20} />
                        ) : (
                          <View style={styles.uncheckedCircle} />
                        )}
                      </View>
                      <View style={[styles.taskIcon, { backgroundColor: categoryColor }]}>
                        <IconComponent color="#ffffff" size={16} />
                      </View>
                    </View>
                    
                    <View style={styles.taskContent}>
                      <View style={styles.taskTitleRow}>
                        <Text style={[styles.taskTitle, task.completed && styles.completedTaskTitle]}>
                          {task.title}
                        </Text>
                        {task.important && (
                          <View style={styles.importantBadge}>
                            <Text style={styles.importantText}>!</Text>
                          </View>
                        )}
                      </View>
                      <Text style={[styles.taskDescription, task.completed && styles.completedTaskDescription]}>
                        {task.description}
                      </Text>
                      {task.time && (
                        <Text style={styles.taskTime}>{task.time}</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      {/* Recovery Tips */}
      <View style={styles.section}>
        <View style={styles.tipCard}>
          <Heart color={colors.error} size={24} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Recovery Reminder</Text>
            <Text style={styles.tipText}>
              Every small step counts! Your body is healing, and following your recovery plan consistently will help ensure the best outcome.
            </Text>
          </View>
        </View>
      </View>

      {/* Add Task Modal */}
      <Modal
        visible={showAddTask}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddTask(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TouchableOpacity onPress={() => setShowAddTask(false)}>
                <X color={colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Task Title</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter task title"
                  placeholderTextColor={colors.textSecondary}
                  value={newTask.title}
                  onChangeText={(text) => setNewTask(prev => ({ ...prev, title: text }))}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Enter task description"
                  placeholderTextColor={colors.textSecondary}
                  value={newTask.description}
                  onChangeText={(text) => setNewTask(prev => ({ ...prev, description: text }))}
                  multiline
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Time (Optional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., 2:00 PM"
                  placeholderTextColor={colors.textSecondary}
                  value={newTask.time}
                  onChangeText={(text) => setNewTask(prev => ({ ...prev, time: text }))}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categoryButtons}>
                  {(['medication', 'exercise', 'care', 'appointment'] as const).map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryButton,
                        newTask.category === category && styles.selectedCategory,
                        { borderColor: getCategoryColor(category) }
                      ]}
                      onPress={() => setNewTask(prev => ({ ...prev, category }))}
                    >
                      <Text style={[
                        styles.categoryText,
                        newTask.category === category && styles.selectedCategoryText,
                        { color: getCategoryColor(category) }
                      ]}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddTask(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addNewTask}
              >
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff3e0',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
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
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  addTaskButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStats: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.warning,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.warning,
  },
  dayCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 12,
  },
  dayDate: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  milestoneText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warning,
    marginLeft: 4,
  },
  tasksContainer: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  taskCheck: {
    marginRight: 8,
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  taskIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  importantBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  importantText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  completedTaskDescription: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  taskTime: {
    fontSize: 12,
    color: colors.info,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: colors.error + '10',
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
    color: colors.error,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: colors.text,
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
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.background,
  },
  selectedCategory: {
    backgroundColor: colors.primary + '20',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
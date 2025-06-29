import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Thermometer, Zap, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Send, Bot, User, Mic, Image as ImageIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

export default function SymptomsTab() {
  const { isDarkMode, colors } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm here to help track your symptoms and provide guidance. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['I feel good', 'I have some pain', 'I have concerns'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [isTyping, setIsTyping] = useState(false);

  const quickSymptoms = [
    { text: 'Pain Level 1-10', icon: Zap, color: colors.warning },
    { text: 'Fever/Temperature', icon: Thermometer, color: colors.error },
    { text: 'Swelling', icon: AlertTriangle, color: '#ff5722' },
    { text: 'No Issues Today', icon: CheckCircle, color: colors.success },
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const response = generateBotResponse(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        severity: response.severity,
        suggestions: response.suggestions,
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (response.severity === 'high') {
        setRiskLevel('high');
        Alert.alert(
          'High Risk Detected',
          'Based on your symptoms, please contact your healthcare provider immediately.',
          [{ text: 'OK' }]
        );
      } else if (response.severity === 'medium') {
        setRiskLevel('medium');
      }
    }, 1500);
  };

  const generateBotResponse = (userText: string): { 
    text: string; 
    severity?: 'low' | 'medium' | 'high';
    suggestions?: string[];
  } => {
    const text = userText.toLowerCase();
    
    if (text.includes('fever') && (text.includes('high') || text.includes('101') || text.includes('102'))) {
      return {
        text: "High fever can be a sign of infection. Please contact your doctor immediately and consider going to the ER if fever exceeds 101°F. Monitor your temperature closely.",
        severity: 'high',
        suggestions: ['Call doctor now', 'Go to ER', 'Take temperature again']
      };
    }
    
    if (text.includes('pain') && (text.includes('severe') || text.includes('10') || text.includes('9'))) {
      return {
        text: "Severe pain isn't normal during recovery. Please contact your healthcare provider. In the meantime, take your prescribed pain medication as directed and try gentle positioning.",
        severity: 'medium',
        suggestions: ['Contact doctor', 'Take medication', 'Rest and elevate']
      };
    }
    
    if (text.includes('swelling') && text.includes('increased')) {
      return {
        text: "Increased swelling could indicate complications. Monitor closely and contact your doctor if it worsens. Apply ice for 15-20 minutes at a time and elevate the area.",
        severity: 'medium',
        suggestions: ['Apply ice', 'Elevate area', 'Monitor closely']
      };
    }
    
    if (text.includes('drainage') || text.includes('pus') || text.includes('discharge')) {
      return {
        text: "Any unusual drainage should be evaluated by your healthcare provider immediately. This could be a sign of infection. Take a photo if possible and contact your doctor.",
        severity: 'high',
        suggestions: ['Take photo', 'Call doctor', 'Keep area clean']
      };
    }
    
    if (text.includes('good') || text.includes('better') || text.includes('fine')) {
      return {
        text: "That's wonderful to hear! Continue following your recovery plan. Remember to take your medications as prescribed and keep up with your wound care routine.",
        severity: 'low',
        suggestions: ['Continue routine', 'Stay hydrated', 'Light exercise']
      };
    }

    if (text.includes('nausea') || text.includes('vomiting')) {
      return {
        text: "Nausea can be a side effect of pain medication or anesthesia. Try eating small, bland meals and stay hydrated. If vomiting persists, contact your doctor.",
        severity: 'medium',
        suggestions: ['Eat bland foods', 'Stay hydrated', 'Contact doctor if severe']
      };
    }
    
    return {
      text: "Thanks for the update. Can you be more specific about your symptoms? For example, rate your pain from 1-10, describe any changes you've noticed, or tell me about your energy levels.",
      severity: 'low',
      suggestions: ['Rate pain 1-10', 'Describe changes', 'Energy levels']
    };
  };

  const handleQuickSymptom = (symptom: string) => {
    sendMessage(symptom);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const getRiskStyle = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return { 
          backgroundColor: isDarkMode ? 'rgba(239, 83, 80, 0.1)' : '#ffebee',
          borderColor: colors.error,
        };
      case 'medium':
        return { 
          backgroundColor: isDarkMode ? 'rgba(255, 183, 77, 0.1)' : '#fff3e0',
          borderColor: colors.warning,
        };
      default:
        return { 
          backgroundColor: isDarkMode ? 'rgba(102, 187, 106, 0.1)' : '#e8f5e8',
          borderColor: colors.success,
        };
    }
  };

  const styles = createStyles(colors);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#66bb6a', '#4caf50'] : ['#81c784', '#4caf50']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <MessageCircle color="#ffffff" size={24} />
        <Text style={styles.headerTitle}>AI Health Assistant</Text>
        <Text style={styles.headerSubtitle}>Smart symptom tracking & guidance</Text>
      </LinearGradient>

      {/* Risk Level Indicator */}
      <View style={[styles.riskIndicator, getRiskStyle(riskLevel)]}>
        <View style={styles.riskContent}>
          <Text style={[styles.riskText, { color: colors.text }]}>
            Risk Level: {riskLevel.toUpperCase()}
          </Text>
          {riskLevel === 'high' && (
            <Text style={styles.riskSubtext}>Contact your doctor immediately</Text>
          )}
          {riskLevel === 'medium' && (
            <Text style={styles.riskSubtext}>Monitor symptoms closely</Text>
          )}
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.chatContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((message) => (
          <View key={message.id}>
            <View
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              <View style={styles.messageHeader}>
                {message.isBot ? (
                  <Bot color={colors.success} size={16} />
                ) : (
                  <User color={colors.info} size={16} />
                )}
                <Text style={styles.messageSender}>
                  {message.isBot ? 'AI Assistant' : 'You'}
                </Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            
            {/* Suggestions */}
            {message.suggestions && (
              <View style={styles.suggestionsContainer}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => handleSuggestion(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={styles.messageHeader}>
              <Bot color={colors.success} size={16} />
              <Text style={styles.messageSender}>AI Assistant</Text>
            </View>
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
              <View style={styles.typingDot} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Symptoms */}
      <View style={styles.quickSymptomsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickSymptoms}
          contentContainerStyle={styles.quickSymptomsContent}
        >
          {quickSymptoms.map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickSymptomButton, { borderColor: symptom.color }]}
              onPress={() => handleQuickSymptom(symptom.text)}
            >
              <symptom.icon color={symptom.color} size={16} />
              <Text style={[styles.quickSymptomText, { color: symptom.color }]}>
                {symptom.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Describe your symptoms..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Mic color={colors.textSecondary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <ImageIcon color={colors.textSecondary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendMessage(inputText)}
            >
              <Send color="#ffffff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e8f5e8',
  },
  riskIndicator: {
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  riskContent: {
    alignItems: 'center',
  },
  riskText: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatContent: {
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    maxWidth: '85%',
  },
  botMessage: {
    backgroundColor: colors.card,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessage: {
    backgroundColor: colors.info + '20',
    alignSelf: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  messageTime: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    paddingLeft: 12,
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  suggestionText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
  },
  quickSymptomsContainer: {
    paddingVertical: 12,
  },
  quickSymptoms: {
    paddingHorizontal: 20,
  },
  quickSymptomsContent: {
    paddingRight: 20,
  },
  quickSymptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    marginRight: 10,
  },
  quickSymptomText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  inputContainer: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 80,
    marginRight: 10,
    backgroundColor: colors.background,
    color: colors.text,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
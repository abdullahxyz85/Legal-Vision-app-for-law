import { useState, useCallback, useEffect } from 'react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  structured_response?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const CONVERSATIONS_STORAGE_KEY = 'legal-vision-conversations';
const CURRENT_CONVERSATION_STORAGE_KEY = 'legal-vision-current-conversation';

export const useChat = (userEmail?: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  // Generate user-specific storage keys
  const getUserStorageKey = useCallback((key: string) => userEmail ? `${key}-${userEmail}` : key, [userEmail]);

  // Helper function to convert stored conversation data back to proper types
  const convertStoredConversation = (conv: Conversation): Conversation => {
    const messagesWithDates = conv.messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
    return {
      ...conv,
      lastMessage: new Date(conv.lastMessage),
      messages: messagesWithDates
    };
  };

  // Initialize conversations from localStorage
  useEffect(() => {
    const initializeChat = () => {
      try {
        // Only initialize if we have a user email
        if (!userEmail) {
          setIsInitialized(true);
          return;
        }

        const userConversationsKey = getUserStorageKey(CONVERSATIONS_STORAGE_KEY);
        const userCurrentConversationKey = getUserStorageKey(CURRENT_CONVERSATION_STORAGE_KEY);

        // Load conversations for this specific user
        const savedConversations = localStorage.getItem(userConversationsKey);
        if (savedConversations) {
          const parsedConversations = JSON.parse(savedConversations) as Conversation[];
          const conversationsWithDates = parsedConversations.map(convertStoredConversation);
          setConversations(conversationsWithDates);
        }

        // Load current conversation ID for this user
        const savedCurrentId = localStorage.getItem(userCurrentConversationKey);
        if (savedCurrentId) {
          setCurrentConversationId(savedCurrentId);
        }
      } catch (error) {
        console.error('Error loading conversations from localStorage:', error);
        // Clear corrupted data for this user
        if (userEmail) {
          localStorage.removeItem(getUserStorageKey(CONVERSATIONS_STORAGE_KEY));
          localStorage.removeItem(getUserStorageKey(CURRENT_CONVERSATION_STORAGE_KEY));
        }
      }
      setIsInitialized(true);
    };

    initializeChat();
  }, [userEmail, getUserStorageKey]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && userEmail) {
      const userConversationsKey = getUserStorageKey(CONVERSATIONS_STORAGE_KEY);
      localStorage.setItem(userConversationsKey, JSON.stringify(conversations));
    }
  }, [conversations, isInitialized, userEmail, getUserStorageKey]);

  // Save current conversation ID whenever it changes
  useEffect(() => {
    if (isInitialized && userEmail) {
      const userCurrentConversationKey = getUserStorageKey(CURRENT_CONVERSATION_STORAGE_KEY);
      if (currentConversationId) {
        localStorage.setItem(userCurrentConversationKey, currentConversationId);
      } else {
        localStorage.removeItem(userCurrentConversationKey);
      }
    }
  }, [currentConversationId, isInitialized, userEmail, getUserStorageKey]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const generateResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Simulate AI response with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      // Text-only responses
      {
        type: 'text',
        content: "I understand your question. Let me provide you with a comprehensive answer based on the information available."
      },
      {
        type: 'text',
        content: "That's an interesting point. Here's what I can tell you about that topic."
      },
      {
        type: 'text',
        content: "Great question! Let me break this down for you in a way that's easy to understand."
      },
      // Structured responses
      {
        type: 'structured',
        content: "hi how i can assist ",
        structured_response: {
          response: {
            answer: {
              title: "✅ Answer",
              value: "NO - This violates California Civil Code Section 1947.12"
            },
            next_steps: {
              title: "📋 Next Steps",
              value: "File complaint with local rent control board within 30 days"
            },
            documents: {
              title: "📄 Documents",
              value: "Generate formal objection letter + evidence checklist"
            },
            resources: {
              title: "Resources",
              value: "Report to California Department of Consumer Affairs"
            },
            alternatives: {
              title: "💡 Alternatives",
              value: "Contact landlord first with law citation to resolve amicably"
            }
          }
        }
      },
      {
        type: 'structured',
        content: "Based on your query, here's a detailed analysis:",
        structured_response: {
          response: {
            answer: {
              title: "✅ Answer",
              value: "YES - This is legally permissible under current regulations"
            },
            next_steps: {
              title: "📋 Next Steps",
              value: "Submit required documentation within 15 business days"
            },
            documents: {
              title: "📄 Documents",
              value: "Prepare application form, ID verification, and supporting evidence"
            },
            resources: {
              title: "🔗 Resources",
              value: "Contact local regulatory office for additional guidance"
            },
            alternatives: {
              title: "💡 Alternatives",
              value: "Consider consulting with a professional advisor for complex cases"
            }
          }
        }
      },
      {
        type: 'structured',
        content: "Here's my analysis of your situation:",
        structured_response: {
          response: {
            answer: {
              title: "✅ Assessment",
              value: "RECOMMENDED - This approach aligns with best practices"
            },
            next_steps: {
              title: "📋 Action Items",
              value: "Schedule consultation and gather required materials"
            },
            documents: {
              title: "📄 Required Files",
              value: "Collect contracts, receipts, and correspondence records"
            },
            alternatives: {
              title: "💡 Other Options",
              value: "Explore mediation services for faster resolution"
            }
          }
        }
      },
      {
        type: 'structured',
        content: "Let me break down the key points for you:",
        structured_response: {
          response: {
            answer: {
              title: "✅ Status",
              value: "PENDING - Awaiting additional information for final determination"
            },
            next_steps: {
              title: "📋 Immediate Actions",
              value: "Provide missing documentation and follow up within 7 days"
            },
            resources: {
              title: "🔗 Support",
              value: "Access online portal for status updates and additional resources"
            },
            alternatives: {
              title: "💡 Backup Plan",
              value: "Consider alternative filing methods if primary option is unavailable"
            }
          }
        }
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (randomResponse.type === 'text') {
      return `${randomResponse.content}\n\nRegarding "${userMessage}", I should mention that as an AI assistant, I'm designed to be helpful, harmless, and honest. I can assist with a wide variety of tasks including answering questions, helping with analysis, creative writing, coding, and much more.\n\nIs there anything specific about this topic you'd like me to elaborate on or any other way I can help you today?`;
    } else {
      // For structured, return both content and structured_response
      return JSON.stringify({ content: randomResponse.content, structured_response: randomResponse.structured_response });
    }
  }, []);

  const sendMessage = useCallback(async (content: string, file?: File) => {
    if (!content.trim() && !file) return;

    const messageId = generateId();
    const timestamp = new Date();

    // Create new conversation if none exists
    if (!currentConversationId) {
      const conversationId = generateId();
      const newConversation: Conversation = {
        id: conversationId,
        title: content.slice(0, 50) + (content.length > 50 ? '...' : '') || (file ? file.name : 'New conversation'),
        messages: [],
        lastMessage: timestamp,
      };
      
      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversationId(conversationId);
    }

    let fileData;
    if (file) {
      // Create object URL for the file to display it
      const fileUrl = URL.createObjectURL(file);
      fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl
      };
    }

    // Add user message
    const userMessage: Message = {
      id: messageId,
      content,
      role: 'user',
      timestamp,
      file: fileData
    };

    setConversations(prev => prev.map(conv => 
      conv.id === (currentConversationId || prev[0]?.id)
        ? { ...conv, messages: [...conv.messages, userMessage], lastMessage: timestamp }
        : conv
    ));

    setIsLoading(true);

    try {
      // Generate AI response
      const response = await generateResponse(content);
      
      let assistantMessage: Message;
      try {
        // Try to parse structured response if present
        const parsed = JSON.parse(response);
        assistantMessage = {
          id: generateId(),
          content: parsed.content,
          role: 'assistant',
          timestamp: new Date(),
          structured_response: parsed.structured_response
        };
      } catch {
        assistantMessage = {
          id: generateId(),
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };
      }

      setConversations(prev => prev.map(conv => 
        conv.id === (currentConversationId || prev[0]?.id)
          ? { ...conv, messages: [...conv.messages, assistantMessage], lastMessage: new Date() }
          : conv
      ));
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentConversationId, generateResponse]);

  const newConversation = useCallback(() => {
    setCurrentConversationId(null);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
  }, []);

  const clearAllData = useCallback(() => {
    // Only clear current session data, not persistent user data
    setConversations([]);
    setCurrentConversationId(null);
    // Don't remove from localStorage - data should persist for when user logs back in
  }, []);

  const clearUserData = useCallback(() => {
    // This function completely removes user's chat history
    if (userEmail) {
      const userConversationsKey = getUserStorageKey(CONVERSATIONS_STORAGE_KEY);
      const userCurrentConversationKey = getUserStorageKey(CURRENT_CONVERSATION_STORAGE_KEY);
      localStorage.removeItem(userConversationsKey);
      localStorage.removeItem(userCurrentConversationKey);
    }
    setConversations([]);
    setCurrentConversationId(null);
  }, [userEmail, getUserStorageKey]);

  return {
    conversations,
    currentConversation,
    currentConversationId,
    isLoading,
    isInitialized,
    sendMessage,
    newConversation,
    selectConversation,
    clearAllData,
    clearUserData,
  };
};

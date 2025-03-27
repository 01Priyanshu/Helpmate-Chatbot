import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Menu, Moon, Sun, Settings, MessageSquare, History, Trash2 } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant Helpmate. I'm designed to engage in meaningful conversations and help you with various topics. How can I assist you today? 🤖✨",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        text: generateResponse(input.toLowerCase()),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    // Enhanced emotional pattern recognition
    const patterns = {
      sad: /\b(sad|upset|unhappy|depressed|feeling down|crying|tears|heartbroken)\b/i,
      academicStress: /\b(exam|test|marks|grade|score|fail|failed|study|studies|college|school)\b/i,
      anxiety: /\b(anxious|worried|stress|stressed|nervous|fear|scared|panic)\b/i,
      greeting: /\b(hi|hello|hey|good\s*(morning|afternoon|evening))\b/i,
      howAreYou: /\b(how\s*are\s*you|how\s*do\s*you\s*do|how('s|'re)\s*you\s*(doing|going|feeling))\b/i,
      thanks: /\b(thanks|thank\s*you|appreciate|grateful)\b/i,
      goodbye: /\b(bye|goodbye|see\s*you|farewell|take\s*care)\b/i,
      identity: /\b(who\s*are\s*you|what\s*are\s*you|tell\s*me\s*about\s*yourself|your\s*name)\b/i,
      help: /\b(help|assist|support|guide)\b/i,
    };

    // Check for emotional distress first
    if (patterns.sad.test(input)) {
      const responses = [
        "I hear that you're feeling sad, and I want you to know that it's completely okay to feel this way. Would you like to talk about what's making you feel this way? I'm here to listen and support you. 💙",
        "I'm sorry you're feeling down. Remember that difficult emotions are a natural part of life, and it's brave of you to express them. Can you tell me more about what's troubling you? 🤗",
        "It takes courage to acknowledge when we're feeling sad. While I can't fully understand human emotions, I care about your well-being and I'm here to listen without judgment. What's on your mind? 💭"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (patterns.academicStress.test(input)) {
      const responses = [
        "I understand that getting lower marks than expected can be really disappointing. Remember that your worth isn't defined by your grades. Would you like to talk about what happened and maybe explore some study strategies for next time? 📚",
        "I hear your frustration about the marks. It's a challenging situation, but it's also an opportunity to learn and grow. Let's talk about what you think contributed to this result and how we can work on improving it. 💪",
        "Academic setbacks can be really tough to deal with. But remember, many successful people have faced similar challenges and grown from them. Would you like to discuss some strategies for moving forward? 🌟"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (patterns.anxiety.test(input)) {
      const responses = [
        "I can hear that you're feeling anxious. Take a deep breath - you're not alone in this. Would you like to talk about what's causing these feelings? Sometimes sharing our worries can help lighten the load. 🌈",
        "Feeling anxious is a natural response to challenging situations. Let's take this one step at a time. Can you tell me more about what's worrying you? 💫",
        "I understand that anxiety can be overwhelming. While I'm here to listen and support you, remember that it's also okay to seek help from friends, family, or professionals who can provide the support you need. 🤗"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (patterns.greeting.test(input)) {
      const responses = [
        "Hello! I'm here to listen and support you. How are you feeling today? 💫",
        "Hi there! Thank you for reaching out. I'm here to chat about whatever's on your mind. 🌟",
        "Welcome! I'm ready to listen and help in any way I can. How are you doing? ✨"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (patterns.howAreYou.test(input)) {
      const responses = [
        "I'm here and ready to listen and support you. More importantly, how are YOU feeling? I'd love to hear about your day. 💫",
        "I'm functioning well and focused on being here for you. What's on your mind today? 🌟",
        "I'm good, thank you for asking! But I'm more interested in how you're doing. Would you like to share? ✨"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (patterns.help.test(input)) {
      const responses = [
        "I'm here to help and support you. Can you tell me more about what you're going through? Sometimes talking things through can help us see them more clearly. 💫",
        "You've taken a positive step by asking for help. I'm here to listen and assist in any way I can. What's troubling you? 🌟",
        "I'm glad you reached out. Let's work through this together. What kind of support would be most helpful right now? ✨"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default responses for unrecognized inputs
    const defaultResponses = [
      "I sense there's something important you want to discuss. I'm here to listen without judgment. Would you like to tell me more? 💭",
      "Thank you for sharing that with me. Could you help me understand better what you're feeling right now? 🤗",
      "I'm here to support you. Sometimes it helps to talk things through. What's on your mind? 💫",
      "Your feelings matter, and I'm here to listen. Would you like to elaborate on what you're experiencing? 🌟",
      "I appreciate you opening up. Let's explore this together - what would you like to focus on? ✨"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const clearChat = () => {
    setMessages([
      {
        text: "Hello! I'm your AI assistant Helpmate. I'm designed to engage in meaningful conversations and help you with various topics. How can I assist you today? 🤖✨",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Helpmate
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-72 bg-black/30 backdrop-blur-md p-6 transition-transform duration-300 ease-in-out z-10 mt-20 border-r border-white/10`}
        >
          <div className="space-y-6">
            <button
              onClick={clearChat}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear Chat</span>
            </button>
            <div className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <History className="w-5 h-5" />
              <span>Chat History</span>
            </div>
            <div className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </div>
          </div>
        </aside>

        {/* Chat Container */}
        <main className="flex-1 container mx-auto max-w-4xl p-6 h-[calc(100vh-180px)]">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-xl h-full flex flex-col border border-white/10">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gradient-to-r from-pink-500 to-rose-500'
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="w-6 h-6" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.isBot
                        ? 'bg-white/10'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs text-white/60 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="border-t border-white/10 p-6"
            >
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-white/50"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 py-4 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
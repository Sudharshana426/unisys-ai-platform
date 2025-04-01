
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  X, 
  Send, 
  ChevronDown, 
  ChevronUp,
  Loader 
} from 'lucide-react';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi Rahul! 👋 I'm your personal AI assistant. I can help you with your studies, projects, and career planning. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('coding') || input.toLowerCase().includes('leetcode')) {
        response = "I see you're interested in coding practice. Based on your recent performance, I'd recommend focusing on dynamic programming problems. I've also noticed you've been doing well with array problems on LeetCode!";
      } else if (input.toLowerCase().includes('resume')) {
        response = "Your resume is looking good! I've noticed you could highlight your recent hackathon win more prominently. Also, consider adding your GitHub contributions to show your consistent coding practice.";
      } else if (input.toLowerCase().includes('interview')) {
        response = "For interview preparation, I recommend practicing system design questions since you've already mastered data structures. Would you like me to set up a mock interview session focusing on system design?";
      } else {
        response = "I've analyzed your recent activities and academic performance. You're doing great in algorithms but might want to spend more time on database concepts. There's also an upcoming hackathon that matches your skills - should I add it to your calendar?";
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div 
          className={`fixed right-4 bottom-4 bg-white rounded-lg shadow-xl border w-80 md:w-96 transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-[500px]'
          }`}
        >
          <div 
            className="flex items-center justify-between p-3 border-b cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-brand-blue to-brand-purple rounded-full h-8 w-8 flex items-center justify-center text-white">
                AI
              </div>
              <h3 className="font-medium">Your AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              {isMinimized ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="p-3 h-[370px] overflow-y-auto flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="resize-none min-h-[60px]"
                  />
                  <Button onClick={handleSend} size="icon" disabled={!input.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

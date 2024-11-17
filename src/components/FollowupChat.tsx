import React, { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

interface FollowupChatProps {
  emailContent: string;
}

function FollowupChat({ emailContent }: FollowupChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'I can help you analyze this email and suggest follow-up actions. What would you like to know?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    'What are the key points I should address in my reply?',
    'Summarize the main action items',
    'Draft a professional response',
    'Identify any potential concerns',
  ];

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    // Simplified response generation logic
    if (query.includes('key points')) {
      return 'Based on the email, here are the key points to address:\n\n1. Project timeline updates\n2. Progress on deliverables\n3. Team feedback requirements\n\nWould you like me to elaborate on any of these points?';
    }
    if (query.includes('action items')) {
      return '📋 Action Items:\n\n• Review project timeline\n• Provide feedback on deliverables\n• Schedule follow-up meeting\n\nShall I help you prioritize these tasks?';
    }
    return 'I understand you\'re asking about ' + query + '. Would you like me to analyze specific aspects of the email or suggest a response strategy?';
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">AI Follow-up Assistant</h3>
        <p className="text-sm text-gray-600">Ask questions or get suggestions about the email</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot size={18} className="text-blue-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader className="w-5 h-5 animate-spin text-gray-600" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && input.trim() && handleSend(input)}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => input.trim() && handleSend(input)}
            disabled={!input.trim()}
            className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowupChat;
import React, { useState } from 'react';
import { Send, Sparkles, ArrowLeft, Loader, MessageSquare } from 'lucide-react';
import AISuggestion from './AISuggestion';
import FollowupChat from './FollowupChat';

interface EmailDetailProps {
  emailId: number;
  onBack: () => void;
}

const emailsData = {
  1: {
    id: 1,
    subject: 'Project Update Meeting',
    content: "Hi team,\n\nI wanted to share the latest updates from our project meeting yesterday. We made significant progress on the key deliverables and I'd like to get everyone's feedback on the proposed timeline.\n\nCould you please review and let me know your thoughts?\n\nBest regards,\nJohn",
    sender: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    date: 'Mar 14, 2024, 10:30 AM',
  },
  2: {
    id: 2,
    subject: 'Design Review Feedback',
    content: "Hi team,\n\nI've reviewed the latest mockups and have some suggestions for improvement. The overall direction looks great, but there are a few areas where we could enhance the user experience.\n\nLet's discuss these points in our next meeting.\n\nBest,\nSarah",
    sender: {
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    date: 'Mar 14, 2024, 9:15 AM',
  },
  3: {
    id: 3,
    subject: 'Technical Documentation',
    content: "Hello everyone,\n\nAttached is the updated API documentation for the new features. Please review and let me know if anything needs clarification.\n\nThanks,\nAlex",
    sender: {
      name: 'Alex Thompson',
      email: 'alex.thompson@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    date: 'Mar 13, 2024',
  },
};

const suggestions = [
  {
    profile: {
      name: "Sarah Chen",
      role: "Senior Project Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      style: "Professional & Detailed",
    },
    text: `Dear John,

Thank you for sharing the comprehensive project updates. I've carefully reviewed the progress on our key deliverables, and I'm pleased to see the significant advancements we've made. The current trajectory looks promising, though I've identified a few areas where we might optimize our approach.

Regarding the proposed timeline, I believe it's generally feasible, but I would like to discuss a couple of specific points during our next meeting to ensure we're maximizing our efficiency while maintaining quality standards.

Would you be available for a brief discussion tomorrow afternoon to go through these points in detail?

Best regards,
Sarah`,
    sources: [
      {
        type: 'email',
        title: 'Previous Project Timeline Discussion',
        date: 'Mar 10, 2024'
      },
      {
        type: 'pdf',
        title: 'Q1 Project Guidelines.pdf',
        date: 'Jan 15, 2024'
      },
      {
        type: 'doc',
        title: 'Team Communication Standards',
        date: 'Feb 1, 2024'
      }
    ]
  },
  {
    profile: {
      name: "Alex Thompson",
      role: "Technical Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      style: "Concise & Technical",
    },
    text: `Hi John,

Quick feedback on the project updates:
- Deliverables progress looks good
- Timeline seems workable from technical perspective
- Have 2-3 optimization suggestions for the implementation phase

Can we hop on a 15-min call to discuss the technical approach? I have some ideas that might speed things up.

Thanks,
Alex`,
    sources: [
      {
        type: 'email',
        title: 'Technical Implementation Plan',
        date: 'Mar 12, 2024'
      },
      {
        type: 'pdf',
        title: 'System Architecture Overview.pdf',
        date: 'Mar 1, 2024'
      }
    ]
  },
  {
    profile: {
      name: "Maria Garcia",
      role: "Client Relations Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      style: "Friendly & Collaborative",
    },
    text: `Hi John!

Thanks for sharing these exciting updates! I'm really impressed with the team's progress on the deliverables. The momentum we're building is fantastic! 😊

I've looked through the proposed timeline, and while it looks good overall, I have some thoughts on how we could make it even better for our stakeholders. Would love to collaborate on fine-tuning these details.

How about we schedule a quick chat to brainstorm? I'm free most of tomorrow if that works for you!

Best wishes,
Maria`,
    sources: [
      {
        type: 'email',
        title: 'Stakeholder Feedback Summary',
        date: 'Mar 13, 2024'
      },
      {
        type: 'pdf',
        title: 'Client Communication Guidelines.pdf',
        date: 'Feb 20, 2024'
      },
      {
        type: 'doc',
        title: 'Project Success Metrics',
        date: 'Mar 1, 2024'
      }
    ]
  }
];

function EmailDetail({ emailId, onBack }: EmailDetailProps) {
  const [content, setContent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const emailData = emailsData[emailId];

  const handleAcceptSuggestion = (suggestion: string) => {
    setContent(suggestion);
    setShowSuggestions(false);
  };

  const handleSendReply = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  const handleShowSuggestions = () => {
    setIsLoadingSuggestions(true);
    setShowSuggestions(true);
    setTimeout(() => {
      setIsLoadingSuggestions(false);
    }, 3000);
  };

  if (!emailData) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Email not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-white">
      {/* Main Email Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {emailData.subject}
            </h2>
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              showChat 
                ? 'bg-blue-100 text-blue-600' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <MessageSquare size={20} />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {/* Original Email */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img
                  src={emailData.sender.avatar}
                  alt={emailData.sender.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {emailData.sender.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {emailData.sender.email}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{emailData.date}</span>
                  </div>
                  <div className="mt-4 text-gray-800 whitespace-pre-line">
                    {emailData.content}
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full h-48 px-4 py-3 pb-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <div className="absolute bottom-3 right-3">
                    <button 
                      onClick={handleShowSuggestions}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {isLoadingSuggestions ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles size={16} />
                      )}
                      <span>AI Suggestions</span>
                    </button>
                  </div>
                </div>

                {/* Send Button */}
                <div className="flex justify-end">
                  <button 
                    onClick={handleSendReply}
                    disabled={!content.trim()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    <span>Send Reply</span>
                  </button>
                </div>

                {/* AI Suggestions */}
                {showSuggestions && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">AI Suggestions</h3>
                    {isLoadingSuggestions ? (
                      <div className="flex items-center justify-center p-8">
                        <div className="flex flex-col items-center gap-3">
                          <Loader className="w-8 h-8 animate-spin text-blue-600" />
                          <p className="text-gray-600">Generating suggestions...</p>
                        </div>
                      </div>
                    ) : (
                      suggestions.map((suggestion, index) => (
                        <AISuggestion
                          key={index}
                          suggestion={suggestion.text}
                          profile={suggestion.profile}
                          sources={suggestion.sources}
                          onAccept={handleAcceptSuggestion}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Followup Chat */}
      {showChat && (
        <div className="w-96 h-full border-l border-gray-200">
          <FollowupChat emailContent={emailData.content} />
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
          <Send size={16} />
          <span>Reply sent successfully!</span>
        </div>
      )}
    </div>
  );
}

export default EmailDetail;
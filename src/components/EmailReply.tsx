import React, { useState } from 'react';
import { Send, X, Sparkles } from 'lucide-react';
import AISuggestion from './AISuggestion';

const suggestionProfiles = [
  {
    name: "Sarah Chen",
    role: "Senior Project Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    style: "Professional & Detailed",
  },
  {
    name: "Alex Thompson",
    role: "Technical Lead",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    style: "Concise & Technical",
  },
  {
    name: "Maria Garcia",
    role: "Client Relations Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    style: "Friendly & Collaborative",
  }
];

function EmailReply() {
  const [content, setContent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const originalEmail = {
    from: 'John Smith <john.smith@example.com>',
    to: 'me@example.com',
    subject: 'Project Update Meeting',
    date: 'Mar 14, 2024, 10:30 AM',
    content: "Hi team,\n\nI wanted to share the latest updates from our project meeting yesterday. We made significant progress on the key deliverables and I'd like to get everyone's feedback on the proposed timeline.\n\nCould you please review and let me know your thoughts?\n\nBest regards,\nJohn"
  };

  const suggestions = [
    {
      profile: suggestionProfiles[0],
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
      profile: suggestionProfiles[1],
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
      profile: suggestionProfiles[2],
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

  const handleAcceptSuggestion = (suggestion: string) => {
    setContent(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-1/2 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Re: {originalEmail.subject}</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Original Email */}
          <div className="space-y-4">
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-semibold">From:</span> {originalEmail.from}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {originalEmail.date}
              </div>
              <div>
                <span className="font-semibold">To:</span> {originalEmail.to}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
              {originalEmail.content}
            </div>
          </div>

          {/* Reply Section */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full h-48 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button 
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Sparkles size={16} />
                <span>AI Suggestions</span>
              </button>
            </div>

            {/* AI Suggestions */}
            {showSuggestions && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">AI Suggestions</h3>
                {suggestions.map((suggestion, index) => (
                  <AISuggestion
                    key={index}
                    suggestion={suggestion.text}
                    profile={suggestion.profile}
                    sources={suggestion.sources}
                    onAccept={handleAcceptSuggestion}
                  />
                ))}
              </div>
            )}

            {/* Send Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                <Send size={16} />
                <span>Send Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailReply;
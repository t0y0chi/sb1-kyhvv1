import React from 'react';
import { Star, Clock, Paperclip } from 'lucide-react';

interface EmailListProps {
  onSelectEmail: (id: number) => void;
}

const emails = [
  {
    id: 1,
    sender: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    subject: 'Project Update Meeting',
    preview: 'Hi team, I wanted to share the latest updates from our project meeting yesterday...',
    date: '10:30 AM',
    isStarred: true,
    isUnread: true,
    hasAttachments: true,
  },
  {
    id: 2,
    sender: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    subject: 'Design Review Feedback',
    preview: "I've reviewed the latest mockups and have some suggestions for improvement...",
    date: '9:15 AM',
    isStarred: false,
    isUnread: true,
    hasAttachments: false,
  },
  {
    id: 3,
    sender: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    subject: 'Technical Documentation',
    preview: 'Attached is the updated API documentation for the new features...',
    date: 'Yesterday',
    isStarred: true,
    isUnread: false,
    hasAttachments: true,
  },
];

function EmailList({ onSelectEmail }: EmailListProps) {
  return (
    <div className="h-full bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Inbox</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => onSelectEmail(email.id)}
            className={`w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
              email.isUnread ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={email.sender.avatar}
                alt={email.sender.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${email.isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {email.sender.name}
                  </span>
                  <div className="flex items-center gap-3 text-gray-500">
                    {email.hasAttachments && <Paperclip size={16} />}
                    {email.isStarred && <Star size={16} className="text-yellow-400 fill-current" />}
                    <span className="text-sm whitespace-nowrap">{email.date}</span>
                  </div>
                </div>
                <h3 className={`text-sm ${email.isUnread ? 'font-semibold' : 'font-medium'} text-gray-900 mb-1`}>
                  {email.subject}
                </h3>
                <p className="text-sm text-gray-500 truncate">{email.preview}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmailList;
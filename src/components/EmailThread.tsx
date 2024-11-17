import React from 'react';
import { Paperclip } from 'lucide-react';

interface Email {
  id: number;
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: string;
  subject: string;
  date: string;
  content: string;
  attachments: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

interface EmailThreadProps {
  emails: Email[];
}

function EmailThread({ emails }: EmailThreadProps) {
  return (
    <div className="space-y-8">
      {emails.map((email, index) => (
        <div key={email.id} className="relative">
          {/* Timeline connector */}
          {index < emails.length - 1 && (
            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
          )}
          
          <div className="flex gap-4">
            <img
              src={email.from.avatar}
              alt={email.from.name}
              className="w-12 h-12 rounded-full flex-shrink-0 z-10 bg-white"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{email.from.name}</h3>
                  <p className="text-sm text-gray-600">{email.from.email}</p>
                </div>
                <div className="text-sm text-gray-500">{email.date}</div>
              </div>
              <div className="prose prose-sm max-w-none mb-4">
                <p className="whitespace-pre-line">{email.content}</p>
              </div>
              {email.attachments.length > 0 && (
                <div className="space-y-2">
                  {email.attachments.map((attachment, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg w-fit"
                    >
                      <Paperclip size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {attachment.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({attachment.size})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmailThread;
import React, { useState } from 'react';
import { Send, X, Sparkles, Check, Edit } from 'lucide-react';
import AISuggestion from './AISuggestion';

function EmailComposer() {
  const [content, setContent] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAcceptSuggestion = (suggestion: string) => {
    setContent(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-1/2 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">New Message</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="To"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your message..."
            className="w-full h-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute bottom-4 right-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Sparkles size={16} />
            <span>AI Suggestions</span>
          </button>
        </div>

        {showSuggestions && (
          <div className="space-y-4">
            <AISuggestion
              suggestion="Thank you for your email. I've reviewed the presentation and everything looks great. I've made a few minor suggestions in the attached document. Looking forward to tomorrow's meeting."
              onAccept={handleAcceptSuggestion}
            />
            <AISuggestion
              suggestion="I appreciate you sharing the presentation. I've gone through it and have some suggestions for improvement. Would you be available for a quick call to discuss these points before tomorrow's meeting?"
              onAccept={handleAcceptSuggestion}
            />
          </div>
        )}

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailComposer;
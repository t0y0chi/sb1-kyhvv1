import React from 'react';
import { Check, FileText, Mail, FileIcon } from 'lucide-react';

interface Source {
  type: 'email' | 'pdf' | 'doc';
  title: string;
  date: string;
}

interface SuggestionProfile {
  name: string;
  role: string;
  avatar: string;
  style: string;
}

interface AISuggestionProps {
  suggestion: string;
  profile: SuggestionProfile;
  sources: Source[];
  onAccept: (suggestion: string) => void;
}

function AISuggestion({ suggestion, profile, sources, onAccept }: AISuggestionProps) {
  const getSourceIcon = (type: Source['type']) => {
    switch (type) {
      case 'email':
        return <Mail size={14} className="text-blue-600" />;
      case 'pdf':
        return <FileText size={14} className="text-red-600" />;
      case 'doc':
        return <FileIcon size={14} className="text-green-600" />;
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      {/* Profile Header */}
      <div className="flex gap-4 mb-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-medium text-gray-900">{profile.name}</h4>
          <p className="text-sm text-gray-600">{profile.role}</p>
          <p className="text-xs text-blue-600">Style: {profile.style}</p>
        </div>
      </div>

      {/* Suggestion Content */}
      <div className="text-gray-800 whitespace-pre-line mb-4 bg-white p-4 rounded-lg border border-blue-100">
        {suggestion}
      </div>

      {/* Reference Sources */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">References:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sources.map((source, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="p-1.5 bg-gray-50 rounded">
                {getSourceIcon(source.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {source.title}
                </p>
                <p className="text-xs text-gray-500">{source.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accept Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onAccept(suggestion)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Check size={16} />
          <span>Accept Suggestion</span>
        </button>
      </div>
    </div>
  );
}

export default AISuggestion;
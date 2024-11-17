import React from 'react';
import { Mail, Send, Inbox, Star, Clock, AlertCircle } from 'lucide-react';

const menuItems = [
  { icon: Inbox, label: 'Inbox', count: 12 },
  { icon: Star, label: 'Important', count: 3 },
  { icon: Clock, label: 'Snoozed', count: 2 },
  { icon: Send, label: 'Sent', count: 0 },
  { icon: AlertCircle, label: 'Needs Action', count: 5 },
];

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-sm">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
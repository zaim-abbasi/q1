import React, { useState } from 'react';
import { 
  MdInbox, MdStar, MdSend, MdDrafts, MdReport, 
  MdLabel, MdDelete, MdSearch, MdAttachment,
  MdStarBorder, MdLabelImportant, MdScheduleSend
} from 'react-icons/md';

const MOCK_EMAILS = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john.smith@supplier.com',
    subject: 'Re: Product Restock Request - iPhone 13',
    preview: 'Thank you for your inquiry about restocking...',
    date: '10:30 AM',
    label: 'primary',
    isRead: false,
    messages: [
      {
        id: 1,
        sender: 'John Smith',
        content: 'Hello, I received your request about restocking iPhone 13. We currently have 200 units available for immediate shipment.',
        timestamp: '10:25 AM',
        isUser: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'That\'s great news! What\'s the best price you can offer for bulk purchase?',
        timestamp: '10:28 AM',
        isUser: true
      },
      {
        id: 3,
        sender: 'John Smith',
        content: 'For orders over 100 units, we can offer a 15% discount on the regular wholesale price.',
        timestamp: '10:30 AM',
        isUser: false
      }
    ]
  },
  {
    id: 2,
    sender: 'Sarah Johnson',
    email: 'sarah.j@supplier.com',
    subject: 'New MacBook Pro Stock Available',
    preview: 'We are pleased to inform you that the new...',
    date: '9:15 AM',
    label: 'important',
    isRead: true,
    messages: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        content: 'Hi there! Just wanted to let you know that we have received a new shipment of MacBook Pro units.',
        timestamp: '9:10 AM',
        isUser: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Perfect timing! How many units are available and what are the specifications?',
        timestamp: '9:12 AM',
        isUser: true
      }
    ]
  },
  // Add more mock emails as needed
];

const FOLDERS = [
  { name: 'Inbox', icon: MdInbox, count: 4 },
  { name: 'Starred', icon: MdStar, count: 2 },
  { name: 'Sent', icon: MdSend, count: 0 },
  { name: 'Drafts', icon: MdDrafts, count: 1 },
  { name: 'Spam', icon: MdReport, count: 0 },
  { name: 'Bin', icon: MdDelete, count: 0 },
];

const LABELS = [
  { name: 'Primary', color: 'blue' },
  { name: 'Work', color: 'green' },
  { name: 'Friends', color: 'purple' },
];

function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [newMessage, setNewMessage] = useState('');
  const [emails, setEmails] = useState(MOCK_EMAILS);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedEmail) return;

    const newMessageObj = {
      id: selectedEmail.messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    const updatedEmails = emails.map(email => {
      if (email.id === selectedEmail.id) {
        return {
          ...email,
          messages: [...email.messages, newMessageObj]
        };
      }
      return email;
    });

    setEmails(updatedEmails);
    setSelectedEmail(updatedEmails.find(email => email.id === selectedEmail.id));
    setNewMessage('');
  };

  const filteredEmails = emails.filter(email =>
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="space-y-1">
          {FOLDERS.map((folder) => (
            <button
              key={folder.name}
              onClick={() => setSelectedFolder(folder.name)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                selectedFolder === folder.name
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <folder.icon className="w-5 h-5 mr-3" />
                <span>{folder.name}</span>
              </div>
              {folder.count > 0 && (
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {folder.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Labels
          </h3>
          <div className="space-y-1">
            {LABELS.map((label) => (
              <button
                key={label.name}
                className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <MdLabel className={`w-5 h-5 mr-3 text-${label.color}-500`} />
                <span>{label.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Email List and Chat */}
      <div className="flex-1 flex">
        {/* Email List */}
        <div className={`${selectedEmail ? 'w-1/2' : 'w-full'} border-r border-gray-200`}>
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <MdSearch className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 bg-transparent outline-none flex-1"
              />
            </div>
          </div>

          {/* Email List */}
          <div className="overflow-auto h-[calc(100%-73px)]">
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`w-full flex items-start p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  !email.isRead ? 'bg-blue-50' : ''
                } ${selectedEmail?.id === email.id ? 'bg-blue-100' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${!email.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                      {email.sender}
                    </h3>
                    <span className="text-xs text-gray-500">{email.date}</span>
                  </div>
                  <p className="text-sm text-gray-900 truncate">{email.subject}</p>
                  <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        {selectedEmail && (
          <div className="w-1/2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{selectedEmail.subject}</h2>
              <p className="text-sm text-gray-500">{selectedEmail.sender} ({selectedEmail.email})</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {selectedEmail.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs mt-1 block opacity-75">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <MdAttachment className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MdSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
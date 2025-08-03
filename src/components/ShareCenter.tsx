'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { 
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';
import { 
  Link, 
  QrCode, 
  Share2, 
  Users, 
  Mail, 
  Copy, 
  Check, 
  Eye, 
  Download,
  Globe,
  Settings,
  UserPlus,
  Crown,
  Edit3,
  MoreHorizontal
} from 'lucide-react';
import { ShareSettings, TeamMember, PermissionLevel } from '@/types';

interface ShareCenterProps {
  exportData?: {
    id: string;
    name: string;
    format: string;
    recordCount: number;
    createdAt: Date;
  };
  onShareCreate?: (settings: ShareSettings) => void;
}

export const ShareCenter: React.FC<ShareCenterProps> = ({
  exportData = {
    id: 'sample-export',
    name: 'Monthly Expense Report',
    format: 'pdf',
    recordCount: 127,
    createdAt: new Date()
  },
  onShareCreate
}) => {
  const [shareSettings, setShareSettings] = useState<ShareSettings>({
    id: 'share-' + Math.random().toString(36).substr(2, 9),
    isPublic: false,
    allowComments: true,
    allowDownload: true,
    permissions: 'view' as PermissionLevel,
    viewCount: 0,
    downloadCount: 0,
  });

  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);

  // Mock team members
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      avatar: '👩‍💼',
      role: 'admin',
      joinedAt: new Date(Date.now() - 86400000 * 30),
      lastActive: new Date(Date.now() - 3600000),
      isOnline: true,
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      avatar: '👨‍💻',
      role: 'edit',
      joinedAt: new Date(Date.now() - 86400000 * 15),
      lastActive: new Date(Date.now() - 7200000),
      isOnline: false,
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@company.com',
      avatar: '👩‍🔬',
      role: 'view',
      joinedAt: new Date(Date.now() - 86400000 * 7),
      lastActive: new Date(Date.now() - 1800000),
      isOnline: true,
    }
  ];

  const generateShareUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://expense-tracker.com';
    const url = `${baseUrl}/shared/${exportData.id}?access=${shareSettings.id}`;
    setShareUrl(url);
    return url;
  };

  const handleCreateShareLink = () => {
    generateShareUrl();
    onShareCreate?.(shareSettings);
  };

  const copyToClipboard = async () => {
    if (!shareUrl) {
      handleCreateShareLink();
    }
    
    try {
      await navigator.clipboard.writeText(shareUrl || generateShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      if (linkInputRef.current) {
        linkInputRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleInviteTeamMember = () => {
    if (inviteEmail) {
      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
    }
  };

  const getRoleIcon = (role: PermissionLevel) => {
    switch (role) {
      case 'admin': return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'edit': return <Edit3 className="h-3 w-3 text-blue-500" />;
      case 'comment': return <Mail className="h-3 w-3 text-green-500" />;
      case 'view': return <Eye className="h-3 w-3 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const shareTitle = `${exportData.name} - ${exportData.recordCount} expenses`;
  const shareDescription = `View my expense report exported on ${exportData.createdAt.toLocaleDateString()}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
          <Share2 className="h-6 w-6 mr-3 text-blue-500" />
          Share & Collaborate
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Generate secure links, QR codes, and collaborate with your team
        </p>
      </div>

      {/* Export Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Download className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">{exportData.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {exportData.recordCount} expenses • {exportData.format.toUpperCase()} • {exportData.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {shareSettings.viewCount} views • {shareSettings.downloadCount} downloads
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Share Link Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Link className="h-5 w-5 mr-2 text-blue-500" />
            Shareable Link
          </h4>

          {/* Link Settings */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shareSettings.isPublic}
                    onChange={(e) => setShareSettings({...shareSettings, isPublic: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    Public access
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shareSettings.allowDownload}
                    onChange={(e) => setShareSettings({...shareSettings, allowDownload: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Allow download
                  </span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={shareSettings.allowComments}
                    onChange={(e) => setShareSettings({...shareSettings, allowComments: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Allow comments
                  </span>
                </label>
              </div>
              <div>
                <select
                  value={shareSettings.permissions}
                  onChange={(e) => setShareSettings({...shareSettings, permissions: e.target.value as PermissionLevel})}
                  className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="view">View only</option>
                  <option value="comment">Can comment</option>
                  <option value="edit">Can edit</option>
                </select>
              </div>
            </div>

            {/* Generated Link */}
            <div className="flex space-x-2">
              <input
                ref={linkInputRef}
                type="text"
                value={shareUrl || 'Generate link to see URL'}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center space-x-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              onClick={handleCreateShareLink}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium"
            >
              Generate Secure Link
            </button>
          </div>

          {/* QR Code */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-gray-900 dark:text-white flex items-center">
                <QrCode className="h-5 w-5 mr-2 text-blue-500" />
                QR Code
              </h5>
              <button
                onClick={() => setQrVisible(!qrVisible)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {qrVisible ? 'Hide' : 'Show'}
              </button>
            </div>

            {qrVisible && (
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-lg">
                  <QRCode
                    value={shareUrl || generateShareUrl()}
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 160 160`}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Scan to access report on mobile devices
                </p>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Social Sharing & Team */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Share & Collaborate
          </h4>

          {/* Social Media Sharing */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">Social Media</h5>
            <div className="grid grid-cols-3 gap-3">
              <TwitterShareButton
                url={shareUrl || generateShareUrl()}
                title={shareTitle}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <TwitterIcon size={24} round />
                </div>
              </TwitterShareButton>

              <LinkedinShareButton
                url={shareUrl || generateShareUrl()}
                title={shareTitle}
                summary={shareDescription}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <LinkedinIcon size={24} round />
                </div>
              </LinkedinShareButton>

              <WhatsappShareButton
                url={shareUrl || generateShareUrl()}
                title={shareTitle}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                  <WhatsappIcon size={24} round />
                </div>
              </WhatsappShareButton>

              <EmailShareButton
                url={shareUrl || generateShareUrl()}
                subject={shareTitle}
                body={shareDescription}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <EmailIcon size={24} round />
                </div>
              </EmailShareButton>

              <TelegramShareButton
                url={shareUrl || generateShareUrl()}
                title={shareTitle}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <TelegramIcon size={24} round />
                </div>
              </TelegramShareButton>

              <FacebookShareButton
                url={shareUrl || generateShareUrl()}
                className="w-full"
              >
                <div className="flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FacebookIcon size={24} round />
                </div>
              </FacebookShareButton>
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">Team Members</h5>
            
            {/* Invite Input */}
            <div className="flex space-x-2 mb-4">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email to invite..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={handleInviteTeamMember}
                disabled={!inviteEmail}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-md transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite</span>
              </button>
            </div>

            {/* Team Member List */}
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <span className="text-2xl">{member.avatar}</span>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Last active {member.lastActive ? formatTimeAgo(member.lastActive) : 'Never'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Analytics */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h5 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-500" />
          Share Analytics
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">247</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">23</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Shares</div>
          </div>
        </div>
      </div>
    </div>
  );
};
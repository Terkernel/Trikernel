'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  User,
  Lock,
  Bell,
  Eye,
  Zap,
  Palette,
  LogOut,
  Settings,
} from 'lucide-react';

function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border-b rounded-none bg-gray-50 p-2 gap-1">
              <TabsTrigger value="profile" className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="danger" className="flex items-center gap-2 text-sm">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Danger</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="p-6">
              <TabsContent value="profile" className="mt-0">
                <PlaceholderTab
                  title="Profile"
                  description="Profile settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <PlaceholderTab
                  title="Security"
                  description="Security settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <PlaceholderTab
                  title="Notifications"
                  description="Notification settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="privacy" className="mt-0">
                <PlaceholderTab
                  title="Privacy"
                  description="Privacy settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <PlaceholderTab
                  title="Preferences"
                  description="Preference settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <PlaceholderTab
                  title="Appearance"
                  description="Appearance settings are temporarily unavailable in this build."
                />
              </TabsContent>

              <TabsContent value="danger" className="mt-0">
                <PlaceholderTab
                  title="Danger Zone"
                  description="Danger-zone actions are temporarily unavailable in this build."
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

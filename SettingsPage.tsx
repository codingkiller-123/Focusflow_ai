import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { Bell, ShieldAlert, MonitorSmartphone, KeySquare } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          Settings
        </h1>
        <p className="text-zinc-400 mt-2">Manage your account, preferences, and integrations.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Account Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 border boder-zinc-800 p-4 rounded-xl bg-zinc-900/50">
              <img 
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=random`} 
                alt="Profile" 
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="font-semibold text-lg">{user?.displayName || 'Unknown Name'}</div>
                <div className="text-zinc-400 text-sm">{user?.email}</div>
              </div>
              <Button variant="outline" className="ml-auto">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <div className="flex gap-3 items-center mb-1">
               <Bell className="w-5 h-5 text-orange-500" />
               <CardTitle>Smart Notifications</CardTitle>
            </div>
            <CardDescription>Configure how we alert you during and outside of Focus Mode.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">
              <div>
                 <div className="font-medium text-white mb-1">Break Reminders</div>
                 <div className="text-sm text-zinc-500">Notify me when it's time to take a break (Pomodoro)</div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-500">
                <span className="inline-block relative h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">
              <div>
                 <div className="font-medium text-white mb-1">Daily Summary</div>
                 <div className="text-sm text-zinc-500">Weekly email report of your deep work metrics</div>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700">
                <span className="inline-block relative h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <div className="flex gap-3 items-center mb-1">
               <MonitorSmartphone className="w-5 h-5 text-blue-500" />
               <CardTitle>Connected Devices</CardTitle>
            </div>
            <CardDescription>Manage devices that sync your focus status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between border border-zinc-800 p-4 rounded-xl hover:bg-zinc-900 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-zinc-800 rounded-lg"><MonitorSmartphone className="w-6 h-6 text-zinc-300"/></div>
                   <div>
                      <div className="font-medium text-white">Focus Desktop App (Mac)</div>
                      <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"/> Active now</div>
                   </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
             </div>
             
             <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 border-dashed py-8 h-auto">
               + Connect new device
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

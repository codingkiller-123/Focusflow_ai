import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Shield, ShieldAlert, MonitorOff, GlobeLock, AlertTriangle } from 'lucide-react';
import { Switch } from '@radix-ui/react-switch';
import { Button } from '../components/ui/Button';

export function BlockerPage() {
  const [strictMode, setStrictMode] = useState(false);
  const [apps, setApps] = useState([
    { id: 1, name: 'YouTube', category: 'Entertainment', blocked: true, icon: '📺' },
    { id: 2, name: 'Twitter / X', category: 'Social', blocked: true, icon: '🐦' },
    { id: 3, name: 'Instagram', category: 'Social', blocked: true, icon: '📸' },
    { id: 4, name: 'TikTok', category: 'Social', blocked: true, icon: '🎵' },
    { id: 5, name: 'Reddit', category: 'Social', blocked: false, icon: '🤖' },
  ]);

  const toggleBlock = (id: number) => {
    setApps(apps.map(app => app.id === id ? { ...app, blocked: !app.blocked } : app));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-orange-500" />
          App & Website Blocker
        </h1>
        <p className="text-zinc-400 mt-2">Manage what distracts you. Rules apply automatically during Focus Mode.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-zinc-950 border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Strict Mode
            </CardTitle>
            <CardDescription>
              Prevents you from disabling the block rules once a focus session has started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className={`text-sm font-medium ${strictMode ? 'text-orange-400' : 'text-zinc-400'}`}>
              {strictMode ? 'Strict Mode is ON' : 'Turn on Strict Mode'}
            </span>
            <button 
              onClick={() => setStrictMode(!strictMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${strictMode ? 'bg-orange-500' : 'bg-zinc-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${strictMode ? 'translate-x-6' : 'translate-x-1'}`}/>
            </button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GlobeLock className="w-5 h-5 text-zinc-400" />
              Extension Sync
            </CardTitle>
            <CardDescription>
              Sync block rules to Chrome & Firefox
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <span className="text-sm text-zinc-500">Not connected</span>
            <Button variant="outline" size="sm">Connect Browser</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <div className="flex justify-between items-center">
             <div>
               <CardTitle>Blocklist Categories</CardTitle>
               <CardDescription>Select individual sites or block whole categories</CardDescription>
             </div>
             <Button variant="outline" size="sm">Add Custom URL</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {apps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <h4 className="font-medium text-white">{app.name}</h4>
                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">{app.category}</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleBlock(app.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${app.blocked ? 'bg-red-500' : 'bg-zinc-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${app.blocked ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
              </div>
            ))}
          </div>

          {strictMode && (
             <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3 text-orange-400">
               <AlertTriangle className="w-5 h-5 shrink-0" />
               <p className="text-sm">Because Strict Mode is enabled, you will not be able to turn off these blocks via standard app settings once a Deep Work timer is running.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

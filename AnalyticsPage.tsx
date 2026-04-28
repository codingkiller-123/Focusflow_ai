import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Calendar, Target, Zap } from 'lucide-react';

const mockDailyData = [
  { name: 'Mon', focusHours: 2.5, blocks: 15 },
  { name: 'Tue', focusHours: 3.8, blocks: 22 },
  { name: 'Wed', focusHours: 4.2, blocks: 10 },
  { name: 'Thu', focusHours: 3.0, blocks: 18 },
  { name: 'Fri', focusHours: 5.5, blocks: 5 },
  { name: 'Sat', focusHours: 1.2, blocks: 30 },
  { name: 'Sun', focusHours: 0.5, blocks: 45 },
];

export function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
        <p className="text-zinc-400 mt-2">Insights on your focus, distractions, and productivity patterns.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-zinc-400">Total Focus Time</p>
                 <h2 className="text-3xl font-bold text-white mt-2">20.7<span className="text-lg text-zinc-500 font-normal">hrs</span></h2>
               </div>
               <div className="p-3 bg-orange-500/10 rounded-lg">
                 <Target className="w-5 h-5 text-orange-500" />
               </div>
             </div>
             <div className="mt-4 text-sm text-green-400 flex items-center gap-1">
               <span>+12%</span>
               <span className="text-zinc-500">from last week</span>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-zinc-400">Distractions Blocked</p>
                 <h2 className="text-3xl font-bold text-white mt-2">145<span className="text-lg text-zinc-500 font-normal">pts</span></h2>
               </div>
               <div className="p-3 bg-red-500/10 rounded-lg">
                 <Zap className="w-5 h-5 text-red-500" />
               </div>
             </div>
             <div className="mt-4 text-sm text-red-400 flex items-center gap-1">
               <span>+5%</span>
               <span className="text-zinc-500">from last week</span>
             </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-zinc-400">Productivity Score</p>
                 <h2 className="text-3xl font-bold text-white mt-2">84<span className="text-lg text-zinc-500 font-normal">/100</span></h2>
               </div>
               <div className="p-3 bg-blue-500/10 rounded-lg">
                 <Calendar className="w-5 h-5 text-blue-500" />
               </div>
             </div>
             <div className="mt-4 text-sm text-green-400 flex items-center gap-1">
               <span>+2 points</span>
               <span className="text-zinc-500">from yesterday</span>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Focus Output per Day</CardTitle>
            <CardDescription>Hours spent in deep work mode this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}h`} />
                  <Tooltip 
                    cursor={{fill: '#27272a', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="focusHours" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader>
            <CardTitle>Intents to Distract</CardTitle>
            <CardDescription>Number of times the blocker intercepted you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockDailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="blocks" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useFocusStore } from '../hooks/useFocusTasks';
import { Flame, Trophy, Clock, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { getProductivityTips } from '../services/geminiService';

export function DashboardPage() {
  const { focusTimeToday, streak, level, experience, tasks } = useFocusStore();
  const [tips, setTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);

  // Format hours and mins
  const hours = Math.floor(focusTimeToday / 3600);
  const minutes = Math.floor((focusTimeToday % 3600) / 60);

  useEffect(() => {
    // simulated activity
    const activityInfo = `Completed ${tasks.filter(t => t.completed).length} tasks, focused for ${hours}h ${minutes}m today. Streak is ${streak} days.`;
    getProductivityTips(activityInfo).then(fetchedTips => {
      setTips(fetchedTips);
      setLoadingTips(false);
    });
  }, [focusTimeToday, streak, tasks, hours, minutes]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome back. Ready to do some deep work?</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">Focus Time Today</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">{hours}</span><span className="text-sm text-zinc-500">h</span>
                  <span className="text-2xl font-bold ml-1">{minutes}</span><span className="text-sm text-zinc-500">m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">Current Streak</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">{streak}</span><span className="text-sm text-zinc-500">days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">Focus Level</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">{level}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800 relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-zinc-800">
             <div className="h-full bg-orange-500" style={{ width: `${(experience % 1000) / 10}%` }} />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">Experience</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold">{experience}</span><span className="text-sm text-zinc-500">XP</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main tasks list */}
        <div className="md:col-span-2 space-y-4">
           <Card className="bg-zinc-950 border-zinc-800 h-full">
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-zinc-500 text-sm">No tasks added yet. Go to Focus Mode to start.</p>
                ) : (
                  tasks.slice().reverse().slice(0, 5).map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/50">
                       <div className="flex items-center gap-3">
                         {task.completed ? 
                           <CheckCircle2 className="w-5 h-5 text-green-500" /> : 
                           <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                         }
                         <span className={`font-medium ${task.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                           {task.title}
                         </span>
                       </div>
                       <div className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                         {Math.floor(task.duration / 60)} min
                       </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
           </Card>
        </div>

        {/* AI Insights panel */}
        <div className="space-y-4">
           <Card className="bg-zinc-950 border-zinc-800 bg-gradient-to-b from-zinc-950 to-orange-950/10">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Sparkles className="w-5 h-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loadingTips ? (
                <div className="space-y-3">
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-5/6"></div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

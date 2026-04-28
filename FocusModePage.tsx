import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useFocusStore } from '../hooks/useFocusTasks';
import { Play, Pause, Square, Plus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FocusModePage() {
  const { tasks, addTask, completeTask, activeTaskId, setActiveTask, addFocusTime } = useFocusStore();
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState('25');
  
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  const activeTask = tasks.find(t => t.id === activeTaskId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        addFocusTime(1);
      }, 1000);
    } else if (timeRemaining === 0 && timerRunning) {
      setTimerRunning(false);
      if (activeTaskId) {
        completeTask(activeTaskId, activeTask?.duration || 25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining, activeTaskId, activeTask, completeTask, addFocusTime]);

  const handleStartTask = (taskId: string) => {
    setActiveTask(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTimeRemaining(task.duration);
    }
    setTimerRunning(true);
    setSessionStartTime(Date.now());
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleStopTask = () => {
    setTimerRunning(false);
    if (activeTaskId) {
      // Calculate how long they actually focused
      const focusedSeconds = activeTask?.duration ? activeTask.duration - timeRemaining : 0;
      if (focusedSeconds > 60) { // More than 1 min
        completeTask(activeTaskId, focusedSeconds);
      }
    }
    setActiveTask(null);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      duration: parseInt(newTaskDuration) * 60,
      category: 'Work'
    });
    setNewTaskTitle('');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // SVG Circle calculations
  const totalDuration = activeTask?.duration || 25 * 60;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 h-full min-h-[calc(100vh-8rem)]">
      {/* Left side: Timer */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative flex justify-center items-center w-[320px] h-[320px] mb-8">
           {/* Background glow when running */}
           <AnimatePresence>
             {timerRunning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-orange-500 blur-[80px] rounded-full pointer-events-none" 
                  style={{ transform: 'scale(0.8)' }}
                />
             )}
           </AnimatePresence>
           
           <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="stroke-orange-500 transition-all duration-1000 ease-linear"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
           </svg>
           
           <div className="relative z-10 text-center">
              <div className="text-6xl font-black tracking-tighter tabular-nums text-white">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-orange-400 font-medium text-sm mt-2 tracking-widest uppercase">
                {activeTask ? 'Focusing' : 'Ready'}
              </div>
           </div>
        </div>

        <div className="flex gap-4">
          {activeTask ? (
            <>
              <Button 
                onClick={toggleTimer} 
                className="w-16 h-16 rounded-full bg-white text-black hover:bg-zinc-200"
              >
                {timerRunning ? <Pause className="w-8 h-8" fill="currentColor"/> : <Play className="w-8 h-8" fill="currentColor"/>}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleStopTask}
                className="w-16 h-16 rounded-full border-zinc-700 hover:bg-zinc-800 hover:text-red-400"
              >
                <Square className="w-6 h-6" fill="currentColor"/>
              </Button>
            </>
          ) : (
            <div className="text-zinc-500 text-sm">Select a task or just start a block</div>
          )}
        </div>
        
        {activeTask && (
          <div className="mt-8 text-center text-zinc-400">
            Current task: <span className="text-white font-medium">{activeTask.title}</span>
          </div>
        )}
      </div>

      {/* Right side: Tasks */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-4">
            <form onSubmit={handleCreateTask} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="What are you working on?"
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
              />
              <div className="flex gap-3">
                <select 
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none flex-1"
                  value={newTaskDuration}
                  onChange={e => setNewTaskDuration(e.target.value)}
                >
                  <option value="15">15 min</option>
                  <option value="25">25 min (Pomodoro)</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
                <Button type="submit" size="icon" className="shrink-0 bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-5 h-5"/>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Up Next</h3>
          {tasks.filter(t => !t.completed).length === 0 && (
             <div className="text-center py-8 text-zinc-600 border border-dashed border-zinc-800 rounded-xl">
               No tasks scheduled
             </div>
          )}
          {tasks.filter(t => !t.completed).map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-xl border transition-colors ${
                activeTaskId === task.id 
                  ? 'border-orange-500/50 bg-orange-500/5' 
                  : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 cursor-pointer'
              }`}
              onClick={() => {
                 if (!activeTaskId) handleStartTask(task.id);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-white">{task.title}</span>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                  {task.duration / 60}m
                </span>
              </div>
              <div className="text-xs text-zinc-500">
                 {activeTaskId === task.id ? 'Running right now...' : 'Click to start'}
              </div>
            </div>
          ))}

          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2 mt-8">Completed</h3>
          {tasks.filter(t => t.completed).map(task => (
            <div key={task.id} className="p-3 rounded-lg border border-zinc-800/50 bg-zinc-950/50 opacity-60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-zinc-300 line-through">{task.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

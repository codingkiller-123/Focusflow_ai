import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  duration: number; // in seconds
  completed: boolean;
  category: string;
}

interface FocusState {
  tasks: Task[];
  activeTaskId: string | null;
  focusTimeToday: number;
  streak: number;
  level: number;
  experience: number;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  completeTask: (id: string, durationStudied: number) => void;
  setActiveTask: (id: string | null) => void;
  addFocusTime: (seconds: number) => void;
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      tasks: [
        { id: '1', title: 'Deep Work Session', duration: 25 * 60, completed: false, category: 'Work' },
        { id: '2', title: 'Read Documentation', duration: 15 * 60, completed: false, category: 'Study' },
      ],
      activeTaskId: null,
      focusTimeToday: 0,
      streak: 3,
      level: 4,
      experience: 450,
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substring(7), completed: false }]
      })),
      completeTask: (id, durationStudied) => set((state) => {
        const updatedTasks = state.tasks.map(t => 
          t.id === id ? { ...t, completed: true } : t
        );
        const xpGained = Math.floor(durationStudied / 60) * 10;
        const newXp = state.experience + xpGained;
        const newLevel = Math.floor(newXp / 1000) + 1;
        
        return {
          tasks: updatedTasks,
          activeTaskId: null,
          experience: newXp,
          level: newLevel,
          focusTimeToday: state.focusTimeToday + durationStudied
        };
      }),
      setActiveTask: (id) => set({ activeTaskId: id }),
      addFocusTime: (seconds) => set((state) => ({ focusTimeToday: state.focusTimeToday + seconds })),
    }),
    {
      name: 'focus-storage',
    }
  )
);

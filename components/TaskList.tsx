import React from 'react';
import { CheckIcon } from './icons';
import type { Task } from '@/types';

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
};

export const TaskList = ({ tasks, onToggle }: Props) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          onClick={() => onToggle(task.id)}
          className={`group relative flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300
            ${task.completed ? 'opacity-40 grayscale' : 'opacity-100'}
            ${task.type === 'vision' 
              ? 'bg-zinc-900/40 border-zinc-800 hover:border-emerald-500/30' 
              : 'bg-transparent border-transparent hover:bg-zinc-900/50'}
          `}
        >
          {/* チェックボックス */}
          <div className={`w-5 h-5 rounded-md border mr-4 flex items-center justify-center transition-colors
            ${task.completed ? 'bg-zinc-600 border-zinc-600' : 'border-zinc-700 group-hover:border-zinc-500'}
          `}>
            {task.completed && <CheckIcon />}
          </div>
          
          {/* テキスト */}
          <div className="flex-1">
            <p className={`text-sm transition-all ${task.type === 'vision' ? 'text-zinc-100 font-medium' : 'text-zinc-400'} ${task.completed ? 'line-through' : ''}`}>
              {task.text}
            </p>
          </div>

          {/* タグ */}
          <span className={`text-[9px] font-mono px-2 py-1 rounded border uppercase tracking-wider
            ${task.type === 'vision' ? 'border-emerald-900/50 text-emerald-500 bg-emerald-950/20' : 'border-zinc-800 text-zinc-600 bg-zinc-900'}
          `}>
            {task.tag}
          </span>
        </div>
      ))}
    </div>
  );
};
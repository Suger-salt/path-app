import React from 'react';
import { TaskList } from './TaskList';
import type { Task } from '@/types';

type Props = {
  title: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  color?: string; // アクセントカラーを指定できるように
};

export const TaskSection = ({ title, tasks, onToggle, color = "text-zinc-500" }: Props) => {
  if (tasks.length === 0) return null; // タスクがないカテゴリは表示しない

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ml-1 ${color}`}>
        {title} <span className="opacity-50 ml-2 text-[9px]">{tasks.length}</span>
      </h3>
      <TaskList tasks={tasks} onToggle={onToggle} />
    </div>
  );
};
"use client";

import React, { useState } from 'react';
import { usePathEngine } from '@/hooks/usePathEngine';
import { Header } from '@/components/Header';
import { TaskSection } from '@/components/TaskSection';
import { MicIcon, SendIcon } from '@/components/icons';

export default function Home() {
  const { tasks, toggleTask, partnerMessage, isThinking, talkToPath } = usePathEngine();
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    talkToPath(inputText);
    setInputText("");
  };

  // --- タスクの分類 ---
  const visionTasks = tasks.filter(t => t.type === 'vision');
  const choreTasks = tasks.filter(t => t.type === 'chore');
  const inboxTasks = tasks.filter(t => t.type !== 'vision' && t.type !== 'chore');

  return (
    <div className="h-screen bg-zinc-950 text-zinc-300 font-sans flex flex-col overflow-hidden">
      
      {/* 1. Header (位置固定ではなく、Flexレイアウトの一部にする) */}
      <div className="shrink-0 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <Header message={partnerMessage} isThinking={isThinking} />
      </div>

      {/* 2. Main (カンバンボードエリア) */}
      {/* overflow-x-auto: 横スクロールを有効化 */}
      {/* flex-row: 子要素を横に並べる */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden pt-8 pb-32 px-6 flex gap-8 items-start scroll-smooth">
        
        {/* 何もタスクがない時のメッセージ */}
        {tasks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <p className="text-xl font-mono tracking-widest">NO PATH YET</p>
          </div>
        )}

        {/* --- カラム 1: Vision --- */}
        <div className="min-w-[320px] w-[320px] shrink-0 flex flex-col max-h-full">
          <TaskSection 
            title="Vision / Goals" 
            tasks={visionTasks} 
            onToggle={toggleTask} 
            color="text-emerald-500"
          />
        </div>

        {/* --- カラム 2: Chores --- */}
        <div className="min-w-[320px] w-[320px] shrink-0 flex flex-col max-h-full">
          <TaskSection 
            title="Daily Chores" 
            tasks={choreTasks} 
            onToggle={toggleTask} 
            color="text-zinc-500"
          />
        </div>

        {/* --- カラム 3: Inbox --- */}
        <div className="min-w-[320px] w-[320px] shrink-0 flex flex-col max-h-full">
          <TaskSection 
            title="Inbox" 
            tasks={inboxTasks} 
            onToggle={toggleTask} 
            color="text-indigo-400"
          />
        </div>

        {/* 余白用ダミー要素（右端が見切れないように） */}
        <div className="w-4 shrink-0"></div>
      </main>

      {/* 3. Footer (入力エリア) */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-6 px-4 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="flex gap-3 items-center">
            <button className="btn-mic">
              <MicIcon />
            </button>

            <div className="flex-1 relative group">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Tell PATH..." 
                className="input-chat"
                disabled={isThinking}
              />
              <button 
                onClick={handleSubmit}
                className="absolute right-2 top-2 h-10 w-10 rounded-full bg-transparent hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 flex items-center justify-center transition disabled:opacity-50"
                disabled={isThinking}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
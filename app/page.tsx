"use client";

import React, { useState } from 'react';

// --- Icons (変更なし) ---
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// --- Main Component ---
export default function Home() {
  const [inputText, setInputText] = useState("");
  const partnerMessage = "…おい、少しペースが落ちてるな。コーヒーでも淹れて、まずは簡単な「メール返信」から片付けないか？";
  
  const [tasks, setTasks] = useState([
    { id: 1, text: "クライアントへの提案資料作成", tag: "WORK", type: "chore", completed: false },
    { id: 2, text: "Rustのチュートリアル進める", tag: "VISION", type: "vision", completed: false },
    { id: 3, text: "ジムに行く", tag: "HEALTH", type: "vision", completed: false },
    { id: 4, text: "牛乳を買う", tag: "LIFE", type: "chore", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans">
      
      {/* Header */}
      <header className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold tracking-[0.2em] text-zinc-100">PATH</h1>
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-mono">
              AI
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border-l-2 border-emerald-600 p-4 rounded-r-lg shadow-lg backdrop-blur-sm">
            <p className="text-[10px] text-emerald-500 font-mono mb-1 uppercase tracking-widest">Partner Insight</p>
            <p className="text-zinc-200 text-sm leading-relaxed">
              {partnerMessage}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-48 pb-32 max-w-2xl mx-auto px-4">
        <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-6 ml-1">Current Path</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group relative flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-300
                ${task.completed ? 'opacity-40 grayscale' : 'opacity-100'}
                ${task.type === 'vision' 
                  ? 'bg-zinc-900/40 border-zinc-800 hover:border-emerald-500/30' 
                  : 'bg-transparent border-transparent hover:bg-zinc-900/50'}
              `}
            >
              <div className={`w-5 h-5 rounded-md border mr-4 flex items-center justify-center transition-colors
                ${task.completed ? 'bg-zinc-600 border-zinc-600' : 'border-zinc-700 group-hover:border-zinc-500'}
              `}>
                {task.completed && <CheckIcon />}
              </div>
              
              <div className="flex-1">
                <p className={`text-sm transition-all ${task.type === 'vision' ? 'text-zinc-100 font-medium' : 'text-zinc-400'} ${task.completed ? 'line-through' : ''}`}>
                  {task.text}
                </p>
              </div>

              <span className={`text-[9px] font-mono px-2 py-1 rounded border uppercase tracking-wider
                ${task.type === 'vision' ? 'border-emerald-900/50 text-emerald-500 bg-emerald-950/20' : 'border-zinc-800 text-zinc-600 bg-zinc-900'}
              `}>
                {task.tag}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-10"></div>
      </main>

      {/* Footer / Input Area */}
      <footer className="fixed bottom-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 items-center">
            
            {/* クラス名を .btn-mic にまとめたのでスッキリ！ */}
            <button className="btn-mic">
              <MicIcon />
            </button>

            <div className="flex-1 relative group">
              {/* クラス名を .input-chat にまとめました */}
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Tell PATH..." 
                className="input-chat"
              />
              <button className="absolute right-2 top-2 h-10 w-10 rounded-full bg-transparent hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 flex items-center justify-center transition">
                <SendIcon />
              </button>
            </div>

          </div>
        </div>
      </footer>
      

    <div>
        hello world!!
    </div>
    </div>
  );
}
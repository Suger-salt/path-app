import React from 'react';

type Props = {
  message: string;
  isThinking: boolean; // AIが考え中かどうか
};

export const Header = ({ message, isThinking }: Props) => {
  return (
    // 修正点: 'fixed top-0' などを削除。親要素(page.tsx)の中で自然に配置されるようにします。
    <div className="w-full transition-all duration-500">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold tracking-[0.2em] text-zinc-100">PATH</h1>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-colors duration-500 ${isThinking ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
            AI
          </div>
        </div>
        
        {/* メッセージバブル */}
        <div className="bg-zinc-900/50 border-l-2 border-emerald-600 p-4 rounded-r-lg shadow-lg backdrop-blur-sm min-h-[80px] flex flex-col justify-center">
          <p className="text-[10px] text-emerald-500 font-mono mb-1 uppercase tracking-widest">
            {isThinking ? 'Processing...' : 'Partner Insight'}
          </p>
          <p className="text-zinc-200 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-500">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
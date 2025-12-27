// hooks/usePathEngine.ts
import { useState } from 'react';
import type { Task, AIResponse } from '@/types';

export const usePathEngine = () => {
  // --- State ---
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: "サンプル: 英語の勉強", tag: "VISION", type: "vision", completed: false },
    { id: '2', text: "サンプル: 牛乳を買う", tag: "LIFE", type: "chore", completed: false },
  ]);
  
  const [partnerMessage, setPartnerMessage] = useState("…準備はいいか？ お前の道（PATH）を進もうぜ。");
  const [isThinking, setIsThinking] = useState(false);

  // --- Actions ---
  
  // タスク完了切り替え
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // AIに話しかける処理
  const talkToPath = async (text: string) => {
    if (!text.trim()) return;
    
    setIsThinking(true);
    
    try {
      // API Routeを叩く
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      const data: AIResponse = await res.json();

      // 相棒の言葉を更新
      setPartnerMessage(data.message);

      // タスク追加アクションならリストに追加
      if (data.action === 'add_task' && data.taskData) {
        const newTask: Task = {
          id: Date.now().toString(),
          text: data.taskData.text,
          tag: data.taskData.tag,
          type: data.taskData.type,
          completed: false,
        };
        setTasks(prev => [newTask, ...prev]);
      }

    } catch (e) {
      setPartnerMessage("…すまん、よく聞こえなかった。もう一度頼む。");
    } finally {
      setIsThinking(false);
    }
  };

  return {
    tasks,
    toggleTask,
    partnerMessage,
    isThinking,
    talkToPath
  };
};
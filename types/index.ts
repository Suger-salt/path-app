// タスクの形
export type Task = {
  id: string; // UUIDなどを使う想定
  text: string;
  tag: 'VISION' | 'WORK' | 'LIFE' | 'HEALTH';
  type: 'vision' | 'chore';
  completed: boolean;
};

// AIからの応答データの形
export type AIResponse = {
  action: 'add_task' | 'chat'; // AIが何をしようとしたか
  message: string;             // 相棒からの言葉
  taskData?: {                 // タスク追加時のみ存在
    text: string;
    tag: Task['tag'];
    type: Task['type'];
  };
};
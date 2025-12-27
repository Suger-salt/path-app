// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 相棒の人格とルールの定義
const SYSTEM_PROMPT = `
あなたはユーザーのハードボイルドな相棒「PATH」です。
ユーザーの発言を入力として受け取り、以下のJSON形式で応答してください。

【ルール】
1. ユーザーが「〜したい」「〜買う」「〜しなきゃ」等のタスクを言った場合:
   action: "add_task" にし、タスク情報を抽出してください。
   typeは、人生の目標や学習なら "vision"、雑務なら "chore" に分類してください。
   tagは "VISION", "WORK", "LIFE", "HEALTH" から選んでください。

2. 単なる会話や弱音、相談の場合:
   action: "chat" にし、次元大介のようなハードボイルドで短い返答を message に入れてください。

【出力JSONフォーマット】
{
  "action": "add_task" | "chat",
  "message": "相棒としての返答（タスク追加時も「了解」など短く）",
  "taskData": {
    "text": "タスク名",
    "tag": "WORK",
    "type": "chore"
  } // actionがchatの場合は不要
}
Do not use markdown code blocks. Just raw JSON.
`;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // または gemini-pro

    const result = await model.generateContent([
      SYSTEM_PROMPT,
      `User Input: ${text}`
    ]);

    const responseText = result.response.text();
    
    // JSONとしてパースして返す
    // (GeminiがたまにMarkdown記号を含めることがあるので除去)
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      action: "chat", 
      message: "…悪い、通信が混線してるようだ。（エラーが発生しました）" 
    });
  }
}
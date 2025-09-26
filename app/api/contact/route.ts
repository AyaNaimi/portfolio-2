import { NextResponse } from "next/server";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

const JSON_SERVER_URL = "http://localhost:3002/messages";

export async function POST(request: Request) {
  try {
    const newMessage: Omit<Message, "id" | "timestamp"> = await request.json();
    const messageWithTimestamp = { ...newMessage, timestamp: new Date().toISOString() };
    const response = await fetch(JSON_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageWithTimestamp),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const createdMessage: Message = await response.json();
    return NextResponse.json(createdMessage, { status: 201 });
  } catch (error) {
    console.error("Error sending message to json-server:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await fetch(JSON_SERVER_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const messages: Message[] = await response.json();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages from json-server:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

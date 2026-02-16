"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    time: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to Stitchera Support! How can I help you today?", sender: "bot", time: "Now" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const userMsg: Message = { id: Date.now(), text: input, sender: "user", time };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        // Simulated bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                text: "Thank you for reaching out! Our support team will get back to you shortly. In the meantime, you can check our FAQ section for common queries.",
                sender: "bot",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <Card className="bg-slate-900/50 border-slate-800 h-[70vh] flex flex-col">
                    <CardHeader className="border-b border-slate-800">
                        <CardTitle className="text-white flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-purple-400" /> Live Chat Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex items-start gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-purple-500/20" : "bg-slate-800"
                                        }`}>
                                        {msg.sender === "user" ? <User className="h-4 w-4 text-purple-400" /> : <Bot className="h-4 w-4 text-slate-400" />}
                                    </div>
                                    <div className={`rounded-2xl px-4 py-2.5 ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                            : "bg-slate-800 text-slate-300"
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-purple-200" : "text-slate-500"}`}>{msg.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-4 border-t border-slate-800">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type your message..."
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                            <Button onClick={sendMessage} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}

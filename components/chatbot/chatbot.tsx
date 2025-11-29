"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  X,
  Send,
  Loader,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import {
  generateChatResponse,
  getFallbackResponse,
  type ChatMessage,
} from "@/lib/ai-client";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm PAVIT AI, your intelligent assistant for PavitInfoTech. I can help you with:\n\n• Product features & capabilities\n• Pricing plans\n• IoT monitoring questions\n• Demo scheduling\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Build conversation history for context
  const getConversationHistory = useCallback((): ChatMessage[] => {
    return messages.map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    }));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue.trim();

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the AI API with conversation history
      const conversationHistory = getConversationHistory();
      const response = await generateChatResponse(
        userInput,
        conversationHistory
      );

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsOnline(true);
    } catch {
      // Fallback to pattern-based responses if API fails
      const fallbackContent = getFallbackResponse(userInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: fallbackContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Chat cleared! I'm PAVIT AI, ready to help you with PavitInfoTech. What would you like to know?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40'
        aria-label='Open chat'
      >
        {isOpen ? (
          <X className='w-6 h-6' />
        ) : (
          <MessageCircle className='w-6 h-6' />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className='fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] sm:h-[600px] flex flex-col shadow-xl z-40'>
          {/* Header */}
          <div className='bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Sparkles className='w-5 h-5' />
              <div>
                <h3 className='font-semibold'>PAVIT AI</h3>
                <p className='text-xs opacity-90'>
                  {isOnline ? "AI-Powered • Online" : "Offline Mode"}
                </p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleClearChat}
              className='text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8 p-0'
              title='Clear chat'
            >
              <RotateCcw className='w-4 h-4' />
            </Button>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start'>
                <div className='bg-muted text-foreground px-4 py-3 rounded-lg flex items-center gap-2'>
                  <Loader className='w-4 h-4 animate-spin' />
                  <span className='text-sm text-muted-foreground'>
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className='p-4 border-t border-border'
          >
            <div className='flex gap-2'>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Ask me anything...'
                disabled={isLoading}
                className='text-sm'
              />
              <Button
                type='submit'
                size='sm'
                disabled={isLoading || !inputValue.trim()}
                className='px-3'
              >
                <Send className='w-4 h-4' />
              </Button>
            </div>
            <p className='text-xs text-muted-foreground mt-2 text-center'>
              Powered by PAVIT AI
            </p>
          </form>
        </Card>
      )}
    </>
  );
}

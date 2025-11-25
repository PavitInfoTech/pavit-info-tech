"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Loader } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const botResponses: { [key: string]: string } = {
  "hello|hi|hey":
    "Hello! Welcome to PavitInfoTech. How can I help you today? I can assist with:\n• Product information\n• Pricing plans\n• Features overview\n• Demo scheduling",
  "pricing|cost|plan":
    "We offer three plans:\n\n• Starter ($299/month) - Real-time monitoring + basic analytics\n• Pro ($999/month) - Predictive maintenance + anomaly detection\n• Enterprise (Custom) - Full IoT suite + digital twins\n\nWould you like to know more about any plan?",
  feature:
    "Our key features include:\n• Real-time device monitoring\n• AI anomaly detection\n• Predictive maintenance\n• Digital twin visualization\n• Device health scoring\n• Secure cloud pipeline\n\nWhat feature interests you most?",
  "demo|trial":
    "Great! I can help you schedule a demo or start a free trial. Please visit our Get Started page or I can connect you with our sales team. What's your email?",
  "support|help":
    "I'm here to help! You can:\n• Browse our documentation\n• Contact support@pavitinfotech.com\n• Schedule a demo\n• Chat with me directly\n\nWhat do you need assistance with?",
  default:
    "Thank you for your question! I'm an AI assistant here to help with information about PavitInfoTech. Could you provide more details about what you're interested in?",
}

function findBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  for (const [keywords, response] of Object.entries(botResponses)) {
    if (keywords !== "default") {
      const keywordArray = keywords.split("|")
      if (keywordArray.some((keyword) => lowerMessage.includes(keyword))) {
        return response
      }
    }
  }

  return botResponses.default
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! Welcome to PavitInfoTech. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: findBotResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-full h-[600px] flex flex-col shadow-xl z-40">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">PavitInfoTech Assistant</h3>
            <p className="text-xs opacity-90">Online • Average response time: 30s</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-line ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                  <Loader className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="text-sm"
              />
              <Button type="submit" size="sm" disabled={isLoading || !inputValue.trim()} className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}

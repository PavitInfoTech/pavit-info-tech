"use client"

interface PasswordStrengthIndicatorProps {
  score: number
  level: "weak" | "medium" | "strong" | "very-strong"
}

export function PasswordStrengthIndicator({ score, level }: PasswordStrengthIndicatorProps) {
  const levelColors = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-blue-500",
    "very-strong": "bg-green-500",
  }

  const levelLabels = {
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    "very-strong": "Very Strong",
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Password Strength</span>
        <span className="font-semibold">{levelLabels[level]}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${levelColors[level]} transition-all duration-300`}
          style={{ width: `${(score / 8) * 100}%` }}
        />
      </div>
    </div>
  )
}

/**
 * Password strength validator
 * Returns strength level: weak, medium, strong, very-strong
 */
export function calculatePasswordStrength(password: string): {
  score: number
  level: "weak" | "medium" | "strong" | "very-strong"
  feedback: string[]
} {
  let score = 0
  const feedback: string[] = []

  if (!password) {
    return { score: 0, level: "weak", feedback: ["Password is required"] }
  }

  // Length checks
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  // Character type checks
  if (/[a-z]/.test(password)) score += 1
  else feedback.push("Add lowercase letters")

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push("Add uppercase letters")

  if (/\d/.test(password)) score += 1
  else feedback.push("Add numbers")

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 1
  else feedback.push("Add special characters")

  // Determine level based on score
  let level: "weak" | "medium" | "strong" | "very-strong"
  if (score < 3) {
    level = "weak"
    if (password.length < 8) feedback.push("Use at least 8 characters")
  } else if (score < 5) {
    level = "medium"
  } else if (score < 7) {
    level = "strong"
  } else {
    level = "very-strong"
  }

  return { score: Math.min(score, 8), level, feedback }
}

export function isPasswordValid(password: string): boolean {
  const { level } = calculatePasswordStrength(password)
  return level !== "weak"
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

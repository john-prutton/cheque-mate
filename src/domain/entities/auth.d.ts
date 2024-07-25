type User = {
  id: string
  email: string
  name: string
}

type Session = {
  id: string
  expiresAt: Date
  userId: string
}

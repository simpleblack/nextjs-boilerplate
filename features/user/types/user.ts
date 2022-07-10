export type Users = {
  items: User[]
  total: number
}

export type User = {
  id: string
  updated_at: Date
  created_at: Date
  hobbies: string[]
  age: number
  name: string
  score: number
}
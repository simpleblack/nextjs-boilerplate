export type Posts = {
  items: Post[]
  total: number
}

export type Post = {
  id: string
  updated_at: Date
  created_at: Date
  title: string
  content: string
  count: number
}
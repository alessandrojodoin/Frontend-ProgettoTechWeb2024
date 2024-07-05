export type Idea = {
    title: string,
    description: string,
    upvotes: number,
    downvotes: number,
    createdAt: Date,
    author: User,
    comments: Reply[]
}

export type User = {
    username: string
}

export type Reply = {
    text: string,
    replyTo: Idea
}
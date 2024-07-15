import { UrlSerializer } from "@angular/router"

export type Idea = {
    id: number,
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
    id: number,
    text: string,
    replyTo: Idea
}

export type Vote = {
    user: User,
    idea: Idea,
    type: "upvote" | "downvote" | null;
}
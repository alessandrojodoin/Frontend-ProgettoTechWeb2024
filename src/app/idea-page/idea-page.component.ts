import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Idea } from '../../types';

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {
  @Input() idea: Idea = {
    id: 20,
    title: "Title",
    description: "Description",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date('December 17, 1995 03:24:00'),
    author: {
      username: "Test User"
    },
    comments: []
  };
}

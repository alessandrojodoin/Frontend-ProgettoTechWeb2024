import { Component, Input } from '@angular/core';
import { Idea } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-idea-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './idea-preview.component.html',
  styleUrl: './idea-preview.component.scss'
})
export class IdeaPreviewComponent {

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

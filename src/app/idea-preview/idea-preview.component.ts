import { Component, Input } from '@angular/core';
import { Idea } from '../../types';

@Component({
  selector: 'app-idea-preview',
  standalone: true,
  imports: [],
  templateUrl: './idea-preview.component.html',
  styleUrl: './idea-preview.component.scss'
})
export class IdeaPreviewComponent {

  @Input() idea: Idea = {
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
  
  ngOnInit(){
    
  }

}

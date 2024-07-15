import { Component, inject, Input } from '@angular/core';
import { Idea } from '../../types';
import { RouterLink } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-idea-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './idea-preview.component.html',
  styleUrl: './idea-preview.component.scss'
})
export class IdeaPreviewComponent {
  private rest = inject(RestBackendService);
  auth = inject(AuthService);

  @Input() idea: Idea = {
    id: 20,
    title: "Title",
    description: "Description",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(1721002952),
    author: {
      username: "Test User"
    },
    comments: []
  };

  userVote: "upvote" | "downvote" | null = null;
  
  ngOnInit(){
    this.rest.getUserVote(this.idea.id).subscribe({
      next: (vote) => {
        if(vote.type !== undefined && (vote.type === "upvote" || vote.type === "downvote")){
          this.userVote = vote.type;
        }
        else{
          this.userVote = null;
        }
      }
    })
    console.log(typeof this.idea.createdAt);
  }


  onUpvote(){
    this.rest.sendVote(this.idea.id, "upvote").subscribe();
    this.idea.upvotes++;
    if(this.userVote === "downvote"){
      this.idea.downvotes--;
    }
    this.userVote = "upvote";
  }
  onDownvote(){
    this.rest.sendVote(this.idea.id, "downvote").subscribe();
    this.idea.downvotes++;
    if(this.userVote === "upvote"){
      this.idea.upvotes--;
    }
    this
    this.userVote = "downvote";
  }
  onCancel(){
    this.rest.cancelVote(this.idea.id).subscribe();
    if(this.userVote === "upvote"){
      this.idea.upvotes--;
    }
    if(this.userVote === "downvote"){
      this.idea.downvotes--;
    }
    this.userVote = null;
  }


}

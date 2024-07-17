import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { Idea, Reply } from '../../types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend.service';
import { AuthService } from '../_services/auth.service';
import { CommentComponent } from '../comment/comment.component';
import { SubmitCommentComponent } from "../submit-comment/submit-comment.component";

@Component({
  selector: 'app-idea-page',
  standalone: true,
  imports: [CommentComponent, RouterLink, SubmitCommentComponent],
  templateUrl: './idea-page.component.html',
  styleUrl: './idea-page.component.scss'
})
export class IdeaPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private rest = inject(RestBackendService)
  private router = inject(Router);

  comments: Reply[] = [];

  auth = inject(AuthService);

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.rest.getIdea(id).subscribe({
      next: (idea) => {
        this.idea = idea;


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
        
        //Fetch comments
        this.updateComments();
      }
    })

  }

 idea: Idea = {
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


  userVote: "upvote" | "downvote" | null = null;
  



  onUpvote(){
    this.rest.sendVote(this.idea.id, "upvote").subscribe();
    this.idea.upvotes++;
    if(this.userVote === "downvote"){
      this.idea.downvotes--;
    }
    this.userVote = "upvote";
    console.log(this.idea);
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

  onDelete(){
    this.rest.deleteIdea(this.idea.id).subscribe();
    setTimeout( () => {
      this.router.navigate(["/feed"]);
    }, 30)

  }

 updateComments(){
  this.rest.getComments(this.idea.id).subscribe({
    next: (comments) => {
      this.comments = comments;
    }
  })
 }




}

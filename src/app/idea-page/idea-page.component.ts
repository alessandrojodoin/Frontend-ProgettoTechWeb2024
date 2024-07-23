import { Component, inject, SecurityContext } from '@angular/core';
import { Input } from '@angular/core';
import { Idea, Reply } from '../../types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestBackendService } from '../_services/rest-backend.service';
import { AuthService } from '../_services/auth.service';
import { CommentComponent } from '../comment/comment.component';
import { SubmitCommentComponent } from "../submit-comment/submit-comment.component";
import Showdown from 'showdown';
import { DomSanitizer } from '@angular/platform-browser';

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
  converter = new Showdown.Converter();
  sanitizer = inject(DomSanitizer);

  comments: Reply[] = [];

  auth = inject(AuthService);

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.rest.getIdea(id).subscribe({
      next: (idea) => {
        this.idea = idea;
        //this.sanitizedDescription = this.sanitizer.sanitize(SecurityContext.HTML ,idea.description) as string;


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

        this.scaleVoteBars();
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

  //sanitizedDescription = "";
  

  userVote: "upvote" | "downvote" | null = null;
  
  upvotePercent = 0;
  downvotePercent = 0;

  scaleVoteBars(){
    const totalVotes = this.idea.upvotes + this.idea.downvotes;
    if(totalVotes === 0){
      this.upvotePercent = 50;
      this.downvotePercent = 50;
    }
    else{
      this.upvotePercent = (this.idea.upvotes / totalVotes) * 100;
      this.downvotePercent = 100 - this.upvotePercent;
    }


    if(this.upvotePercent <= 20){
      this.upvotePercent = 20;
      this.downvotePercent = 80;
    }
    else if(this.upvotePercent > 80){
      this.upvotePercent = 80;
      this.downvotePercent = 20;
    }

  }


  onUpvote(){
    this.rest.sendVote(this.idea.id, "upvote").subscribe();
    this.idea.upvotes++;
    if(this.userVote === "downvote"){
      this.idea.downvotes--;
    }
    this.userVote = "upvote";
    this.scaleVoteBars();
  }
  onDownvote(){
    this.rest.sendVote(this.idea.id, "downvote").subscribe();
    this.idea.downvotes++;
    if(this.userVote === "upvote"){
      this.idea.upvotes--;
    }
    this
    this.userVote = "downvote";
    this.scaleVoteBars();
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
    this.scaleVoteBars();
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

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';

@Component({
  selector: 'app-submit-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './submit-comment.component.html',
  styleUrl: './submit-comment.component.scss'
})
export class SubmitCommentComponent {

  @Input() ideaId: number | null = null;
  @Output() commentSubmitted = new EventEmitter();
  
  private rest = inject(RestBackendService);
  commentForm = new FormGroup({
    content: new FormControl('',
      Validators.required
    )
  })
  
  onSubmit(){
    if(this.ideaId !== null){
      this.rest.postComment(this.commentForm.value.content as string, this.ideaId).subscribe({
        complete: () => {
          this.commentSubmitted.emit();
        }
      });
    }
  }
  
}

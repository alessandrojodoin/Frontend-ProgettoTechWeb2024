import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  commentForm = new FormGroup({
    content: new FormControl('',
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)]
    )
  })
  
  onSubmit(){
    if(this.commentForm.invalid){
      if(this.commentForm.value.content === ""){
        this.toastr.error("Please specify contents");
      }
      if((this.commentForm.value.content as string).length > 200){
        this.toastr.error(`Content is too long (${(this.commentForm.value.content as string).length} characters, limit is 200)`);
      }

    }
    else if(this.ideaId !== null){
      this.rest.postComment(this.commentForm.value.content as string, this.ideaId).subscribe({
        complete: () => {
          this.toastr.success("Comment succesfully submitted", "Success");
          this.commentSubmitted.emit();
        }
      });
    }
  }
  
}

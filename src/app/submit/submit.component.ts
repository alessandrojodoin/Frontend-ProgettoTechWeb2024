import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.scss'
})
export class SubmitComponent {
  private rest = inject(RestBackendService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  ideaForm = new FormGroup({
    title: new FormControl('',
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)]
    ),
    description: new FormControl('',
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(400)]
    )
  })

  onSubmit(){
    if(this.ideaForm.invalid){
      if(this.ideaForm.value.title === ""){
        this.toastr.error("Please specify a title");
      }
      if(this.ideaForm.value.description === ""){
        this.toastr.error("Please specify a description");
      }
      if((this.ideaForm.value.title as string).length > 50){
        this.toastr.error(`Title is too long (${(this.ideaForm.value.title as string).length} characters, limit is 50)`);
      }
      if((this.ideaForm.value.description as string).length > 400){
        this.toastr.error(`Description is too long (${(this.ideaForm.value.description as string).length} characters, limit is 50)`);
      }
    }
    else{
      this.rest.postIdea({
        title: this.ideaForm.value.title as string,
        description: this.ideaForm.value.description as string
      }).subscribe({
        next: () => {
          this.toastr.success("Idea was succesfully submitted", "Success");
          this.router.navigate(["/feed"]);
        }
      });
    }

  }
}


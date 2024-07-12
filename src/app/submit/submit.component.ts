import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.scss'
})
export class SubmitComponent {
  private rest = inject(RestBackendService);
  ideaForm = new FormGroup({
    title: new FormControl('',
      Validators.required,
    ),
    description: new FormControl('',
      Validators.required
    )
  })

  onSubmit(){
    this.rest.postIdeas({
      title: this.ideaForm.value.title as string,
      description: this.ideaForm.value.description as string
    }).subscribe();
  }
}


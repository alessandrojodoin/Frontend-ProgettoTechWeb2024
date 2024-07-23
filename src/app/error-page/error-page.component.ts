import { Component, inject } from '@angular/core';
import { ErrorHandlerService } from '../_services/error-handler.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  errorService = inject(ErrorHandlerService);
  
  
}

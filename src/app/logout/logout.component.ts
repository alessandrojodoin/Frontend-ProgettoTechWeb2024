import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(){
    this.auth.logout();
    setTimeout(() => {
      this.router.navigate([""]);
    }, 4000);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

onSubmit(): void {
  const { username, password } = this.form;
  this.errorMessage = '';

  this.http.post('https://localhost:7015/api/Login/login', { username, password }, { responseType: 'text' })
    .subscribe({
      next: (res: string) => {
        const trimmed = res.trim();

        // 1. Detect if the backend sent an error message disguised as a 200 OK
        const lower = trimmed.toLowerCase();
        if (
          lower.includes('invalid') ||
          lower.includes('not found') ||
          lower.includes('incorrect') ||
          lower.includes('error') ||
          lower.includes('fail') ||
          trimmed.length < 20
        ) {
          this.errorMessage = trimmed || 'Invalid username or password.';
          return;
        }

        // 2. Extract valid token and user ID
        let token = trimmed;
        let userId = 1;

        try {
          const parsed = JSON.parse(trimmed);
          token = parsed.id_token || parsed.token || trimmed;
          userId = parsed.id || parsed.userId || 1;
        } catch (e) {
          token = trimmed;
          try {
            const payload = JSON.parse(atob(trimmed.split('.')[1]));
            userId = payload.nameid || payload.sub || payload.id || 1;
          } catch (_) {}
        }

        // 3. Save only valid session credentials
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(Number(userId));
        this.authService.isLoggedIn = true;

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }  
}
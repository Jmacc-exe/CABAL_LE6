import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  form: any = {
    title: '',
    body: ''
  };
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.tokenStorage.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    const token = this.tokenStorage.getToken();
    const rawUserId = this.tokenStorage.getUser();
    const userId = rawUserId ? parseInt(rawUserId, 10) : 1;

    // Set authorization header with the JWT token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Matches the backend PostForm schema
    const postPayload = {
      title: this.form.title,
      body: this.form.body,
      userId: isNaN(userId) ? 1 : userId,
      Title: this.form.title,
      Body: this.form.body,
      UserId: isNaN(userId) ? 1 : userId
    };

    // Correct URL matching Swagger: /api/Post/add
    this.http.post('https://localhost:7015/api/Post/add', postPayload, {
      headers,
      responseType: 'text'
    }).subscribe({
      next: () => {
        // Redirect to homepage feed and refresh to display the newly published post
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Add post error:', err);
        if (err.status === 401) {
          this.errorMessage = 'Session expired. Please log out and log back in.';
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid submission. Please ensure title and body are not empty.';
        } else {
          this.errorMessage = 'Failed to publish post. Please check backend console for details.';
        }
      }
    });
  }
}
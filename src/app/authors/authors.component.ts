import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId: number;
  author: any;
  errorMessage: string;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.get(`http://localhost:8080/books-api/authors/${this.authorId}`)
      .subscribe({
        next: (data) => {
          this.author = data;
          this.errorMessage = '';
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'Author not found.';
          } else {
            this.errorMessage = 'An error occurred.';
          }
          this.author = null;
        }
      });
  }
}

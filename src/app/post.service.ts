import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './model/post.model';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  readonly posts$ = this.postsSubject.asObservable();

  private singlePostSubject = new BehaviorSubject<Post>(null);
  readonly singlePost$ = this.singlePostSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getPosts() {
    this.http
      .get<Post[]>(`${environment.blogApiUrl}/post`)
      .subscribe(posts => this.postsSubject.next(posts));
  }

  getSinglePost(postId: string) {
    this.http.get<Post>(`${environment.blogApiUrl}/post/${postId}`).subscribe({
      next: post => this.singlePostSubject.next(post),
      error: error => {
        if (error?.error?.message === "Post with this id don't exist") {
          this.router.navigate(['page-not-found']);
        }
      },
    });
  }

  createPost(post: FormData) {
    this.http
      .post(`${environment.blogApiUrl}/post/upload`, post, {
        withCredentials: true,
      })
      .subscribe();
  }

  updatePost(post: FormData, postId: string) {
    this.http
      .patch(`${environment.blogApiUrl}/post/${postId}`, post, {
        withCredentials: true,
      })
      .subscribe();
  }

  deletePost(postId: string) {
    this.http
      .delete(`${environment.blogApiUrl}/post/${postId}`, {
        withCredentials: true,
      })
      .subscribe();
  }
}

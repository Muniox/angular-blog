import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './model/post.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  readonly posts$ = this.postsSubject.asObservable();

  private singlePostSubject = new BehaviorSubject<Post>(null);
  readonly singlePost$ = this.singlePostSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<Post[]>(`${environment.blogApiUrl}/post`)
      .subscribe(posts => this.postsSubject.next(posts));
  }

  getSinglePost(postId: string) {
    this.http
      .get<Post>(`${environment.blogApiUrl}/post/${postId}`)
      .subscribe(post => this.singlePostSubject.next(post));
  }

  createPost(post: FormData) {
    this.http
      .post(`${environment.blogApiUrl}/post/upload`, post, {
        withCredentials: true,
      })
      .subscribe();
  }
}

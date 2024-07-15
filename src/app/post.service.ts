import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './model/post.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postSubject = new BehaviorSubject<Post[]>([]);
  readonly post$ = this.postSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<Post[]>(environment.blogApiUrl + '/post')
      .subscribe(posts => this.postSubject.next(posts));
  }
}

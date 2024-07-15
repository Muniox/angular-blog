import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();

    this.posts$ = this.postService.posts$;

    // this.posts$.subscribe(posts => {
    //   console.log(posts);
    // });
  }
}

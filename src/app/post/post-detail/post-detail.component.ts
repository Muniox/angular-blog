import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post> | null = null;
  url: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {
    this.url = this.configService.apiUrl;
  }

  ngOnInit(): void {
    const postId: string = this.route.snapshot.params.id;
    this.postService.getSinglePost(postId);

    this.post$ = this.postService.singlePost$;
  }
}

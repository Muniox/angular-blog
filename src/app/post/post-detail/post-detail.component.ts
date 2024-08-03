import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ConfigService } from '../../config.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../types/user.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post | null = null;
  user$: Observable<User> | null = null;
  url: string;
  subscriptions: Subscription = new Subscription();
  postId: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private authService: AuthService
  ) {
    this.url = this.configService.apiUrl;
  }

  // TODO: jeśli pobraliśmy wczesnej listę to wybierz tylko item/post, jeśli odświeżyliśmy stronę i nie mamy listy z której chcemy pobrać item to musimy go sami pobrać, jeśli go nie znajdziemy dajemy 404
  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;

    this.subscriptions.add(
      this.postService.posts$
        .pipe(
          map(posts => {
            return posts.find(post => post.id === this.postId);
          })
        )
        .subscribe(post => {
          this.post = post ?? null;
        })
    );

    // this.post$ = this.postService.singlePost$;
    this.user$ = this.authService.user$;

    if (!this.post) {
      this.postService.getSinglePost(this.postId);
      this.subscriptions.add(
        this.postService.singlePost$.subscribe(post => {
          this.post = post;
        })
      );
    }
  }

  onDeletePost() {
    console.log('post deleted!');
    this.postService.deletePost(this.postId);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

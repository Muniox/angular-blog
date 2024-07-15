import {
  Component,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../model/post.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post> | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const postId: string = this.route.snapshot.params.id;
    this.postService.getSinglePost(postId);

    this.post$ = this.postService.singlePost$;
  }

  sanitizeDescription(description: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, description);
  }
}

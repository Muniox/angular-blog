import { Component, Input } from '@angular/core';
import { Post } from '../../../model/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post: Post;
}

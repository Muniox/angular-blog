import {
  Component,
  Input,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import { Post } from '../../../model/post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostItemComponent implements OnInit {
  @Input({ required: true }) post: Post;
  sanitizedDescriptionShort: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const sanitizedDescription = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.post.description
    );

    this.sanitizedDescriptionShort =
      sanitizedDescription.length > 300
        ? `${sanitizedDescription.substring(0, 300)}...`
        : sanitizedDescription;
  }
}

import {
  Component,
  Input,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import { Post } from '../../../model/post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostItemComponent implements OnInit {
  @Input({ required: true }) post: Post;
  sanitizedDescriptionShort: string;
  url: string;

  constructor(
    private configService: ConfigService,
    private sanitizer: DomSanitizer
  ) {
    this.url = this.configService.apiUrl;
  }

  //TODO: turn off sanitizing!
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

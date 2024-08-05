import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WritePostComponent implements OnInit, OnDestroy {
  selectedFile: File;
  postId: string | null = null;
  post: Post | null = null;
  editMode = true;
  subscriptions = new Subscription();
  postForm = new FormGroup({
    file: new FormControl<string>(null),
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl<string>(null),
  });

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.postId = this.route.snapshot.params.id ?? null;

    this.subscriptions.add(
      this.postService.posts$
        .pipe(
          map(posts => {
            return posts.find(post => post.id === this.postId);
          })
        )
        .subscribe(post => {
          this.post = post ?? null;

          if (this.post) {
            this.postForm.controls.category.setValue(this.post?.category);
            this.postForm.controls.description.setValue(this.post?.description);
            this.postForm.controls.title.setValue(this.post?.title);
          }
        })
    );

    if (!this.post && this.editMode) {
      this.postService.getSinglePost(this.postId);
      this.subscriptions.add(
        this.postService.singlePost$.subscribe(post => {
          this.post = post ?? null;

          if (this.post) {
            this.postForm.controls.category.setValue(this.post?.category);
            this.postForm.controls.description.setValue(this.post?.description);
            this.postForm.controls.title.setValue(this.post?.title);
          }
        })
      );
    }
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
  }

  onPostFormSubmit() {
    const formData = new FormData();
    formData.append('title', this.postForm.controls.title.value);
    formData.append('description', this.postForm.controls.description.value);
    formData.append('file', this.selectedFile);
    formData.append('category', this.postForm.controls.category.value);

    console.log(this.postForm.controls.description.value);
    console.log(formData.getAll('file'));
    this.postService.createPost(formData);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

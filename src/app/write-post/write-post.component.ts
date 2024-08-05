import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    file: new FormControl<string>(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl<string>('Other', [Validators.required]),
  });

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  setFormValues(post: Post | null) {
    if (post && this.editMode) {
      this.postForm.controls.category.setValue(post.category);
      this.postForm.controls.description.setValue(post.description);
      this.postForm.controls.title.setValue(post.title);
    }
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id ?? null;
    this.editMode = !!this.postId;

    this.subscriptions.add(
      this.postService.posts$
        .pipe(
          map(posts => {
            return posts.find(post => post.id === this.postId);
          })
        )
        .subscribe(post => {
          this.post = post ?? null;
          this.setFormValues(post);
        })
    );

    if (!this.post && this.editMode) {
      this.postService.getSinglePost(this.postId);
      this.subscriptions.add(
        this.postService.singlePost$.subscribe(post => {
          this.post = post ?? null;
          this.setFormValues(post);
        })
      );
    }

    console.log(this.postForm);
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
  }

  onPostFormSubmit() {
    const formData = new FormData();
    formData.append('title', this.postForm.controls.title.value);
    formData.append('description', this.postForm.controls.description.value);
    formData.append('file', this.selectedFile);
    formData.append('category', this.postForm.controls.category.value ?? '');

    if (!this.editMode) {
      this.postService.createPost(formData);
    } else {
      this.postService.updatePost(formData, this.postId);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

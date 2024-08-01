import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class WritePostComponent {
  selectedFile: File;
  postForm = new FormGroup({
    file: new FormControl<string>(null),
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl<string>(null),
  });

  constructor(private postService: PostService) {}

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
}

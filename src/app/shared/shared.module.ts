import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { QuillModule } from 'ngx-quill';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    QuillModule.forRoot(),
  ],
  exports: [
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    QuillModule,
  ],
})
export class SharedModule {}

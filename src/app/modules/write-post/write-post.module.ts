import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WritePostComponent } from './write-post.component';

@NgModule({
  declarations: [WritePostComponent],
  imports: [CommonModule, SharedModule],
  exports: [WritePostComponent],
})
export class WritePostModule {}

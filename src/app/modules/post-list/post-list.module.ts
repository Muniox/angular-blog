import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PostItemComponent } from './post-item/post-item.component';

const routes: Routes = [{ path: ':id', component: PostDetailComponent }];

@NgModule({
  declarations: [PostDetailComponent, PostListComponent, PostItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    // RouterModule.forChild(routes)
  ],
  exports: [PostListComponent],
})
export class PostListModule {}

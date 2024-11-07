import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PostListModule } from '../post-list/post-list.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostListModule,
    RouterModule.forChild(routes),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}

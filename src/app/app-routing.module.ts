import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WritePostComponent } from './modules/write-post/write-post.component';
import { PostDetailComponent } from './modules/post-list/post-detail/post-detail.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(module => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/core.module').then(module => module.CoreModule),
  },
  { path: 'post/:id', component: PostDetailComponent },
  // {
  //   path: 'post',
  //   loadChildren: () =>
  //     import('./modules/post-list/post-list.module').then(
  //       module => module.PostListModule
  //     ),
  // },
  { path: 'write', component: WritePostComponent },
  { path: 'write/:id', component: WritePostComponent },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

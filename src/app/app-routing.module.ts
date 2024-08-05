import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthComponent } from './auth/auth.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WritePostComponent } from './write-post/write-post.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'write', component: WritePostComponent },
  { path: 'write/:id', component: WritePostComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

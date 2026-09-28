import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Routes = [
  { path: '', component: ListPostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'add-post', component: AddPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
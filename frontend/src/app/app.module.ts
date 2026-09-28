import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPostsComponent,
    PostDetailComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
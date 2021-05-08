import { Component } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';
  posts: Post[] = [];

  onPostAdded(post) {
    this.posts.push(post);
  }

  onPostDeleted() {
    this.posts.pop();
  }
}

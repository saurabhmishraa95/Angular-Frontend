import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
      .get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  addPost(post: Post) {
    this.httpClient
      .post('http://localhost:3000/api/post', post)
      .subscribe((res) => {
        this.getPosts();
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  deletePost() {
    this.posts.pop();
    this.postsUpdated.next([...this.posts]);
  }
}

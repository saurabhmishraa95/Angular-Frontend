import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getPosts() {
    this.httpClient
      .get<[post: any]>('http://localhost:3000/api/posts')
      .pipe(
        map((getPostsResponse) => {
          return getPostsResponse.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            } as Post;
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(postId: string): Observable<Post> {
    return this.httpClient.get<Post>(
      'http://localhost:3000/api/posts/' + postId
    );
  }

  updatePost(id: string, post: Post) {
    this.httpClient
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(() => {
        this.router.navigate([`/`], { relativeTo: this.route });
      });
  }

  addPost(post: Post) {
    this.httpClient
      .post<{ id: string }>('http://localhost:3000/api/posts', post)
      .subscribe((res) => {
        post.id = res.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  deletePost(id: string) {
    this.httpClient
      .delete('http://localhost:3000/api/posts/' + id)
      .subscribe(() => {
        this.posts.splice(
          this.posts.findIndex((p) => p.id === id),
          1
        );
        this.postsUpdated.next([...this.posts]);
      });
  }
}

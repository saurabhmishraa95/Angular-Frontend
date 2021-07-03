import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSubscription: Subscription;
  private authStatusSubscription: Subscription;
  isUserAuthenticated = false;
  constructor(
    public postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscription = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.isUserAuthenticated = this.authService.IsAuthenticated;
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((status) => {
        this.isUserAuthenticated = status;
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }
}

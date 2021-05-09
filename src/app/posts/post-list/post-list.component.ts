import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postSubscription = this.postService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}

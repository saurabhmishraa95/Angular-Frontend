import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  postForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe((post) => {
          this.postForm.patchValue({
            title: post.title,
            content: post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.postForm.invalid) return;
    const post: Post = {
      title: this.postForm.get('title').value,
      content: this.postForm.get('content').value,
    };
    if (this.mode == 'create') this.postService.addPost(post);
    else this.postService.updatePost(this.postId, post);
    this.postForm.reset();
  }
}

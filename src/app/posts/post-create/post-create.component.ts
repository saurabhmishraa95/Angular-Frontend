import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  content: string = '';
  title: string = '';
  @Output() addPost = new EventEmitter();
  @Output() deletePost = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onAddPost() {
    if (this.content.length === 0 && this.title.length === 0) return;
    const post: Post = { title: this.title, content: this.content };
    this.addPost.emit(post);
    this.content = '';
    this.title = '';
  }

  onDeletePost() {
    this.deletePost.emit();
  }
}

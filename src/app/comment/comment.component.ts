import { Component, Input } from '@angular/core';
import { Reply } from '../../types';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment: Reply = {
    text: "Test",
    id: 1,
    author: {
      username: "TestUser"
    }
  } as Reply;
}

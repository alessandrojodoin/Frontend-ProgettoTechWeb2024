import { Component } from '@angular/core';
import { IdeaPreviewComponent } from '../idea-preview/idea-preview.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [IdeaPreviewComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

}

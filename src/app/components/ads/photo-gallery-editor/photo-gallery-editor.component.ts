import { Component, Input } from '@angular/core';
import { Ad } from 'src/app/models/ad';

@Component({
  selector: 'app-photo-gallery-editor',
  templateUrl: './photo-gallery-editor.component.html',
  styleUrls: ['./photo-gallery-editor.component.css']
})
export class PhotoGalleryEditorComponent {
  @Input() ad?: Ad;
}

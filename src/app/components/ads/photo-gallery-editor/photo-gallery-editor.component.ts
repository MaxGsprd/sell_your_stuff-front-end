import { Component, Input } from '@angular/core';
import { IAd } from 'src/app/models/IAd';

@Component({
  selector: 'app-photo-gallery-editor',
  templateUrl: './photo-gallery-editor.component.html',
  styleUrls: ['./photo-gallery-editor.component.css']
})
export class PhotoGalleryEditorComponent {
  @Input() ad?: IAd;
}

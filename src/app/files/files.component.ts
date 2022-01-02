import { Component, HostListener, OnInit } from '@angular/core';
import exifr from 'exifr';
import { TaggedFile } from './tagged-file';
import { formatDate } from './renamer';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  files: TaggedFile[] = [];

  @HostListener('dragover', ['$event'])
  onDragOver(ev: any) {
    ev.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: any) {
    ev.preventDefault();
    const files = ev.dataTransfer.files;

    for (const file of files) {
      exifr.parse(file).then((output) => {
        this.files.push({
          file: file,
          timestamp: formatDate(output.DateTimeOriginal),
        });
      });
    }
  }

  constructor() {}

  ngOnInit(): void {}
}

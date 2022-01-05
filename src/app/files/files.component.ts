import { Component, HostListener, OnInit } from '@angular/core';
import exifr from 'exifr';
import { TaggedFile } from './tagged-file';
import { formatDate, rename, findNewName } from './renamer';

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
    console.log(ev.dataTransfer.files[0]);

    for (const file of files) {
      findNewName(file).then((newName: string) => {
        this.files.push({
          file: file,
          newName: newName,
        });
      });
    }
  }

  onRename() {
    for (const file of this.files) {
      rename(file.file, file.newName);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}

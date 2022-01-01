import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragOver(ev: any) {
    ev.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(ev: any) {
    ev.preventDefault();
    console.log(ev.dataTransfer.files[0]);

    for (const file of ev.dataTransfer.files) {
      console.log(file.name, file.path);
    }
  }

  ngOnInit(): void {}
}

import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FileQueueObject, FileUploaderService } from './file-uploader.service';
 
import { Observable } from 'rxjs/internal/Observable';
import { ToastService } from 'src/app/sevices';

@Component({
  selector: 'file-uploader, [file-uploader]',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})

export class FileUploaderComponent implements OnInit, OnDestroy {

  @Output() onCompleteItem = new EventEmitter();

  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  constructor(private toastService:ToastService, public uploader: FileUploaderService) { }

  ngOnInit() {
    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;
  }

  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }

  addToQueue() {
    const fileBrowser = this.fileInput.nativeElement; 
    var length:number=0;
    this.uploader.queue.subscribe((x)=>{
      length = x.length + fileBrowser.files.length;
    });
    if(length > 5)
    this.toastService.presentToast('Maksimum 5 foto unggahan', "danger", true);
    else
    this.uploader.addToQueue(fileBrowser.files);
    this.uploader.uploadAll();
  } 
  ngOnDestroy() {
    this.uploader.clearQueue();
  }
}
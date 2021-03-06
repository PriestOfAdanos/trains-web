import {ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Queue} from '../../../../business-logic/model/queues/queue';
import {BlTasksService} from '../../../../business-logic/services/tasks.service';
import {SelectQueueComponent} from '../../../experiments/shared/components/select-queue/select-queue.component';

@Component({
  selector   : 'sm-queue-info',
  templateUrl: './queue-info.component.html',
  styleUrls  : ['./queue-info.component.scss']
})
export class QueueInfoComponent implements OnInit {

  @Input() selectedQueue;
  @Input() queues;
  @Output() deselectQueue                 = new EventEmitter();
  @Output() moveExperimentToTopOfQueue    = new EventEmitter();
  @Output() moveExperimentToBottomOfQueue = new EventEmitter();
  @Output() moveExperimentToOtherQueue    = new EventEmitter();
  @Output() removeExperimentFromQueue     = new EventEmitter();
  @Output() moveExperimentInQueue         = new EventEmitter();

  public activeTab: string        = 'experiments';
  public menuSelectedExperiment: any;
  public menuOpen: boolean;
  public menuPosition: { x: number; y: number };
  public readonly experimentsCols = [
    {header: '', class: 'col-4'},
    {header: '', class: 'col-20'},
  ];
  public readonly workersCols     = [
    {header: 'Name', class: 'col-9'},
    {header: 'IP', class: 'col-6'},
    {header: 'Currently Executing', class: 'col-9'},
  ];
  public menuClosed: any;

  @HostListener('document:click', ['$event'])
  clickHandler(event) {
    if (event.button != 2) { // Bug in firefox: right click triggers `click` event
      this.menuOpen = false;
    }
  }

  constructor(private changeDetector: ChangeDetectorRef,
              private blTaskService: BlTasksService,
              private dialog: MatDialog) {
  }


  ngOnInit() {
  }


  findQueueById(id) {
    return this.queues.find(queue => queue.id === id);
  }

  deselectQueueClicked() {
    this.deselectQueue.emit();
  }


  experimentDropped($event: CdkDragDrop<any>) {
    this.moveExperimentInQueue.emit({task: this.selectedQueue.entries[$event.previousIndex].task.id, count: ($event.currentIndex - $event.previousIndex)});
    moveItemInArray(this.selectedQueue.entries, $event.previousIndex, $event.currentIndex);
  }


  openContextMenu(e, task) {
    this.menuSelectedExperiment = task;
    e.preventDefault();
    this.menuOpen = false;
    setTimeout(() => {
      this.menuPosition = {x: e.clientX, y: e.clientY};
      this.menuOpen     = true;
      this.changeDetector.detectChanges();
    }, 0);

  }

  moveToTop($event: any) {
    this.moveExperimentToTopOfQueue.emit(this.menuSelectedExperiment);
  }

  moveToBottom($event: any) {
    this.moveExperimentToBottomOfQueue.emit(this.menuSelectedExperiment);

  }

  moveToQueue($event: any) {
    this.EnqueuePopup();
    // this.moveExperimentToOtherQueue.emit(this.menuSelectedExperiment);
  }

  removeFromQueue($event: any) {
    this.removeExperimentFromQueue.emit(this.menuSelectedExperiment);
  }

  EnqueuePopup() {
    const selectQueueDialog: MatDialogRef<SelectQueueComponent, { confirmed: boolean, queue: Queue }> =
            this.dialog.open(SelectQueueComponent, {data: {}});

    selectQueueDialog.afterClosed().subscribe((res) => {
      if (res && res.confirmed) {
        this.moveExperimentToOtherQueue.emit({queue: res.queue, task: this.menuSelectedExperiment});
        this.blTaskService.setPreviouslyUsedQueue(res.queue);
      }
    });
  }
}

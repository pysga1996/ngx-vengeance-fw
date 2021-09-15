import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

const ID_ATTR = 'swapItemId';
const TARGET_IDENTIFIER = 'target_id';

@Directive({
  selector: '[vgSwappableList]',
})
export class VgSwappableListDirective implements OnChanges {
  @Input() id!: number;
  @Input() dataList: unknown[] = [];
  el: HTMLElement;

  constructor(private ref: ElementRef) {
    this.el = ref.nativeElement;
    this.el.setAttribute('draggable', 'true');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.el.setAttribute(ID_ATTR, String(this.id));
    }
  }

  @HostListener('dragstart', ['$event'])
  onDragstart(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData(
        TARGET_IDENTIFIER,
        this.el.getAttribute(ID_ATTR) as string
      );
    }
  }

  @HostListener('dragenter', ['$event'])
  onDragenter(event: DragEvent): void {
    if (event.dataTransfer?.types.includes(TARGET_IDENTIFIER)) {
      event.preventDefault();
    }
  }

  @HostListener('dragover', ['$event'])
  onDragover(event: DragEvent): void {
    if (event.dataTransfer?.types.includes(TARGET_IDENTIFIER)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const drop_target = event.target as HTMLElement;
    const drag_target_id = event.dataTransfer?.getData(TARGET_IDENTIFIER);
    const sourceIndex = Number(drag_target_id);
    const targetIndex = Number(drop_target.getAttribute(ID_ATTR));
    const tmp = this.dataList[targetIndex];
    this.dataList[targetIndex] = this.dataList[sourceIndex];
    this.dataList[sourceIndex] = tmp;
  }
}
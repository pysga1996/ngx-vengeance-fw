import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

const ID_ATTR = 'swapElementId';
const TARGET_IDENTIFIER = 'target_id';
export type SwapEvent = { source_id: string; target_id: string };

@Directive({
  selector: '[vgSwappableElement]',
})
export class VgSwappableElementDirective implements OnChanges {
  @Input() id!: string;
  @Output() swapEvent: EventEmitter<SwapEvent> = new EventEmitter<SwapEvent>();
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
    const drag_target = document.getElementById(
      drag_target_id as string
    ) as HTMLElement;
    const tmp = document.createElement('span');
    tmp.style.display = 'none';
    drop_target.before(tmp);
    drag_target.before(drop_target);
    tmp.replaceWith(drag_target);
    this.swapEvent.emit({
      source_id: drag_target_id as string,
      target_id: drop_target.getAttribute(ID_ATTR) as string,
    });
  }
}

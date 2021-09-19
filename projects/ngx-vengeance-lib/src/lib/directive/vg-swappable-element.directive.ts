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
import { VgSwappableBase } from './vg-swappable-base';

const ID_ATTR = 'id';
export type SwapEvent = { source_id: string; target_id: string };

@Directive({
  selector: '[vgSwappableElement]',
})
export class VgSwappableElementDirective
  extends VgSwappableBase
  implements OnChanges
{
  @Input() id!: string;
  @Output() swapEvent: EventEmitter<SwapEvent> = new EventEmitter<SwapEvent>();

  get collectionName(): string {
    return super._collectionName;
  }

  @Input()
  set collectionName(value: string) {
    super._collectionName = value;
  }

  @Input() animationTime = 0.4;
  static readonly REF_MAP: {
    [key: string]: {
      dragItem?: HTMLElement | null;
      dropItem?: HTMLElement | null;
    };
  } = {};

  constructor(private ref: ElementRef) {
    super(ID_ATTR, VgSwappableElementDirective.REF_MAP, ref.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.el.setAttribute(ID_ATTR, String(this.id));
    }
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent): void {
    super.onDrag(event);
  }

  @HostListener('dragstart', ['$event'])
  onDragstart(event: DragEvent): void {
    super.onDragstart(event);
  }

  @HostListener('dragend', ['$event'])
  onDragend(event: DragEvent): void {
    super.onDragend(event);
  }

  @HostListener('dragenter', ['$event'])
  onDragenter(event: DragEvent): void {
    super.onDragenter(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragleave(event: DragEvent): void {
    super.onDragleave(event);
  }

  @HostListener('dragover', ['$event'])
  onDragover(event: DragEvent): void {
    super.onDragover(event);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    super.onDrop(event);
  }

  protected override swapEffect(event: DragEvent): void {
    const dropItem = event.target as HTMLElement;
    const dragTargetId = event.dataTransfer?.getData(ID_ATTR);
    const dragItem = document.getElementById(
      dragTargetId as string
    ) as HTMLElement;
    if (dragItem && dropItem) {
      const animation = `dropIn ${this.animationTime}s ease none`;
      dragItem.style.animation = animation;
      dropItem.style.animation = animation;
      setTimeout(() => {
        dragItem.style.animation = '';
        dropItem.style.animation = '';
        const parent = dropItem.parentNode;
        const tmp = document.createElement('span');
        tmp.style.display = 'none';
        parent?.insertBefore(tmp, dropItem);
        parent?.replaceChild(dropItem, dragItem);
        parent?.replaceChild(dragItem, tmp);
        tmp.remove();
        this.swapEvent.emit({
          source_id: dragTargetId as string,
          target_id: dropItem.getAttribute(ID_ATTR) as string,
        });
      }, this.animationTime * 1000);
    }
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { VgSwappableBase } from './vg-swappable-base';

const ID_ATTR = 'vg-swap-item-id';

@Directive({
  selector: '[vgSwappableList]',
})
export class VgSwappableListDirective
  extends VgSwappableBase
  implements OnChanges
{
  @Input() id!: number;
  @Input() dataList: unknown[] = [];

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
    super(ID_ATTR, VgSwappableListDirective.REF_MAP, ref.nativeElement);
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
    const dropItem =
      VgSwappableListDirective.REF_MAP[this._collectionName].dropItem;
    const dragItem =
      VgSwappableListDirective.REF_MAP[this._collectionName].dragItem;
    if (dragItem && dropItem) {
      const animation = `dropIn ${this.animationTime}s ease none`;
      dragItem.style.animation = animation;
      dropItem.style.animation = animation;
      const drop_target = event.currentTarget as HTMLElement;
      const drag_target_id = event.dataTransfer?.getData(ID_ATTR);
      const sourceIndex = Number(drag_target_id);
      const targetIndex = Number(drop_target.getAttribute(ID_ATTR));
      setTimeout(() => {
        dragItem.style.animation = '';
        dropItem.style.animation = '';
        const tmp = this.dataList[targetIndex];
        this.dataList[targetIndex] = this.dataList[sourceIndex];
        this.dataList[sourceIndex] = tmp;
      }, this.animationTime * 1000);
    }
  }
}

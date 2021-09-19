const DROPPABLE_CLASS = 'vg-droppable';
const DRAGGING_CLASS = 'vg-dragging';
const DRAG_ENTER_CLASS = 'vg-drag-enter';

export abstract class VgSwappableBase {
  protected _collectionName = 'default';

  protected constructor(
    protected readonly idAttr = 'id',
    protected readonly refMap: {
      [key: string]: {
        dragItem?: HTMLElement | null;
        dropItem?: HTMLElement | null;
      };
    } = {},
    protected readonly el: HTMLElement
  ) {
    this.el.setAttribute('draggable', 'true');
    this.el.classList.add(DROPPABLE_CLASS);
  }

  onDrag(event: DragEvent): void {
    // console.debug('drag', event);
  }

  onDragstart(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData(
        this.idAttr,
        this.el.getAttribute(this.idAttr) as string
      );
      event.dataTransfer.dropEffect = 'move';
      const dragItem = event.currentTarget as HTMLElement;
      dragItem.classList.remove(DROPPABLE_CLASS, DRAG_ENTER_CLASS);
      dragItem.classList.add(DRAGGING_CLASS);
      this.refMap[this._collectionName] = {
        dragItem: dragItem,
        dropItem: null,
      };
    }
  }

  onDragend(event: DragEvent): void {
    // console.debug('drag end', event);
    const dropItem = this.refMap[this._collectionName].dropItem;
    dropItem?.classList.remove(DRAG_ENTER_CLASS);
    const dragItem = this.refMap[this._collectionName].dragItem;
    dragItem?.classList.remove(DRAGGING_CLASS);
    dragItem?.classList.add(DROPPABLE_CLASS);
    this.refMap[this._collectionName] = {};
  }

  onDragenter(event: DragEvent): void {
    if (this.checkValidDrop(event)) {
      let dropItem = this.refMap[this._collectionName].dropItem;
      dropItem?.classList.remove(DRAG_ENTER_CLASS);
      dropItem = event.currentTarget as HTMLElement;
      dropItem.classList.add(DRAG_ENTER_CLASS);
      this.refMap[this._collectionName].dropItem = dropItem;
      event.preventDefault();
    }
  }

  onDragleave(event: DragEvent): void {
    if (this.checkValidDrop(event)) {
      const dropItem = this.refMap[this._collectionName].dropItem;
      if (!dropItem?.contains(event.relatedTarget as HTMLElement)) {
        dropItem?.classList.remove(DRAG_ENTER_CLASS);
      }
      event.preventDefault();
    }
  }

  onDragover(event: DragEvent): void {
    if (this.checkValidDrop(event)) {
      event.preventDefault();
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.swapEffect(event);
  }

  protected checkValidDrop(event: DragEvent): boolean | undefined {
    const currentTarget = event.currentTarget as HTMLElement;
    return (
      currentTarget.classList.contains(DROPPABLE_CLASS) &&
      event.dataTransfer?.types.includes(this.idAttr)
    );
  }

  protected abstract swapEffect(event: DragEvent): void;
}

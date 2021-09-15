import { Component } from '@angular/core';

@Component({
  selector: 'vg-test-swap-item',
  templateUrl: './test-swap-item.component.html',
  styleUrls: ['./test-swap-item.component.scss'],
})
export class TestSwapItemComponent {
  dataList: { id: number; name: string }[] = [
    {
      id: 1,
      name: 'Thanh',
    },
    {
      id: 2,
      name: 'Thai',
    },
    {
      id: 3,
      name: 'Tam',
    },
  ];

  swapNode(event: { source: string; target: string }): void {
    console.log(event);
    const sourceIndex = Number(event.source);
    const targetIndex = Number(event.target);
    const tmp = this.dataList[targetIndex];
    this.dataList[targetIndex] = this.dataList[sourceIndex];
    this.dataList[sourceIndex] = tmp;
  }
}

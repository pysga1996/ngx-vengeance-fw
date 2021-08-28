import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { VgScrollDataSource } from '../vg-scroll-data-source';
import { VgScrollerService } from '../vg-scroller.service';
import { HttpClient } from '@angular/common/http';
import { VgPage } from '../../../model/vg-page';

@Component({
  selector: 'vg-scroller',
  templateUrl: './vg-scroller.component.html',
  styleUrls: ['./vg-scroller.component.scss'],
})
export class VgScrollerComponent implements OnInit {
  @Input() minBufferPx = 50;
  @Input() maxBufferPx = 100;
  @Input() itemSize = 44;
  @Input() pageSize = 20;
  @Input() url = '';
  @Input() params: {
    [key: string]: string | number;
  } = {};
  @Input() mapper: (response: any) => VgPage<any> = (response: any) => ({
    content: response,
    totalPages: response.length,
  });
  @Input() sizeParamName = 'size';
  @Input() pageParamName = 'page';
  @Input() customTemplate!: TemplateRef<any>;
  dataSource!: VgScrollDataSource;

  constructor(
    private factService: VgScrollerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = new VgScrollDataSource(
      this.factService,
      this.http,
      this.url,
      this.params,
      this.pageSize,
      this.mapper,
      this.sizeParamName,
      this.pageParamName
    );
  }

  fetch(): void {
    this.dataSource.manualFetch();
  }
}

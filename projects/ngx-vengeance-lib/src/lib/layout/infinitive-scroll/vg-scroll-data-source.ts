import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { VgScrollerService } from './vg-scroller.service';
import { HttpClient } from '@angular/common/http';
import { VgPage } from '../../model/vg-page';

export class VgScrollDataSource extends DataSource<any | undefined> {
  private lastPage = 0;
  public cachedItems = Array.from<any>({ length: 0 });
  private dataStream = new BehaviorSubject<(any | undefined)[]>(
    this.cachedItems
  );
  private subscription = new Subscription();

  constructor(
    private itemService: VgScrollerService,
    private http: HttpClient,
    private url: string,
    private params: { [key: string]: string | number },
    private pageSize: number,
    private mapper: (response: any) => VgPage<any>,
    private sizeParamName: string,
    private pageParamName: string
  ) {
    super();
    // Start with some data.
    this.fetchItemPage(0);
  }

  private fetchItemPage(page: number): void {
    this.http
      .get<any>(this.url, {
        params: {
          ...this.params,
          [this.pageParamName]: page,
          [this.sizeParamName]: this.pageSize,
        },
      })
      .subscribe((next) => {
        this.cachedItems = this.cachedItems.concat(this.mapper(next).content);
        this.dataStream.next(this.cachedItems);
      });
  }

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

  public manualFetch(): void {
    this.fetchItemPage(this.lastPage + 1);
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(any | undefined)[] | ReadonlyArray<any | undefined>> {
    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const currentPage = this.getPageForIndex(range.end);
        if (currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this.fetchItemPage(currentPage);
        }
      })
    );
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.debug(collectionViewer);
    this.subscription.unsubscribe();
  }
}

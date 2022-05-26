import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { debounceTime, filter, fromEvent, switchMap } from 'rxjs';
import { AppService } from './app.service';
import { Iimage } from './interface';
import '@cds/core/modal/register.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'image-directory';

  @ViewChild('searchInput', { read: ElementRef })
  searchInput!: ElementRef;

  @ViewChild('searchButton', { read: ElementRef })
  searchButton!: ElementRef;

  public MAX_LIMIT = 20;
  public searchList: Iimage[] = [];
  public favouriteList: Iimage[] = [];
  public showFavWarningModal = false;

  constructor(private appService: AppService) {}

  ngAfterViewInit() {
    fromEvent(this.searchButton.nativeElement, 'click')
      .pipe(
        filter((_) => this.searchInput.nativeElement.value),
        debounceTime(1000),
        switchMap((_) =>
          this.appService.getSearchData(this.searchInput.nativeElement.value)
        )
      )
      .subscribe(
        (res: Iimage[] | null) => {
          this.searchList = [];
          if (res && res.length) {
            this.searchList = res;
            this.attachIdAndCheckFavToSearchItems();
          }
        },
        () => {
          console.error('Api issue');
        }
      );
  }

  private attachIdAndCheckFavToSearchItems() {
    this.searchList = this.searchList.map((item) => {
      const clonedItem = { ...item };
      clonedItem.id = btoa(item.title);
      const index = this.favouriteList.findIndex(item => item.id === clonedItem.id);
      if(index > -1){
        clonedItem.isFav = true;
      }
      return clonedItem;
    });
  }

  public madeFavoutite(event: Event, res: Iimage) {
    res.isFav = !res.isFav;
    if (res.isFav) {
      if(this.favouriteList.length === this.MAX_LIMIT){
        this.showFavWarningModal = true;
        res.isFav = !res.isFav;
      }
      else{
        this.favouriteList.push(res);
      }
    } else {
      const index = this.favouriteList.findIndex((item) => item.id === res.id);
      this.favouriteList.splice(index, 1);
      this.searchList = this.searchList.map(item =>{
        item = {...item}
        if(item.id === res.id){
          item.isFav = res.isFav;
        }
        return item;
      })
    }
  }

  public clear(evt: Event) {
    this.searchInput.nativeElement.value = '';
    this.searchList = [];
  }

  public closeModal(event: Event){
    this.showFavWarningModal = false;
  }
}

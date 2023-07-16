import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {MenuItem} from 'primeng/api';
import { MenuItemsData } from './Models/MenuItemsData';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  items: MenuItem[]=[]; 
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,media: MediaMatcher,public menuItems: MenuItemsData) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.items  = menuItems.getMenuItem();
  }

ngOninit()
{
  
}
ngAfterContentInit()
{
 
}
ngAfterViewInit()
{
 
}
   
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

import { MenuItemsData } from './layouts/full/sidebar/Models/MenuItemsData';

import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { MaterialModules } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { FullComponent } from './layouts/full/full.component';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InvoiceService } from './dashboard/Services/invoices.service';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    PanelMenuModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [MenuItemsData,
    {
      
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    InvoiceService
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule {}

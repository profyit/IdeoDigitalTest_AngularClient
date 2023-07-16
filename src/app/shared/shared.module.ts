import { NgModule } from '@angular/core';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MenuItemsData } from '../layouts/full/sidebar/Models/MenuItemsData';
import { LoadingDialogComponent } from './loading/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './errors/error-dialog/error-dialog.component';
import { MaterialModules } from '../material-module';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  imports: [MaterialModules],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItemsData ]
})
export class SharedModule { }

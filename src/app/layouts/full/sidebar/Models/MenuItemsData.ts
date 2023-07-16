import { MenuItem } from 'primeng/api';
import { Injectable } from "@angular/core";

const MENU_ITEMS  =[
    {
    label: 'Companies Test',
    icon:'pi pi-fw pi-file',
    items: [
        {
            label: 'Company Test',
            icon:'pi pi-briefcase',
            routerLink: ['/test']
        },
        // {
        //     label: 'Another test',
        //     icon:'pi pi-dollar ' ,
        //     routerLink: ['/test1']
        // },
        // {
        //     label: 'Yet another test',
        //     icon:'pi pi-directions',
        //     routerLink: ['/anothertest']
        // },
       
    ]
    },
    // {
    // label: 'Another Company Test',
    // icon:'pi pi-fw pi-pencil',
    // items: [
    //     {
    //         label: 'Second Company Test',
    //         icon:'pi pi-sliders-h'
    //     },
      
    // ]
    // },
    // {
    // label: 'Addional Company Test',
    // icon:'pi pi-fw pi-user',
    // items: [
    //     {
    //         label: 'Third Test',
    //         icon:'pi pi-sliders-h'
  
    //     },
        
    // ]
    // },
   
  ];


@Injectable()
export class MenuItemsData {
  getMenuItem(): MenuItem[] {
    return MENU_ITEMS;
  }
}

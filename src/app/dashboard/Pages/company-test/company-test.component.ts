import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Invoice, InvoiceType,  } from '../../Models/Invoices';
import { InvoiceService } from '../../Services/invoices.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-company-test',
  templateUrl: './company-test.component.html',
  styleUrls: ['./company-test.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CompanyTestComponent implements OnInit{
    InvoicesDialog: boolean = false;

    Invoices: Invoice[] = [];

    Invoice: Invoice = {};

  selectedInvoices: Invoice[] = [];

  submitted: boolean = false;

  statuses: any[] = [];

  InvoiceTypes: InvoiceType[] =  [];

  selectedInvoiceType: InvoiceType ={ name: 'Open', code: '1' };

  dataSubscription: any;

  first = 0;

  rows = 10;
  loading: boolean = false;
  constructor(private invoiceService: InvoiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
             
    this.reset();
  
     this.InvoiceTypes  =  [ { name: 'Open', code: '1' },
                            { name: 'Closed', code: '2' }
                       ];

     
  }

   


  ngOnDestroy(){
    this.dataSubscription.unsubscribe();
  }

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {

    this.first = 0;
    if (this.dataSubscription) {  // cancel pending HTTP requests before triggering new request
        this.dataSubscription.unsubscribe();
      }
      this.Invoices = [];
      
      setTimeout(() => { this.dataSubscription = this.invoiceService.getAllInvoices().subscribe((data) => 
                (
                 
                     this.Invoices = data
                     
                )
                );},350);
}




 
    openNew() {
      this.Invoice = {};
      this.submitted = false;
      this.InvoicesDialog = true;
      
  }

  deleteSelectedInvoices() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected Invoices?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.Invoices = this.Invoices.filter((val) => !this.selectedInvoices.includes(val));
              this.selectedInvoices = [];
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoices Deleted', life: 3000 });
          }
      });
  }

  editInvoice(invoice: Invoice) {
      this.Invoice = { ...invoice };
      this.InvoicesDialog = true;
      
  }

  deleteInvoice(invoice: Invoice) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + invoice.invoiceName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.Invoices = this.Invoices.filter((val) => val.invoiceId !== invoice.invoiceId);
              this.Invoice = {};
              if(invoice.invoiceId === undefined) 
              {
                this.messageService.add({ severity: 'fail', summary: 'Fail', detail: 'Invoice Delete Failed', life: 3000 });
              return
              }
                 this.invoiceService.DeleteInvoice(invoice.invoiceId).subscribe();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Deleted', life: 3000 });
             
          }
      });
      this.reset();
  }

  hideDialog() {
      this.InvoicesDialog = false;
      this.submitted = false;
  }

  saveInvoice() {
      this.submitted = true;
      
  
      if (this.Invoice.invoiceName!= undefined && this.Invoice.invoiceName.trim()) {
        this.Invoice.invoiceType = parseInt (this.selectedInvoiceType.code);
          if (this.Invoice.invoiceId) {
              this.Invoices[this.findIndexById(this.Invoice.invoiceId)] = this.Invoice;
              this.invoiceService.EditInvoice(this.Invoice).subscribe({
                next: (response) => {
                  console.log("saved " + response)
                },
                error: (error) => {
                    this.messageService.add({ severity: 'failed', summary: 'Failed', detail: 'Invoice Edit failed', life: 3000 });
                },
                complete: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Edit Successful', life: 3000 });
                }
              });
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Updated', life: 3000 });
          } else {
          
             
              this.invoiceService.AddNewInvoice(this.Invoice).subscribe({
                next: (response) => {
                  console.log("saved " + response)
                },
                error: (error) => {
                    this.messageService.add({ severity: 'failed', summary: 'Failed', detail: 'Invoice Add failed', life: 3000 });
                },
                complete: () => {
                    this.Invoices.push(this.Invoice);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Add Successful', life: 3000 });
                }
              });
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Created', life: 3000 });
          }

          this.Invoices = [...this.Invoices];
          this.InvoicesDialog = false;
          this.Invoice = {};
      }
      this.InvoicesDialog = false;
    this.reset();
  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.Invoices.length; i++) {
          if (this.Invoices[i].invoiceId === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  

 
}

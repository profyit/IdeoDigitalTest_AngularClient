export class InvoiceList {

      test: Invoice[] = [];
  

}

export interface Invoice {

     // id?: string;
      invoiceName?: string ;
      amount?: number;
      createdAt?: Date;
      invoiceType?: number;
      invoiceTypeDesc?: string;
    	invoiceId?:string;
  }

  export interface InvoiceType {
      name: string;
      code: string;
  }


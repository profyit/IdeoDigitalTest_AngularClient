import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, shareReplay} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../Models/Invoices';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiURL = environment.baseUrl  +'/Invoices';
  getAllInvoices() {
    return this.http.get<any>(this.apiURL);
   
  }
  
  constructor(private http: HttpClient) { }

  DeleteInvoice(id:string ) {
    return this.http.delete<any>(this.apiURL +'/'+id).pipe(
      catchError((error) => {
        console.log(error);
    
        // Here I want the use `throwError`
    
        return of({ error: error.response });
      }
    ));
   
  }
  AddNewInvoice(Invoice:Invoice) {
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Invoice);
   
    return this.http.post(this.apiURL , body,{'headers':headers})
  }

  EditInvoice(Invoice:Invoice) {
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(Invoice);
    return this.http.put(this.apiURL , body,{'headers':headers})
  }
}

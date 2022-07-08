import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';

@Component({
  selector: 'app-customer-order-track',
  templateUrl: './customer-order-track.component.html',
  styleUrls: ['./customer-order-track.component.css']
})
export class CustomerOrderTrackComponent implements OnInit {

  public data:any;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService) { }
   public orderid:any;
   total=0;
  customer_order_item_list:any;    
  customer_shipping_address:any;
  customer_invoice_address:any;
  customer_name="";
  customerlist:any;
  p_imageurl="";
  first_name="";
  second_name="";
  customer_order_details:any;
  ngOnInit(): void {
    this.orderid=sessionStorage.getItem('orderid');
    let url = 'Customer_Order_Track/get_item_data/';
var data={
  "order_id":parseInt(this.orderid),
  "language_id":1
}
    this.allapi.PostData(url,data).subscribe(response => {
      this.customer_order_details=JSON.parse(response.customer_order_details).Table;
   if(response.customer_order_item_list!="")
   {
         this.customer_order_item_list=response.customer_order_item_list;
         this.customer_shipping_address=response.customer_shipping_address;
         this.customer_invoice_address=response.customer_invoice_address;
         //this.customer_name=response.customer_name;
       
   }

   
   var total = 0;
            for (var i = 0; i <this.customer_order_item_list.length; i++) {
                var product = this.customer_order_item_list[i];
                total += (product.sellingprice * product.v_quantity);
            }
           this.total=total; 
 });
    

  }

  view_item_details(ss:any)
  {
     
  sessionStorage.setItem('orderid',ss.orderid);
 sessionStorage.setItem('itemid',ss.itemid);

   window.location.replace("/app/orderhistory/customerordertrack/orderitemdetails")
  }
}

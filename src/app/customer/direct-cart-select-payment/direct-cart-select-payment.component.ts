import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direct-cart-select-payment',
  templateUrl: './direct-cart-select-payment.component.html',
  styleUrls: ['./direct-cart-select-payment.component.css']
})
export class DirectCartSelectPaymentComponent implements OnInit {

  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService) { }

   public mycartlist:any;
   public  mycartlist1:any;
   public total:any;
   public gstamount:any;
   public payableamount:any;
   public cartcount:any;
   public shipingamount:any;
   public discount:any;
   public mycartlist_json:any;
   public shippingaddress_id=0;

   public paymentmode="";
   public modeofpayment="";

  ngOnInit(): void {
let url='CartCheckout/get_payment_data_directcart/';
      var data = {
          "language_id": 1,
      
      }
      this.allapi.PostData(url, data).subscribe(promise=> { 
           if (promise.mycartlist != "") {  
            this.mycartlist=promise.mycartlist;
            var total = 0;
            for (var i = 0; i < this.mycartlist.length; i++) {
                var product = this.mycartlist[i];
                total += (product.selling_price * product.car_qty);
            }
            this.total = total;
            this.gstamount = (total * 16) / 100;
            this.payableamount = total + this.gstamount + 30 - 100;
            this.cartcount = promise.mycartlist.length;
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Item Sold-Out, Please Try Other',
                showConfirmButton: false,
                timer: 3000
            })
            window.location.replace('app/home');
        }
      });


  }

 order_review (ss:any) {
 
    if (ss.shippping == undefined || ss.shippping == "" || ss.shippping == null) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please Select Payment Method',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else {
      sessionStorage.setItem('paymentmode', ss.shippping);
      window.location.replace("/app/direct_cart_placeorder");
    }
   
}

}

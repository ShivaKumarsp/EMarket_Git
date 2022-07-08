import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window: any;


@Component({
  selector: 'app-cart-check-out-payment',
  templateUrl: './cart-check-out-payment.component.html',
  styleUrls: ['./cart-check-out-payment.component.css']
})
export class CartCheckOutPaymentComponent implements OnInit {

  constructor(private httpClient: HttpClient,
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
   shippping="";
   public paymentmode="";
   public modeofpayment="";

  ngOnInit(): void {
let url='CartCheckout/get_payment_data/';
      var data = {
          "language_id": 1,      
      }
      this.allapi.PostData(url, data).subscribe(promise=> {
      this.mycartlist_json=sessionStorage.getItem('mycartlist_json');
           this.mycartlist = JSON.parse(this.mycartlist_json);

           if (this.mycartlist != "") {

       

            var total = 0;
            for (var i = 0; i < this.mycartlist.length; i++) {
                var product = this.mycartlist[i];
                total += (product.selling_price * product.quantity);
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
                title: 'Cart Is Empty, Please Add Product To Cart',
                showConfirmButton: false,
                timer: 3000
            })
        }
      });


  }

 order_review () { 
    if (this.shippping == undefined || this.shippping == "" || this.shippping == null) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please Select Payment Method',
            showConfirmButton: false,
            timer: 3000
        })
        return;
    }
    else {
        sessionStorage.setItem('paymentmode', this.shippping);
      window.location.replace('/app/cart/placeorder');
    }
   
}
continue_to_orderview()
{
  let url='CartCheckout/get_payment_data/';
  var data = {
      "language_id": 1,      
  }
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=='Success')
      {
        window.location.replace('/app/cart/address');
      }
      else if(promise.status=='Failed')
      {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.ret_itemname+' Available '+promise.ret_itemname+' In stock, Please Reduce quantity',
          showConfirmButton: false,
          timer: 3000
      })
      }
    })

}
}

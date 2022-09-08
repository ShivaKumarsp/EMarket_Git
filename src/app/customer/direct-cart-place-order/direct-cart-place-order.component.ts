import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var Razorpay: any; 

@Component({
  selector: 'app-direct-cart-place-order',
  templateUrl: './direct-cart-place-order.component.html',
  styleUrls: ['./direct-cart-place-order.component.css']
})
export class DirectCartPlaceOrderComponent implements OnInit {

  winRef: any;

  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService) { }
   public mycartlist:any;
   public  mycartlist1:any;
   public total:any;
   public gstamount:any;
   public payableamount:any;
   public mycartlist_json:any;
   public cartcount="";
   shippingaddress_id=0;
   modeofpayment="";
   payment_orderid="";
   orderid="";
   customername5="";
   emailid5="";
   mob5="";
   public razorpay_payment_id="";
   public razorpay_order_id="";
   base64='data:image/jpeg;base64,';
   imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
   
  ngOnInit(): void {
let url='CartCheckout/get_payment_data_directcart/';
      var data = {
          "language_id": 1
      }
      this.allapi.PostData(url,data).subscribe(promise=> {
        this.mycartlist=promise.mycartlist;
            if (this.mycartlist != "") {
             var total = 0;
             for (var i = 0; i < this.mycartlist.length; i++) {
                 var product = this.mycartlist[i];
                 total += (product.selling_price * product.car_qty);
             }
             this.total = total;
             this.gstamount = total;
             this.payableamount = total;
             //this.gstamount = (total * 16) / 100;
           //  this.payableamount = total + this.gstamount + 30 - 100; 
             this.cartcount = promise.mycartlist.length;
         }          
          else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: promise.ret_itemname+' Item Sold-Out, Please Try Other',
              showConfirmButton: false,
              timer: 3000
          })
          window.location.replace('app/home');
          }
       
      });

  }

place_order () {
  var modeofpayment=  sessionStorage.getItem('paymentmode');   
    this.mycartlist1 = [];
    this.mycartlist.forEach((_ss:any)=>
    {
        this.mycartlist1.push({  productid: _ss.productid, itemid: _ss.itemid,  
                               quantity: _ss.car_qty, totquantity: _ss.totquantity,
             selling_price: _ss.selling_price, mrp: _ss.mrp})          
           
    })
    
    var total = 0;
    for (var i = 0; i < this.mycartlist.length; i++) {
        var product = this.mycartlist[i];
        total += (product.selling_price * product.car_qty);
    }
    this.total = total;
    this.gstamount = total;
            this.payableamount = total;
            //this.gstamount = (total * 16) / 100;
          //  this.payableamount = total + this.gstamount + 30 - 100; 
    let url='';
    let url1='CartCheckPlaceOrder/check_item_available/';
    var data1={
        'ordercartlist': this.mycartlist1
    }
    this.allapi.PostData(url1,data1).subscribe(promise=>
    {
          if(promise.status=='Failed')
          {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.ret_itemname+'Out Of Stack, Please Try Other',
                showConfirmButton: false,
                timer: 5000
            })
            window.location.replace('app/home');
           }
   
if(modeofpayment=='Online')
{
     url='CartCheckPlaceOrder/Direct_CheckOut_online/';
}
else if(modeofpayment=='POD'){
    
     url='CartCheckPlaceOrder/Direct_CheckOut_POD/';
}
   
    var data = {
        'ordercartlist': this.mycartlist1,
        "shippingaddress_id": this.shippingaddress_id,
        "modeofpayment": this.modeofpayment,
        "delivery_charge":30,
        "total_order_amount":total,
        "discount_amount":100,
        "tax_amount":this.gstamount,
      //"gross_amount":total + this.gstamount + 30 + 100,  
      "gross_amount":total,  
        "payable_amount": this.payableamount,      
    }

    this.allapi.PostData(url, data).subscribe(promise=> {
        if(promise.status=='Failed')
        {
          Swal.fire({
              position: 'center',
              icon: 'warning',
              title: promise.ret_itemname+'Out Of Stack, Please Try Other',
              showConfirmButton: false,
              timer: 5000
          })
          window.location.replace('app/home');
          return
         }

        this.payment_orderid = promise.payment_orderid;
        this.orderid = promise.order_id;
        this.customername5 = promise.customer_name;
        sessionStorage.setItem('name',promise.customer_name);
        this.emailid5 = promise.email;
        this.mob5 = promise.mobile;
        if(modeofpayment=='Online')
        {
            this.razorpay(this.payment_orderid);
          
        }
        else if(modeofpayment=='POD')
        {
            if (promise.status_flg == true) {
                window.location.replace("/app/direct_cart_orderconfirm");
               
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Somthing Wrong, Please Try again',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        }

    });
});

}


razorpay (ss:any) {

    var options = {
        "name": 'Avani Infosoft',
        "order_id": ss,
        "currency": "INR",
        "description": "ONLINE PAYMENT",
        "image": "http://www.avaniinfosoft.com/support/img/avani.ico",
        "handler": function (response:any) {
        var payment_id=  response.razorpay_payment_id;
         var ord_id=  response.razorpay_order_id;
        
         var event = new CustomEvent("payment.success", 
         {
             detail: response,
             bubbles: true,
             cancelable: true
         }
     );    
     window.dispatchEvent(event);
   
        },
    

        "prefill": {
            "name":  this.customername5,
            "email": this.emailid5,
            "contact": this.mob5
        },

        "theme": {
            "color": "#F37254"
        },

    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response:any){    
      
      
    }
    );

}



@HostListener('window:payment.success', ['$event']) 
onPaymentSuccess(event:any): void {
    if(event.detail.razorpay_payment_id!="")
    {
        var total = 0;
        var totalqty=0;
        for (var i = 0; i < this.mycartlist1.length; i++) {
            var product = this.mycartlist1[i];
            total += (product.selling_price * product.quantity);
            totalqty +=  (product.quantity);
        }
        this.total = total;
        this.gstamount = total;
            this.payableamount = total;
            //this.gstamount = (total * 16) / 100;
          //  this.payableamount = total + this.gstamount + 30 - 100; 


   let url='CartCheckPlaceOrder/Direct_paymentsave/';
   var data = {
    "payment_transaction_id": event.detail.razorpay_payment_id,
    "payment_order_id": event.detail.razorpay_order_id,
    'ordercartlist': this.mycartlist1,
    "delivery_charge":30,
     "discount_amount":100,
     "total_order_amount":total,
     "tax_amount":this.gstamount,
     //"gross_amount":total + this.gstamount + 30 + 100,  
     "gross_amount":total,    
     "payable_amount": this.payableamount, 
     
       };
   this.allapi.PostData(url,data).subscribe(promise=>
       {
           if (promise.status_flg == true) {
            window.location.replace("/app/direct_cart_orderconfirm");
              
           }
           else {
               Swal.fire({
                   position: 'center',
                   icon: 'warning',
                   title: 'Somthing Wrong, Please Try again',
                   showConfirmButton: false,
                   timer: 3000
               })
           }
          
       })
    }
}


}








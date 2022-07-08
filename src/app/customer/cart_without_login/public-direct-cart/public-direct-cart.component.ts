import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-direct-cart',
  templateUrl: './public-direct-cart.component.html',
  styleUrls: ['./public-direct-cart.component.css']
})
export class PublicDirectCartComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
    private router: Router,
    private allapi:AllapiService,
    private authService:AuthService,
       private header:HeaderComponent,
   
   ) { }
    mycartlist:any;
    mycartlist1:any;
    public total:any;
    public gstamount:any;
    public payableamount:any;
    public cartcount:any;
    shipingamount:any;
    discount:any;
    message123:any;
    
   ngOnInit(): void {

     let url='Shopping_Cart/public_direct_checkout/';
     var data={
       "language_id":1,
       "session_cart":localStorage.getItem('v_cart')
     }
     this.allapi.PostData(url,data).subscribe(response=>
       {
         this.mycartlist1=response.mycartlist;
         if (response.mycartlist != "") {
           this.mycartlist = [];
           this.mycartlist1 = response.mycartlist;
           this.mycartlist1.forEach((ss:
             { productname: any; productid: any; selling_price: any; mrp: any; itemid: any; imagename: any; imageurl: any; totquantity: any;quantity: any }) => {
              this.mycartlist.push({ productname: ss.productname, productid: ss.productid, selling_price: ss.selling_price,
                mrp: ss.mrp, itemid: ss.itemid, imagename: ss.imagename, imageurl: ss.imageurl,
                 totquantity: ss.totquantity,  quantity: 1})
             });       
           
 var ss=this.mycartlist;          
 
           var total = 0;
           for (var i = 0; i < this.mycartlist.length; i++) {
               var product = this.mycartlist[i];
               total += (product.selling_price * product.quantity);
           }
           this.total = total;
           this.gstamount = (total * 16) / 100;
           this.payableamount = total + this.gstamount + 30 - 100;
           this.cartcount = response.mycartlist.length;
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
 
       })
   }
 
   increase_quantity (aa:any) {
     this.mycartlist1 = [];
     var total = 0;
     this.mycartlist.forEach((_element: any) => {
       if (_element.itemid == aa.itemid && _element.quantity < aa.totquantity) {
         this.mycartlist1.push({ productname: _element.productname, productid: _element.productid, 
           selling_price: _element.selling_price, mrp: _element.mrp, quantity: _element.quantity + 1,
            itemid: _element.itemid, imagename: _element.imagename, imageurl: _element.imageurl,
             totquantity: _element.totquantity })
     }
     else {
       this.mycartlist1.push({ productname: _element.productname, productid: _element.productid, 
           selling_price: _element.selling_price, mrp: _element.mrp, quantity: _element.quantity,
           itemid: _element.itemid, imagename: _element.imagename, imageurl: _element.imageurl, totquantity: _element.totquantity })
     }
  });
     
     
  this.mycartlist = this.mycartlist1;
     for (var i = 0; i < this.mycartlist.length; i++) {
         var product = this.mycartlist[i];
         total += (product.selling_price * product.quantity + 1);
     }
     this.total = total;
     this.gstamount = (total * 16) / 100;
     this.payableamount = total + this.gstamount + 30 - 100;
 }
 decrease_quantity (aa:any) {
   this.mycartlist1 = [];
     var total = 0;
     var total123 = 0;
     this.mycartlist.forEach((_ss:any) => {
       if (_ss.itemid == aa.itemid && aa.quantity > 1) {
         this.mycartlist1.push({ productname: _ss.productname, productid: _ss.productid, selling_price: _ss.selling_price, mrp: _ss.mrp, 
           quantity: _ss.quantity - 1, itemid: _ss.itemid, imagename: _ss.imagename, imageurl: _ss.imageurl, totquantity: _ss.totquantity })
     }
     else {
         this.mycartlist1.push({ productname: _ss.productname, productid: _ss.productid, selling_price: _ss.selling_price, mrp: _ss.mrp,
            quantity: _ss.quantity, itemid: _ss.itemid, imagename: _ss.imagename, imageurl: _ss.imageurl, totquantity: _ss.totquantity })
     }
     });
   
     this.mycartlist = this.mycartlist1;
 
     for (var i = 0; i < this.mycartlist.length; i++) {
         var product = this.mycartlist[i];
         total += (product.selling_price * product.quantity + 1);
     }
     this.total = total;
     this.gstamount = (total * 16) / 100;
     this.payableamount = total + this.gstamount + 30 - 100;
   
 
   
 }
 
 
 goto_address()
 {
 
 
   this.mycartlist1 = [];
   this.mycartlist.forEach((_ss:any)=>
   {
       this.mycartlist1.push({  productid: _ss.productid, itemid: _ss.itemid,  
                              quantity: _ss.quantity,totquantity: _ss.totquantity,
            selling_price: _ss.selling_price, mrp: _ss.mrp})          
          
   })
 
   let url='Shopping_Cart/public_direct_checkout_qty_update/';
   var data={
     "language_id":1,
     'ordercartlist':this.mycartlist1,
     "session_cart":localStorage.getItem('v_cart')
   }
   this.allapi.PostData(url,data).subscribe(response=>
     { 
       if(response.msg_flg=='Insert')
 {
   
   let url1='Account/set_salt/';
   this.allapi.GetDataById_login(url1,1).subscribe(response=>
   {
     let salt=response.entity.salt;
     let salt_token=response.entity.salt_token;
     let userrole="Customer";
     localStorage.setItem('redirect_page','/app/direct_cart_address')
     this.header.click_login_from_landing(userrole,salt,salt_token);     
    })
 

 }
 else 
 {
   Swal.fire({
     position: 'center',
     icon: 'warning',
     title: 'Failed To Add Try Again',
     showConfirmButton: false,
     timer: 3000
 });
 }
 
     
 
     })
 
 
   
           
 }
 

 //=====================
  RemoveElementFromObjectArray(key: number) {
   this.mycartlist.forEach((value: { itemid: any; },index: any)=>{
       if(value.itemid==key) this.mycartlist.splice(index,1);
   });
 }
 
 }
 
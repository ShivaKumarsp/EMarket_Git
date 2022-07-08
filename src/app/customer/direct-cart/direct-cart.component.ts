import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { DataService } from 'src/app/dataservice/data.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-direct-cart',
  templateUrl: './direct-cart.component.html',
  styleUrls: ['./direct-cart.component.css']
})
export class DirectCartComponent implements OnInit {

  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService,
   public all_data: DataService,
   private spinner:NgxSpinnerService
  
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
   hub_list:any;
   hub_route_list:any;

  

firsthub:any=8
lasthub:any=11
finalHour:any=0
finalRoute:any
allNodes:any
allConnection:any

  ngOnInit(): void {

    let url='Shopping_Cart/single_checkout/';
    var data={
      "language_id":1
    }
    this.allapi.PostData(url,data).subscribe(response=>
      {
        this.hub_list=JSON.parse(response.hub_list).Table;
          this.hub_route_list=JSON.parse(response.hub_route_list).Table;

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
  let mycartlist_json = JSON.stringify(this.mycartlist);  

  let url='Shopping_Cart/single_checkout_qty_update/';
  var data={
    "language_id":1,
    "quantity":this.mycartlist[0].quantity
  }
  this.allapi.PostData(url,data).subscribe(response=>
    { 
      if(response.msg_flg=='Insert')
{
  window.location.replace("/app/direct_cart_address");
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


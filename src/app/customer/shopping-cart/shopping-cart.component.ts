import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/dataservice/data.service';
import Graph from 'graphology';
import { dijkstra,edgePathFromNodePath } from 'graphology-shortest-path';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit { 

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService,
   public all_data: DataService
  
  ) { }
   mycartlist:any;
   mycartlist1:any;
   mycartlist12:any;
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
      let url='Shopping_Cart/get_data/';
    var data={
      "language_id":1
    }
    this.allapi.PostData(url,data).subscribe(response=>
      {
        if (response.mycartlist != "") {
          this.mycartlist = [];
          this.mycartlist1 = response.mycartlist;
          this.mycartlist12 = response.mycartlist;
     
          this.mycartlist1.forEach((ss:any) => {

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

delete_item(ss:any) {
  let url='Shopping_Cart/delete_item/'
  var data = {
      "item_id": ss.itemid,
      "product_id": ss.productid,
      "language_id": 1
  }
  this.allapi.PostData(url,data).subscribe(response=>
    {
      if (response.msg_flg == "Success") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000
      }) 
      }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title:  response.message,
                showConfirmButton: false,
                timer: 3000
            })        
          
        }
       
        if (response.mycartlist != "") {
          var total = 0;
          this.mycartlist = this.mycartlist;
     
         this.RemoveElementFromObjectArray(ss.itemid);

          for (var i = 0; i < this.mycartlist.length; i++) {
              var product = this.mycartlist[i];
              total += (product.selling_price * product.quantity + 1);
          }
          this.total = total;
          this.gstamount = (total * 16) / 100;
          this.payableamount = total + this.gstamount + 30 - 100;
      }
else{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Cart Is Empty, Please Shopping..',
    showConfirmButton: false,
    timer: 3000
}) 
window.location.replace('app/home')
}
       
    }
   
    )
 
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

  let url='Shopping_Cart/checkout_qty_update/';
  var data={
    "language_id":1,
    'ordercartlist':this.mycartlist1
  }
  this.allapi.PostData(url,data).subscribe(response=>
    { 
      if(response.msg_flg=='Insert')
{
  let mycartlist_json = JSON.stringify(this.mycartlist);  
  sessionStorage.setItem('mycartlist_json',mycartlist_json);
  window.location.replace("/app/cart/address");
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

// goto_address()
// {
//   let mycartlist_json = JSON.stringify(this.mycartlist);  
          
// }
//=====================
 RemoveElementFromObjectArray(key: number) {
  this.mycartlist.forEach((value: { itemid: any; },index: any)=>{
      if(value.itemid==key) this.mycartlist.splice(index,1);
  });
}




}

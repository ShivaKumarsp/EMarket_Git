import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;
import Graph from 'graphology';
import { dijkstra,edgePathFromNodePath } from 'graphology-shortest-path';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css']
})
export class OrderItemDetailsComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private authService:AuthService) { }
   tab:Number=0
   orderid:any;
  itemid:any;
  order_item_details:any;
  customer_shipping_address:any;
  order_item_specification:any;
  order_item_status:any;
  status_bar="0%";
  cancel_reasion_id="";
  return_reasion_id="";
  cancel_reasion:any;
  return_reasion:any;
  cancelreasion="";
  returnreasion="";
  cancel_status:boolean=false;
  submitted=false;
  title="";
comments="";
formModel:any;
rating_number=0;
ratingflg=false;
hub_list:any;
hub_route_list:any;



graph = new Graph({allowSelfLoops: false});
addNodes(){
  this.hub_list.forEach((ss:any)=>
  {
    this.graph.addNode(ss.hub_name);
  })
}

addEdge(){
  this.hub_route_list.forEach((ss:any)=>
  {
    this.graph.addEdge(ss.source_hub, ss.destination_hub,{traveltime:ss.travel_time_hour});
  })

 
}
calculatePath(routes:any){
  let totalTime = 0
  routes.forEach((route:any,index:any) => {
    totalTime = totalTime+ this.graph.getEdgeAttributes(route)['traveltime']
  });
  console.log("Total time required : "+totalTime)
  return totalTime
}


firsthub:any='Banglore Hub';
lasthub:any='JHUB';
finalHour:any=0;
finalRoute:any;
allNodes:any;
allConnection:any;
deliveryhour=0;
estimate_time=false;

  ngOnInit(): void {
    //this.orderid=sessionStorage.getItem('getitemdetails').orderid;
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("expland")
    );    
    
    this.orderid=sessionStorage.getItem('orderid');
    this.itemid=sessionStorage.getItem('itemid');
    let url='Customer_Order_Track/get_order_item_details/';
    var data={
      "order_id":parseInt(this.orderid),
      "item_id":parseInt(this.itemid),
      "language_id":1
    }
        this.allapi.PostData(url,data).subscribe(response => {
       if(response.order_item_details!="")
       {
        this.cancel_reasion=JSON.parse(response.cancel_reasion).Table;
        this.return_reasion=JSON.parse(response.return_reasion).Table;
          this.order_item_details=response.order_item_details;
             this.customer_shipping_address=response.customer_shipping_address;
          this.order_item_specification=response.order_item_specification;
          this.order_item_status=response.order_item_status[0].txnstatus;
           this.status_bar='60%';
          
          if(this.order_item_status=="Order Placed")
          {
          this.status_bar='10%';
          this.estimate_time=true;
          }
          else  if(this.order_item_status=="Shipped")
          {
            this.status_bar='35%';
            this.estimate_time=true;
          }
          else  if(this.order_item_status=="Out For Delivery")
          {
            this.status_bar='65%';
            this.estimate_time=true;
          }
          else  if(this.order_item_status=="Delivered")
          {
            this.status_bar='88%';
            this.estimate_time=false;
          }
          else  if(this.order_item_status=="Canceled")
          {
            this.status_bar='84%';
            this.estimate_time=false;
          }
          else  if(this.order_item_status=="Return Request")
          {
            this.status_bar='70%';  
            this.estimate_time=false;         
          }
       }
       this.hub_list=JSON.parse(response.hub_list).Table;
       this.hub_route_list=JSON.parse(response.hub_route_list).Table;

       this.addNodes()
       this.addEdge()
       let aaa = dijkstra.bidirectional(this.graph, this.firsthub,this.lasthub,'traveltime')
       let routesHour = this.calculatePath(edgePathFromNodePath(this.graph, aaa))
       this.finalRoute = aaa
       this.finalHour=routesHour
       let url1='Customer_Order_Track/get_delivery_time';
       var data1={
        "finalHour": this.finalHour
       }
      this.allapi.PostData(url1,data1).subscribe(promise=>
        {
          if(promise.delivery_date_time!="")
          {
      this.deliveryhour=promise.delivery_date_time;
          }
        })
   
      
     });

  }

  order_cancel() {
    this.submitted=true;
    if(this.cancelforms.invalid)
    {
      return;
    }
     
    let url='Customer_Order_Track/order_item_cancel/';
    var data={
      "order_id":parseInt(this.orderid),
      "order_item_id":parseInt(this.order_item_details[0].order_item_id),
      "item_id":parseInt(this.itemid),
      "cancel_reasion_id":parseInt(this.cancel_reasion_id),
      "cancel_reasion":this.cancelreasion,
      "language_id":1
    }
        this.allapi.PostData(url,data).subscribe(response => {
       if(response.status=="Update")
       {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: (response.message),
          showConfirmButton: false,
          timer: 2000
      })
       this.tab=0;
          this.order_item_status=response.order_item_status[0].txnstatus;
           this.status_bar='60%';
          
          if(this.order_item_status=="Order Placed")
          {
          this.status_bar='10%';
          }
          else  if(this.order_item_status=="Shipped")
          {
            this.status_bar='35%';
          }
          else  if(this.order_item_status=="Out For Delivery")
          {
            this.status_bar='65%';
          }
          else  if(this.order_item_status=="Delivered")
          {
            this.status_bar='92%';
          }
          else  if(this.order_item_status=="Canceled")
          {
            this.status_bar='84%';
            this.cancel_status=true;
          }
       }
    else if(response.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: (response.message),
        showConfirmButton: false,
        timer: 3000
    })
    }
      
     });

  }
  order_return() {
    this.submitted=true;
    if(this.returnforms.invalid)
    {
      return;
    }
    let url='Customer_Order_Track/order_item_return/';
    var data={
      "order_id":parseInt(this.orderid),
      "order_item_id":parseInt(this.order_item_details[0].order_item_id),
      "item_id":parseInt(this.itemid),
      "return_reasion_id":parseInt(this.return_reasion_id),
      "return_reasion":this.returnreasion,
      "language_id":1
    }
        this.allapi.PostData(url,data).subscribe(response => {
       if(response.status=="Update")
       {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: (response.message),
          showConfirmButton: false,
          timer: 2000
      })
       this.tab=0;
          this.order_item_status=response.order_item_status[0].txnstatus;
           this.status_bar='60%';
          
          if(this.order_item_status=="Order Placed")
          {
          this.status_bar='10%';
          }
          else  if(this.order_item_status=="Shipped")
          {
            this.status_bar='35%';
          }
          else  if(this.order_item_status=="Out For Delivery")
          {
            this.status_bar='65%';
          }
          else  if(this.order_item_status=="Delivered")
          {
            this.status_bar='92%';
          }
          else  if(this.order_item_status=="Return Request")
          {
            this.status_bar='70%';           
          }
          
       }
    else if(response.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: (response.message),
        showConfirmButton: false,
        timer: 3000
    })
    }
      
     });

  }
 
 
 ShowForm(status:Number){
  this.tab=status

}

save_rating_review()
{
  if(this.rating_number==0)
  {
    this.rating_number=1;
  }
  var data={
    "item_id":parseInt(this.itemid),
    "title":this.title,
    "comments":this.comments,
    "rating_number":this.rating_number,
    "language_id":1
  }
  let url='Customer_Order_Track/save_rating_review';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Update")
      {
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: promise.message,
         showConfirmButton: false,
         timer: 2000
     })
     
      }
   else if(promise.status=="Failed")
   {
     Swal.fire({
       position: 'center',
       icon: 'warning',
       title: promise.message,
       showConfirmButton: false,
       timer: 3000
   })
   }
   this.formModel.hide();
    })
}

rating = new FormGroup({
  v_title: new FormControl(),
  v_comments: new FormControl(),
  v_rating_number: new FormControl(),
});

  cancelforms = new FormGroup({
    cancel_reasion: new FormControl(),
    cancel_comments: new FormControl(),
 }); 
 returnforms = new FormGroup({
  return_reasion: new FormControl(),
  return_comments: new FormControl(),
}); 
 forms1=new FormGroup({
  cancelSelection: new FormControl(),
 })
 forms2=new FormGroup({
  returnSelection: new FormControl(),
 })

 get f(){
  return this.cancelforms.controls;
}

get g(){
  return this.returnforms.controls;
}

}

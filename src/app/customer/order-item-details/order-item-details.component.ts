import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import { AuthService } from 'src/app/service/authService/auth.service';
import Swal from 'sweetalert2';
declare var window:any;
import Graph, { MultiDirectedGraph, MultiGraph }  from 'graphology';
import {dijkstra, edgePathFromNodePath} from 'graphology-shortest-path'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-item-details',
  templateUrl: './order-item-details.component.html',
  styleUrls: ['./order-item-details.component.css']
})
export class OrderItemDetailsComponent implements OnInit {
  @ViewChild('invoicep') invoicepElement!: ElementRef;
  constructor(private httpClient: HttpClient,
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
estimate_time=false;
deliveryhour="";

starts:any=8
ends:any=15
AllConnections:any=[]
loadArr:any=[]
neighbours:any=[]
graph:any
all:any=[]
allhub:any=[]
allhub1:any=[]
allhub2:any=[]
allhub_max:any=[]
allhub_min:any=[]
allhub_max1:any=[]
allhub_min1:any=[]
all_str:any=[]
//Mukta 03-09-2022
invoiceform:any
invoice_list_two:any
customer_name=""
address_line_1=""
address_line_2=""
city=""
mobile=""
pincode=""
land_mark=""
customername = ""
address_line1 = ""
address_line2 = " "
ccity = ""
pin = ""
landmark = ""
statename = ""
country_name = " "
email=""
customer_invoice:any
customer_invoice_data:any
store_name=""
store_details=""
pickup_location=""
sstate_name=""
spincode=""
scity=""
scountry_name=""
order_id=""
order_date=""
invoice_date=""
invoice_number=""

// Mukta 03-09-2022
open_invoice() {
  // console.log('pinvoice',pi)
  this.invoiceform = new window.bootstrap.Modal(
    document.getElementById('invoiceprintModal')
  );
  this.invoiceform.show();
  this.orderid=sessionStorage.getItem('orderid');
    this.itemid=sessionStorage.getItem('itemid');
    var data={
      "order_id":parseInt(this.orderid),
      "item_id":parseInt(this.itemid),
      "language_id":1
    }
  console.log(data)
  let url = 'Customer_Order_Track/invoice_print_data/'
  this.allapi.PostData(url, data).subscribe((promise) => {
    console.log(promise)
    // if (promise.invoice_list_two != '') {
      this.customer_shipping_address =promise.customer_shipping_address;
      this.invoice_list_two =promise.invoice_list_two
      this.customer_invoice = JSON.parse(promise.customer_invoice).Table;
       this.customer_invoice_data = JSON.parse(promise.customer_invoice_data).Table;

      this.customer_name = this.customer_shipping_address[0].customer_name;
      this.address_line_1 = this.customer_shipping_address[0].address_line_1;
      this.address_line_2 = this.customer_shipping_address[0].address_line_2;
      this.city = this.customer_shipping_address[0].v_city;
      this.email = this.customer_shipping_address[0].v_email;
      this.mobile = this.customer_shipping_address[0].v_mobile;
      this.pincode = this.customer_shipping_address[0].v_pincode;
      this.land_mark = this.customer_shipping_address[0].landmark;

      this.customername = this.invoice_list_two[0].customername;
      this.address_line1 = this.invoice_list_two[0].address_line1;
      this.address_line2 = this.invoice_list_two[0].address_line2;
      this.ccity = this.invoice_list_two[0].ccity;
      this.pin = this.invoice_list_two[0].pin;
      this.landmark = this.invoice_list_two[0].landmark;
      this.statename = this.invoice_list_two[0].state_name;
      this.country_name = this.invoice_list_two[0].country_name;

      this.store_name = this.customer_invoice[0].store_name;
      this.store_details = this.customer_invoice[0].this.store_details;
      this.pickup_location = this.customer_invoice[0].pickup_location;
      this.spincode = this.customer_invoice[0].pincode;
      this.scity = this.customer_invoice[0].city;
      this.sstate_name = this.customer_invoice[0].state_name;
      this.scountry_name = this.customer_invoice[0].country_name;

      // this.order_id = this.customer_invoice[0].order_id;
      // this.order_date = this.customer_invoice[0].order_date;
      this.invoice_number = this.customer_invoice_data[0].invoice_number;
      this.invoice_date = this.customer_invoice_data[0].invoice_date;
      // this.invoiceform.show();
    // }
  });
}
//mukta 03-09-2022
invoice_print() {
  // var data = {
  //   // consignment_id: this.consignment_id,
  //   // order_id:this.order_id,
  //   language_id: 1,
  // };

  // let url = 'Consignment/invoice_print_update//';
  // this.allapi.PostData(url, data).subscribe((promise) => {
  //   console.log('IP',promise)
  //   if (promise.status == 'Update') {
      // this.consignment_list = JSON.parse(promise.consignment_list).Table;
      html2canvas(this.invoicepElement.nativeElement, { scale: 2}).then(
        (canvas) => {
          const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
          const fileWidth = 200;
          const generatedImageHeight =
            (canvas.height * fileWidth) / canvas.width;
          let PDF2 = new jsPDF('p', 'mm', 'a4');
          PDF2.addImage(
            imageGeneratedFromTemplate,
            'PNG',
            0,
            5,
            fileWidth,
            generatedImageHeight
          );
          PDF2.html(this.invoicepElement.nativeElement.innerHTML);
          let newdate=new Date().toLocaleString()
          newdate=newdate.replace(', ','-')
          newdate=newdate.replace(':','-')
          newdate=newdate.replace(' ','-')


          let temp='Invoice'+newdate+'.pdf'
          PDF2.save(temp);


        }

      );
    }
//   });
// }

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
          console.log('order_item_deatils',this.order_item_details)
          console.log('shipping address',this.customer_shipping_address)
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
            this.status_bar='90%';
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

       this.graph = new Graph({allowSelfLoops:false})
       this.hub_list.forEach((i:any)=>{  this.graph.addNode(i.hub_id) })
       this.hub_route_list.forEach((i:any)=>{
         if(!this.graph.hasEdge(i.source_hub_id, i.destination_hub_id,)){
           this.graph.addDirectedEdge(i.source_hub_id, i.destination_hub_id, { travel_time: i.travel_time, departure_time: i.departure_time} )
         }
       })

       this.graph.forEachOutNeighbor(this.starts, (neighbor:any)=> {
         let newGraph = dijkstra.bidirectional(this.graph, neighbor,this.ends)
         if(newGraph){
           let str = this.starts+newGraph.join('')
           if(this.all_str.indexOf(str) === -1){
             let a = [this.starts, ...newGraph]
             this.all.push(a)
             this.all_str.push(str)
             this.next(a)
           }
         }
       })

           var all_hubs=this.all.filter(function(e:any)
           {
             return e!=null;
           })


            this.allhub1=[];
           all_hubs.forEach((index:any) => {
           this.allhub1.push({'hub_count':index.length,'hub':index})
           });

           this.allhub_max1=[];
           this.allhub_max=[];
           const max = Math.max.apply(null, this.allhub1.map((item: { hub_count: any; }) => item.hub_count));
           all_hubs.forEach((index:any) => {
            if(this.allhub_max1.length==0)
            {
            if(max==index.length)
            {
            this.allhub_max1.push(index);
            }
          }
            });
             console.log(this.allhub_max1);

            this.allhub_max1.forEach((element:any) => {
                      if(element){
              element.forEach((node:any,index:any)=>{
                if(index<(element.length-1)){
                  let hub1 = node
                  let hub2 = element[index+1]
                  this.allhub_max.push({'hub_1':parseInt(hub1),'hub_2':parseInt(hub2)})
                }
              })
            }
           });

         console.log(this.allhub_max)




       let url1='Customer_Order_Track/get_delivery_time';
       var data1={
         "allhub_max": this.allhub_max
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

  next(arr:any){
    arr.forEach((node:any,index:any)=>
    {
      if(index <= (arr.length-2)){
        let hub1 = node
        let hub2 = arr[index+1]
         this.graph.dropDirectedEdge(hub1,hub2)
         let _newGraph = dijkstra.bidirectional(this.graph, this.starts,this.ends)
         if(_newGraph){
          let str = _newGraph.join('')
          if(this.all_str.indexOf(str) === -1){
            this.all.push(_newGraph)
            this.all_str.push(str)
          }
         }
         this.graph.addDirectedEdge(hub1,hub2)
      }
    })
  }
  dropandadd(hub1:any,hub2:any){
          this.graph.dropDirectedEdge(hub1,hub2)
          let newGraph2 = dijkstra.bidirectional(this.graph, this.starts,this.ends)
          if(newGraph2){
            let str = newGraph2.join('')
          }
          this.graph.addDirectedEdge(hub1,hub2)
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

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-vendor-reassign',
  templateUrl: './vendor-reassign.component.html',
  styleUrls: ['./vendor-reassign.component.css']
})
export class VendorReassignComponent implements OnInit {

  forms=new FormGroup({});
  vendordocumentlist: any;
  documentlist: any;
  screen: any;
  vendorreassignlist:any
  formModel:any;
  constructor(private fb:FormBuilder,private httpClient: HttpClient,
    private allapi: AllapiService,) { }
  page:any=1
  ReassignData:any=[]
  myItemList:any=[]
  vendorDoc:any=[]
  vendoritemlist:any=[]
  currentOrderItem:any=0
  requiredQuantity:any=0
  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    this.forms=this.fb.group({})
    this.getData()
  }
//get
getData(){
  this.requiredQuantity=0
  this.ReassignData=[]
      var data={

      }
    let geturl='Vendor_Reassign/get/'
    this.allapi.GetDataById(geturl, 1).subscribe(promise => {
        this.vendorreassignlist=JSON.parse(promise.vendorreassignlist).Table

        this.ReassignData.push(this.vendorreassignlist)
      })

  this.screen=0
}

  onSubmit(){
    //console.log(this.forms.value)
  }

  acceptingOrder(thisOrder:any){
    this.currentOrderItem=thisOrder.orderitem_id
    this.requiredQuantity=thisOrder.iquantity
    console.log(thisOrder)
    this.myItemList=[]
    var data={
      product_id:thisOrder.productid,
      quantity:thisOrder.iquantity,
    }
    //console.log(data)
  let geturl='Vendor_Reassign/getitem/'
  this.allapi.PostData(geturl, data).subscribe(promise => {
    this.vendoritemlist=JSON.parse(promise.vendoritemlist).Table

      // this.ReassignData.push(this.vendorreassignlist)
    })
    console.log(this.vendoritemlist)
    //

    this.openModal()
    //let resp = confirm("Are you accepting to deliver this order")
    //if(resp){
      //console.log(thisOrder)
      //alert("Order is assigned")
      //alert(JSON.stringify(thisOrder))
    //}

  }
  updateOrderItem(orderItem:any,OldOrderItem:any){


    this.doSomething()
    var data={

      quantity:this.requiredQuantity,
      order_item_id:OldOrderItem,
      item_id:orderItem.itemid,
      order_accept_status:'Accept',
      order_accept_comment:'Ressigned to Vendor for Delivery',
    }

    let geturl='Vendor_Reassign/reassigning/'
    this.allapi.PostData(geturl, data).subscribe(promise => {


        if (promise.msg_flg == "Update") {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Vendor Documents Uploaded Successfully.',
              showConfirmButton: false,
              timer: 3000
          })
        }
        else if (promise.msg_flg == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Vendor Documents Not Uploaded, Please Try Again',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: (promise.messageflg),
                showConfirmButton: false,
                timer: 3000
            })
        }
    })
    setTimeout(()=>{this.getData()},2000);





  }
  openModal(){
    this.formModel.show();
  }
  doSomething(){
    this.formModel.hide();
  }


}

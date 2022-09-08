import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
// import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-item-handover',
  templateUrl: './item-handover.component.html',
  styleUrls: ['./item-handover.component.css']
})
export class ItemHandoverComponent implements OnInit {
  // @ViewChild('pagination2', {read: MatPaginator}) pagination2: MatPaginator;
  // @ViewChild(MatPaginator) pagination2: MatPaginator;
  // @ViewChild(MatPaginator) pagination2 = new readytohandover_list<MatPaginator>();
  // private paginator: MatPaginator;
  // @ViewChild(MatPaginator) set matPaginator(pagination2: MatPaginator) {
  //     this.readytohandover_list.pagination2 = pagination2;
  // }


  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";


    page1: number = 1;
    count1: number = 0;
    tableSize1: number = 5;
    tableSizes1: any = [3, 6, 9, 12];
    search1="";

    handover_list:any;
    handover_list_array:any=[];
    han_array=false;
    handover_array_temp:any=[];
    handover_array:any=[];
    readytohandover_list:any
  ngOnInit(): void {
    let url='Consignment/get_data_handover/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {

        this.handover_list=JSON.parse(promise.handover_list).Table;
        this.readytohandover_list=JSON.parse(promise.readytohandover_list).Table
        // this.readytohandover_list.paginator = this.pagination2;
       // console.log(this.readytohandover_list)
       })
  }

  add_data(ss:any)
  {
    //console.log('handover_list',ss)
    if(this.handover_list_array!="" && this.handover_list_array!=undefined)
    {

    if(ss.is_check==true)
      {
        this.handover_list_array.push({consignment_b:ss.consignment_b, consignment_h:ss.consignment_h,
          consignment_id:ss.consignment_id, consignment_l:ss.consignment_l,first_hub:ss.first_hub,
          first_hub_id: ss.first_hub_id, hand_over:ss.hand_over, hub_route_id: ss.hub_route_id, hub_route: ss.hub_route,
          is_check: ss.is_check, last_hub: ss.last_hub, last_hub_id: ss.last_hub_id,
          order_item_id: ss.order_item_id, status: ss.status, weight:ss.weight,
          item_name:ss.item_name,quantity:ss.quantity,order_id:ss.order_id})

      }

      else if(ss.is_check==false)
      {
          this.handover_list_array.forEach((value: { consignment_id: any; },index: any)=>{
              if(value.consignment_id==ss.consignment_id) this.handover_list_array.splice(index,1);
          });

      }
     // console.log('handover_listpush',this.handover_list_array)
    }
    else{
      if(ss.is_check==true)
      {
        this.handover_list_array=[];
        this.handover_list_array.push({consignment_b:ss.consignment_b, consignment_h:ss.consignment_h,
          consignment_id:ss.consignment_id, consignment_l:ss.consignment_l,first_hub:ss.first_hub,
          first_hub_id: ss.first_hub_id, hand_over:ss.hand_over, hub_route_id: ss.hub_route_id, hub_route: ss.hub_route,
          is_check: ss.is_check, last_hub: ss.last_hub, last_hub_id: ss.last_hub_id,
          order_item_id: ss.order_item_id, status: ss.status, weight:ss.weight,
          item_name:ss.item_name,quantity:ss.quantity,order_id:ss.order_id})
      }
    }


  }
  hand_over()
  {
    this.handover_array=[];
    this.handover_array_temp=[];
    this.handover_list_array.forEach((ss:any)=>
    {
      this.handover_array_temp.push({consignment_id:ss.consignment_id, first_hub_id: ss.first_hub_id})
    });
    this.handover_array=this.handover_array_temp;
    var data={
'handover_array':this.handover_array,
"language_id":1
    }
    //console.log('ready to handover',data)
    let url='Consignment/ready_to_handover/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Update")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Item Hand Over Successfully',
            showConfirmButton: false,
            timer: 3000
          })
          this.handover_list=JSON.parse(promise.handover_list).Table;
          this.handover_list_array=[];
        }

        else if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Failed To Hand Over',
            showConfirmButton: false,
            timer: 3000
          })
        }
       })
    window.location.reload()
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

  onTableDataChange1(event: any) {
    this.page1 = event;
    this.ngOnInit();
  }

}

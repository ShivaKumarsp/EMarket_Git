import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-handover',
  templateUrl: './item-handover.component.html',
  styleUrls: ['./item-handover.component.css']
})
export class ItemHandoverComponent implements OnInit {

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
  ngOnInit(): void {
    let url='Consignment/get_data_handover/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.handover_list=JSON.parse(promise.handover_list).Table;
       })
  }
 
  add_data(ss:any)
  {
    if(this.handover_list_array!="" && this.handover_list_array!=undefined)
    {
      
    if(ss.is_check==true)
      {
        this.handover_list_array.push({consignment_b:ss.consignment_b, consignment_h:ss.consignment_h,
          consignment_id:ss.consignment_id, consignment_l:ss.consignment_l,first_hub:ss.first_hub,
          first_hub_id: ss.first_hub_id, hand_over:ss.hand_over, hub_route_id: ss.hub_route_id,
          is_check: ss.is_check, last_hub: ss.last_hub, last_hub_id: ss.last_hub_id,
          order_item_id: ss.order_item_id, status: ss.status, weight:ss.weight})
      }
      else if(ss.is_check==false)
      {       
          this.handover_list_array.forEach((value: { consignment_id: any; },index: any)=>{
              if(value.consignment_id==ss.consignment_id) this.handover_list_array.splice(index,1);
          });
        
      }
     
    }
    else{
      if(ss.is_check==true)
      {
        this.handover_list_array=[];
        this.handover_list_array.push({consignment_b:ss.consignment_b, consignment_h:ss.consignment_h,
          consignment_id:ss.consignment_id, consignment_l:ss.consignment_l,first_hub:ss.first_hub,
          first_hub_id: ss.first_hub_id, hand_over:ss.hand_over, hub_route_id: ss.hub_route_id,
          is_check: ss.is_check, last_hub: ss.last_hub, last_hub_id: ss.last_hub_id,
          order_item_id: ss.order_item_id, status: ss.status, weight:ss.weight})
      }
    }
   

  }
  hand_over()
  {
    this.handover_array=[];
    this.handover_array_temp=[];
    this.handover_list_array.forEach((ss:any)=>
    {
      this.handover_array_temp.push({consignment_id:ss.consignment_id})
    });
    this.handover_array=this.handover_array_temp;
    var data={
'handover_array':this.handover_array,
"language_id":1
    }
    let url='Consignment/save_item_handover/';
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
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}

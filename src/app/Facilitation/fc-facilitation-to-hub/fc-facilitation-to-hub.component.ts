import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-fc-facilitation-to-hub',
  templateUrl: './fc-facilitation-to-hub.component.html',
  styleUrls: ['./fc-facilitation-to-hub.component.css']
})
export class FcFacilitationToHubComponent implements OnInit {

  
  
  constructor(private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    page: number = 1;
    count: number = 0;
    tableSize: number = 5;
    tableSizes: any = [3, 6, 9, 12];
    search="";

  formModel:any;
  editModel:any;
  fc_to_hub_consignment_list:any;
  page_name="";
  getpage:any;
  consignment_l=0;
  consignment_b=0;
  consignment_h=0;
  weight=0;
  totalweight=0;
  hub_route_details:any;
  consignment_array:any;
  
  ngOnInit(): void {
   this.getpage=localStorage.getItem('fc_page');
   this.page_name=this.getpage;

    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.editModel = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
let url='Fc_Consignment/get_data_fc_hub/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.fc_to_hub_consignment_list=JSON.parse(promise.fc_to_hub_consignment_list).Table;
      })
  }
 
 

  assig_fc_hub()
  {
   
    this.consignment_array=[];
    this.fc_to_hub_consignment_list.forEach((ss:any)=>
    {
      if(ss.is_check==true)
      {
        this.consignment_array.push({consignment_id:ss.consignment_id,first_hub_id:ss.first_hub_id,tracking_id:ss.tracking_id})
      }
    })
   
    if(this.consignment_array=="")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Select Atleast One Checkbox',
        showConfirmButton: false,
        timer: 3000
      })
      return
    }
    var data={
      'consignment_fc_hub':this.consignment_array,
      "language_id":1
          }
          let url='Fc_Consignment/assign_fc_to_hub/';
          this.allapi.PostData(url,data).subscribe(promise=>
            {
              if(promise.status=="Update")
              {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Batch Generated Successfully',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.fc_to_hub_consignment_list=JSON.parse(promise.fc_to_hub_consignment_list).Table;
               
                this.consignment_array=[];
                            }
      
              else if(promise.status=="Failed")
              {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Failed To Batch Generate',
                  showConfirmButton: false,
                  timer: 3000
                })
              }
         
             })
  }

  redirect_to_page(ss:any)
  {
localStorage.setItem('fc_page',ss);
if(ss==1)
{
  window.location.replace('app/fc_facilitation_to_hub');
}
else if(ss==2)
{
  window.location.replace('app/fc_facilitation_to_customer');
}
else if(ss==3)
{
  window.location.replace('app/assign_item_from_vendor');
}
else if(ss==4)
{
  window.location.replace('app/fc_consignment_list');
}
else if(ss==5)
{
  window.location.replace('app/fc_consignment_list');
}
else if(ss=='')
{
  window.location.replace('app/facilitation_consignment');
}
  }

  doSomething(){
    this.formModel.hide();
  }
  EditModal(id:any){
    this.editModel.show();
  }
  closeEdit(){
    this.editModel.hide();
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  
}


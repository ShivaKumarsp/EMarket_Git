import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-facilitation-pincode',
  templateUrl: './map-facilitation-pincode.component.html',
  styleUrls: ['./map-facilitation-pincode.component.css']
})
export class MapFacilitationPincodeComponent implements OnInit {

  constructor(private allapi:AllapiService) { }

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];
  search="";

  
  hform= new FormGroup(
    {
      vhub:new FormControl('',[Validators.required]),
      vfacilitation:new FormControl('',[Validators.required]),
           delpin:new FormControl(''),
      });
      submitted=false;
      facilitation_id="";
      pincode_id="";
      hub_id="";
      in_spin_id=0;
      hub_list:any;
      facilitation_dd:any;
      pincode_dd:any;
      facilitation_pincode_list:any;
      pincode_array_list:any;
      pincode_array:any;

  ngOnInit(): void {
   
    let url='MasterFacilitation/get_data_fc_map/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {       
        this.hub_list=JSON.parse(promise.hub_list).Table;
        this.facilitation_pincode_list=JSON.parse(promise.facilitation_pincode_list).Table;
       
     
      })
  }

  get_facilitation(ss:any)
  {
    var data={
      "hub_id":parseInt(ss),
      "language_id":1
    }
    let url='MasterFacilitation/get_facilitation_dd/'
    this.allapi.PostData(url,data).subscribe(promise=>
      {       
        this.facilitation_dd=JSON.parse(promise.facilitation_dd).Table;
        this.pincode_dd=JSON.parse(promise.pincode_dd).Table;
      
     
      })
  }

  get_pincode(hub:any, facilitation:any)
  {
    var data={
      "hub_id":parseInt(hub),
      "facilitation_id":parseInt(facilitation),
      "language_id":1
    }
    let url='MasterFacilitation/get_pincode_dd/'
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        this.pincode_dd=JSON.parse(promise.pincode_dd).Table;
      
      })
  }

  save_map_data()
  {
    this.submitted=true;
    if(this.hform.invalid)
    {
      return;
    }
if(this.pincode_array_list==""||this.pincode_array_list==undefined)
{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Please Select Atleast One Pincode',
    showConfirmButton: false,
    timer: 3000
})
return
}
this.pincode_array=[];
this.pincode_array_list.forEach((ss:any)=>
{
  this.pincode_array.push({pincode_id:ss.pincode_id})
})
    var data={
      "in_spin_id":this.in_spin_id,
      "facilitation_id":this.facilitation_id,
      "pincode_array":this.pincode_array,
      "language_id":1
    }
    let url='MasterFacilitation/save_map_data/'
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        })
        this.pincode_array_list=[];
        this.hub_list=JSON.parse(promise.hub_list).Table;
        this.facilitation_pincode_list=JSON.parse(promise.facilitation_pincode_list).Table;
     
        this.submitted=false;
        this.hform.reset();
        }
        else if(promise.status=="Update")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        })
        this.pincode_array_list=[];
        this.hub_list=JSON.parse(promise.hub_list).Table;
        this.facilitation_pincode_list=JSON.parse(promise.facilitation_pincode_list).Table;
        this.submitted=false;
        this.hform.reset();
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 3000
        })
        }
      
      })
  }

  add_data(aa:any)
  {
    if(this.pincode_array_list!="" && this.pincode_array_list!=undefined)
    {  
         this.pincode_dd.forEach((ss:any)=>
      {
    if(aa==ss.pincode_id)
    {
        this.pincode_array_list.push({pincode_id:ss.pincode_id,pincode:ss.pincode,area:ss.area})
     }
    })
    }
    else{
      this.pincode_array_list=[];
      this.pincode_dd.forEach((ss:any)=>
      {
    if(aa==ss.pincode_id)
    {
        this.pincode_array_list.push({pincode_id:ss.pincode_id,pincode:ss.pincode,area:ss.area})
     }
    })
    } 
    this.pincode_id="";
  }
  remove_data(ss:any)
  {
     this.pincode_array_list.forEach((value: { pincode_id: any; },index: any)=>{
          if(value.pincode_id==ss.pincode_id) this.pincode_array_list.splice(index,1);
      });
    
  
}


  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

    //validation
    get f(){
      return this.hform.controls;
    }
}

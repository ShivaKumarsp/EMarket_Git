import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;

@Component({
  selector: 'app-master-pincode',
  templateUrl: './master-pincode.component.html',
  styleUrls: ['./master-pincode.component.css']
})
export class MasterPincodeComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
submitted = false;
  
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService) { }

  form = new FormGroup({
    country_id:new FormControl('',[Validators.required]),
    state_id:new FormControl('',[Validators.required]),   
        cityid:new FormControl('',[Validators.required]),
        v_pincode:new FormControl('',[Validators.required]),
        v_area:new FormControl()
        
  });
  search=""; 
  countryid="";
  stateid="";
  city_id="";
  pincode="";
  area="";
  pincode_id=0;
  country_list:any;
  all_pincode_list:any;
  state_list:any;
  city_list:any;
  validation_list:any;
  closeform:any;
  add_status=true;

  ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    let url='Manage_Pincode/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>      {
        this.country_list=JSON.parse(promise.country_list).Table;
       this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;
      })
  }
  get_state(ss:any){
    var data={
"language_id":1,
"country_id":parseInt(ss)
    }
    let url='Manage_Pincode/get_state/';
    this.allapi.PostData(url,data).subscribe(promise=>      {
      this.state_list=[];
      this.state_list=JSON.parse(promise.state_list).Table;
   
      })
  }
  get_city(ss:any){
    var data={
"language_id":1,
"country_id":parseInt(this.countryid),
"state_id":parseInt(ss)
    }
    let url='Manage_Pincode/get_city/';
    this.allapi.PostData(url,data).subscribe(promise=>      {
      this.city_list=[];
      this.city_list=JSON.parse(promise.city_list).Table;
   
      })
  }


  Clear()
  {
    this.add_status=true;
    this.countryid="";
    this.stateid="";
    this.city_id="";
    this.pincode="";
    this.area="";
    this.pincode_id=0;
this.submitted=false;
this.form.reset();
  }

  savedata()
{
  this.submitted = true;
    if (this.form.invalid) {
      return;
    }

  var data={
   "pincode_id":this.pincode_id,
   "pincode":parseInt(this.pincode),
   "country_id":parseInt(this.countryid),
   "state_id":parseInt(this.stateid),
   "city_id":parseInt(this.city_id),
   "area":this.area,
    "language_id":1
  }
  let url='Manage_Pincode/save_pincode/';
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
      this.add_status=true;
      this.country_list=JSON.parse(promise.country_list).Table;
      this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;
      this.closeform.hide();
     this.Clear();
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
      else if(promise.status=="Validation")
      {
        this.validation_list=promise.validation_list;
      }
      
    })
}
edit_data(ss:any)
{
  this.add_status=false;
  this.pincode_id=ss.pincode_id;
  this.pincode=ss.pincode;
 this.countryid=ss.country_id;
 this.stateid=ss.state_id;
  this.get_state(this.countryid);
  this.city_id=ss.city_id;
 this.get_city(this.stateid);
 this.area=ss.area;
 this.closeform.show();
}

delete_data(ss:any) {

  Swal.fire({
      title: 'Are you sure?',
      text: "Do You want Delete This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {

        var data={
          "pincode_id":ss.pincode_id   
        }
        let url='Manage_Pincode/delete_pincode/';
        this.allapi.PostData(url,data).subscribe(promise=>
          {  
            if(promise.status="Insert")
            {
              this.country_list=JSON.parse(promise.country_list).Table;
              this.all_pincode_list=JSON.parse(promise.all_pincode_list).Table;

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
          }
            else if(promise.status="Failed")
            {
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
  })
}
    //validation
    get f(){
      return this.form.controls;
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
    
    public openModal(){
      this.add_status=true;
      this.submitted=false;  
      this.countryid="";
      this.stateid="";
      this.city_id="";
      this.pincode="";
      this.area="";
      this.pincode_id=0;  
    this.closeform.show();
  }
}

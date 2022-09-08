import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-transport',
  templateUrl: './master-transport.component.html',
  styleUrls: ['./master-transport.component.css']
})
export class MasterTransportComponent implements OnInit {

  
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
submitted = false;
  
  constructor(private httpClient: HttpClient,
    private router: Router,
   private allapi:AllapiService) { }

  form = new FormGroup({
    v_source_hub_id:new FormControl('',[Validators.required]),
    v_tfr_mode:new FormControl('',[Validators.required]),   
    v_transport_person_name:new FormControl('',[Validators.required]),
    v_transport_contact_no:new FormControl('',[Validators.required]),
    v_transport_contact_email:new FormControl('',[Validators.required]),
    v_transport_registration_no:new FormControl('',[Validators.required]),
        
  });
  search=""; 
  transport_id=0;
  transport_mode_id="";
  transport_contact_no="";
  transport_contact_email="";
  transport_person_name="";
  source_hub_id="";
  transport_registration_no="";

  hub_list:any;
  transport_mode_list:any;
  transport_list:any;
  validation_list:any;

  ngOnInit(): void {
    let url='Master_Transport/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>      {
        this.hub_list=JSON.parse(promise.hub_list).Table;
       this.transport_mode_list=JSON.parse(promise.transport_mode_list).Table;
       this.transport_list=JSON.parse(promise.transport_list).Table;
      })
  }

  Clear()
  {
  this.transport_id=0;
  this.transport_mode_id="";
  this.transport_contact_no="";
  this.transport_contact_email="";
  this.transport_person_name="";
  this.source_hub_id="";
  this.transport_registration_no="";
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
    "transport_id":this.transport_id,
    "source_hub_id":parseInt(this.source_hub_id),
  "transport_mode_id":parseInt(this.transport_mode_id),
  "transport_contact_no":parseInt(this.transport_contact_no),
  "transport_contact_email":this.transport_contact_email,
  "transport_person_name":this.transport_person_name,
  "transport_registration_no":this.transport_registration_no,
    "language_id":1
  }
  let url='Master_Transport/save_transport/';
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
      this.hub_list=JSON.parse(promise.hub_list).Table;
       this.transport_mode_list=JSON.parse(promise.transport_mode_list).Table;
       this.transport_list=JSON.parse(promise.transport_list).Table;
       this.submitted=false;
       this.form.reset();
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
  this.transport_id=ss.transport_id;
   this.source_hub_id=ss.source_hub_id;
  this.transport_mode_id=ss.transport_mode_id;
  this.transport_contact_no=ss.transport_contact_no;
  this.transport_contact_email=ss.transport_contact_email;
 this.transport_person_name=ss.transport_person_name;
 this.transport_registration_no=ss.transport_registration_no;
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
          "transport_id":ss.transport_id   
        }
        let url='Master_Transport/delete_transport/';
        this.allapi.PostData(url,data).subscribe(promise=>
          {  
            if(promise.status="Insert")
            {
              this.hub_list=JSON.parse(promise.hub_list).Table;
              this.transport_mode_list=JSON.parse(promise.transport_mode_list).Table;
              this.transport_list=JSON.parse(promise.transport_list).Table;
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

};



    //validation
    get f(){
      return this.form.controls;
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
    
}

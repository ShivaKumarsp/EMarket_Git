import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-specification',
  templateUrl: './master-specification.component.html',
  styleUrls: ['./master-specification.component.css']
})
export class MasterSpecificationComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder)  { this.form = formBuilder.group({
    spec_name:new FormControl('',[Validators.required]),
    spec_code:new FormControl('',[Validators.required]),
     }); }
 
     page: number = 1;
     count: number = 0;
     tableSize: number = 7;
     tableSizes: any = [3, 6, 9, 12];
     search="";
   public form: FormGroup;
  validation_list:any;
  specification_list:any
  specification_id=0;
  specification_name="";
  specification_code="";
  btn_dissable=false;
  submitted=false;

  ngOnInit(): void {
    let url='Master_Specification/get_data_specification/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.specification_list=promise.specification_list;
      })
  }
  savedata()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.btn_dissable=true;
    var data={
      "specification_id":this.specification_id,
      "specification_name":this.specification_name,
      "specification_code":this.specification_code,
      "language_id":1
    }
    let url='Master_Specification/save_specification/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          this.specification_name="";
          this.specification_code="";
          this.specification_list=promise.specification_list;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 3000
            })
           
        }
        if(promise.status=="Update")
        {
          this.specification_name="";
          this.specification_code="";
          this.specification_list=promise.specification_list;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 3000
            })
           
        }
        if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: (promise.message),
            showConfirmButton: false,
            timer: 3000
        })
        }
      })

  }
  Clear()
  {
    this.specification_name="";
    this.specification_code="";
    this.specification_id=0;
    this.submitted = false;
  this.form.reset();
  }

  edit_specidfication(ss:any)
  {
this.specification_id=ss.specification_id;
this.specification_name=ss.specification_name;
this.specification_code=ss.specification_code;
  }
  delete_specidfication(ss:any) {

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
  
            var data = {
              "specification_id":ss.specification_id,
                "language_id": 1
            }
            let url='Master_Specification/delete_specidfication/';
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Delete") {
                  this.specification_list=promise.specification_list;
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: (promise.message),
                    showConfirmButton: false,
                    timer: 3000
                })
  
                }
                else if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: (promise.message),
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

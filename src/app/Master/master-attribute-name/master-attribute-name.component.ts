import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-attribute-name',
  templateUrl: './master-attribute-name.component.html',
  styleUrls: ['./master-attribute-name.component.css']
})
export class MasterAttributeNameComponent implements OnInit {

  
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder)  { this.form = formBuilder.group({
    attr_name:new FormControl('',[Validators.required]),
    attr_code:new FormControl('',[Validators.required]),
     }); }
 
     page: number = 1;
     count: number = 0;
     tableSize: number = 7;
     tableSizes: any = [3, 6, 9, 12];

   public form: FormGroup;
  validation_list:any;
  attrname_list:any
  attribute_name_id=0;
  attribute_code="";
  attribute_name="";
  btn_dissable=false;
  submitted=false;
  search="";
  
  ngOnInit(): void {
    let url='Master_Specification/get_data_attrname/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.attrname_list=promise.attrname_list;
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
      "attribute_name_id":this.attribute_name_id,
      "attribute_name":this.attribute_name,
      "attribute_code":this.attribute_code,
      "language_id":1
    }
    let url='Master_Specification/save_attrname/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          this.attribute_name="";
          this.attribute_code="";
          this.attrname_list=promise.attrname_list;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 2000
            })
           
        }
        else if(promise.status=="Update")
        {
          this.attribute_name="";
          this.attribute_code="";
          this.attrname_list=promise.attrname_list;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: (promise.message),
                showConfirmButton: false,
                timer: 2000
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
    this.attribute_name="";
    this.attribute_code="";
    this.attribute_name_id=0;
    this.submitted=false;
    this.form.reset();
  }

  edit_specidfication(ss:any)
  {
this.attribute_name_id=ss.attribute_name_id;
this.attribute_name=ss.attribute_name;
this.attribute_code=ss.attribute_code;
  }
  delete_specidfication(ss:any)
  {

  }
  //validation
get f(){
  return this.form.controls;
}
onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
}

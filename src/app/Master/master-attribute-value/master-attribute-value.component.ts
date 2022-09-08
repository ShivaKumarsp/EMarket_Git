import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-attribute-value',
  templateUrl: './master-attribute-value.component.html',
  styleUrls: ['./master-attribute-value.component.css']
})
export class MasterAttributeValueComponent implements OnInit {


  constructor(private httpClient: HttpClient,
    private router: Router,
    private allapi:AllapiService,
    private formBuilder:FormBuilder)  { this.form = formBuilder.group({
     attr_name:new FormControl('',[Validators.required]),
     attr_value:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
     attr_value_code:new FormControl('',[Validators.required]),
      }); }

      page: number = 1;
      count: number = 0;
      tableSize: number = 7;
      tableSizes: any = [3, 6, 9, 12];

    public form: FormGroup;
   validation_list:any;
   attrname_dd:any
   attrvalue_list:any;
   search="";
   attribute_value_id=0;
   attribute_name_id="";
   attribute_value="";
   attribute_code="";
   btn_dissable=false;
   submitted=false;
   ngOnInit(): void {
     let url='Master_Specification/get_data_attrvalue/';
     this.allapi.GetDataById(url,1).subscribe(promise=>
       {
         this.attrname_dd=promise.attrname_dd;
         this.attrvalue_list=promise.attrvalue_list;
       })
   }
   savedata()
   {
    this.submitted = true;
    if(this.form.value.attr_value.trim() ==''){
      this.form.controls['attr_value'].setErrors({'required': true})
      return ;
    }
    if (this.form.invalid) {
      return;
    }

     this.btn_dissable=true;
     var data={
       "attribute_value_id":this.attribute_value_id,
       "attribute_name_id":parseInt(this.attribute_name_id),
       "attribute_value":this.attribute_value,
       "attribute_code":this.attribute_code,
       "language_id":1
     }
     let url='Master_Specification/save_attrvalue/';
     this.allapi.PostData(url,data).subscribe(promise=>
       {
         if(promise.status=="Insert")
         {
           this.submitted=false;
           this.form.reset();
           this.attrname_dd=promise.attrname_dd;
           this.attrvalue_list=promise.attrvalue_list;
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
          this.submitted=false;
          this.form.reset();
           this.attrname_dd=promise.attrname_dd;
           this.attrvalue_list=promise.attrvalue_list;
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
             timer: 2000
         })
         }
       })

   }
   Clear()
   {
    this.attribute_name_id="";
    this.attribute_value="";
    this.attribute_code="";
    this.attribute_value_id=0;
    this.submitted=false;
    this.form.reset();
   }

   edit_specidfication(ss:any)
   {
    this.attribute_value_id=ss.attribute_value_id,
    this.attribute_name_id=ss.attribute_name_id,
    this.attribute_value=ss.attribute_value,
    this.attribute_code=ss.attribute_code
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

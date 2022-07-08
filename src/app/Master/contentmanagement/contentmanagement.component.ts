import { HttpClient } from '@angular/common/http';
import { Component,Directive, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
import {  formatDate } from '@angular/common';
declare var window:any;
import { date, json, RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contentmanagement',
  templateUrl: './contentmanagement.component.html',
  styleUrls: ['./contentmanagement.component.css']
})
export class ContentmanagementComponent implements OnInit {
  sampleData:any
  formModel:any
  constructor(private httpClient: HttpClient,
    private router: Router,
    private allapi:AllapiService,
    private formBuilder:FormBuilder,
    private spinner: NgxSpinnerService) { }
  formAddBanner= new FormGroup({
    title1: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    bannerimage: new FormControl('',[Validators.required]),
    catid:new FormControl('',[Validators.required]),
    url: new FormControl(''),   
    page:new FormControl('')  
  })
  formEditBanner= new FormGroup({
    title1_e: new FormControl('',[Validators.required]),
    detail_e: new FormControl('',[Validators.required]),
    bannerimage_e: new FormControl(''),
    catid_e:new FormControl('',[Validators.required]),
    url_e: new FormControl(''),   
    page_e:new FormControl('')   
  })
  banner_list:any;
  page_list:any;
  category_list:any;
  banner_id=0;
  banner_title="";
  banner_link="";
  banner_details="";
  page_id=0;
  add_cat_id="";
  banner_image="";
  is_active:boolean=false;
  submitted=false;

    //validation
get f(){
  return this.formAddBanner.controls;
}
get g(){
  return this.formEditBanner.controls;
}

  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("editbanners")
    );
   
    let url="Banner/get_data/";
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.banner_list=JSON.parse(promise.banner_list).Table;
        this.page_list=JSON.parse(promise.page_list).Table;
        this.category_list=JSON.parse(promise.category_list).Table;
      })

  }

  addbanner(){
    this.submitted=true;
    if(this.formAddBanner.invalid)
    {
      return;
    }
    this.spinner.show();
    var data={
      "banner_id":this.banner_id,
      "banner_title":this.banner_title,
      "banner_link":"test",
      "banner_details":this.banner_details,
      "page_id":this.page_id,
      "add_cat_id":parseInt(this.add_cat_id),
      "banner_image":this.banner_image,
      "language_id":1
    }
    let url="Banner/save_banner/";
 this.allapi.PostData(url, data).subscribe(promise=>{
if(promise.status=="Insert")
{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: promise.message,
    showConfirmButton: false,
    timer: 3000
})
this.banner_id=0;
this.banner_title="";
this.banner_link="";
this.banner_details="";
this.page_id=0;
this.add_cat_id="";
this.banner_image="";
this.banner_list=JSON.parse(promise.banner_list).Table;
this.page_list=JSON.parse(promise.page_list).Table;
this.category_list=JSON.parse(promise.category_list).Table;
}
else if(promise.status=="Update")
{
  this.formModel.hide();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: promise.message,
    showConfirmButton: false,
    timer: 3000
})
this.banner_id=0;
this.banner_title="";
this.banner_link="";
this.banner_details="";
this.page_id=0;
this.add_cat_id="";
this.banner_image="";
this.banner_list=JSON.parse(promise.banner_list).Table;
this.page_list=JSON.parse(promise.page_list).Table;
this.category_list=JSON.parse(promise.category_list).Table;
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
 })
 this.spinner.hide();
  }

  updatebanner(){
    this.submitted=true;
    if(this.formEditBanner.invalid)
    {
      return;
    }
    this.spinner.show();
    var data={
      "banner_id":this.banner_id,
      "banner_title":this.banner_title,
      "banner_link":"test",
      "banner_details":this.banner_details,
      "page_id":this.page_id,
      "add_cat_id":parseInt(this.add_cat_id),
      "banner_image":this.banner_image,
      "language_id":1
    }
    let url="Banner/save_banner/";
 this.allapi.PostData(url, data).subscribe(promise=>{
 if(promise.status=="Update")
{  
this.banner_id=0;
this.banner_title="";
this.banner_link="";
this.banner_details="";
this.page_id=0;
this.add_cat_id="";
this.banner_image="";
this.banner_list=JSON.parse(promise.banner_list).Table;
this.page_list=JSON.parse(promise.page_list).Table;
this.category_list=JSON.parse(promise.category_list).Table;

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: promise.message,
    showConfirmButton: false,
    timer: 3000
})
this.formModel.hide();
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
 })
 this.spinner.hide();
  }

  edit_banner(a:any){
    
    this.banner_id=a.banner_id;
    this.banner_title=a.banner_title;
    this.banner_link=a.banner_link;
    this.banner_details=a.banner_details;
    this.page_id=a.page_id;
    this.add_cat_id=a.add_cat_id;
    this.banner_image=a.banner_image;    
    this.formModel.show();
  }

  delete(ss:any) {

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
            "banner_id":ss.banner_id,
            "language_id":1
          }
          let url="Banner/delete_banner/";
            this.allapi.PostData(url, data).subscribe(promise=> {
  
                if (promise.status == "Delete") {
                  this.banner_id=0;
 this.banner_list=JSON.parse(promise.banner_list).Table;
 this.page_list=JSON.parse(promise.page_list).Table;
 this.category_list=JSON.parse(promise.category_list).Table;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: promise.message,
                        showConfirmButton: false,
                        timer: 3000
                    });
  
                }
                else { 
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

  

  SelectedFile_Array:any;
selectFileUpload(imageInput: any) {
    var formData = new FormData();
    const file: File = imageInput.files[0];
    if (imageInput.files[0].type != "image/jpeg") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Upload the JPEG file',
        showConfirmButton: false,
        timer: 3000
    })
        return; 
    } else if (imageInput.files[0].size > 2097152) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Image size should be less than 2MB',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
    else{
   this.SelectedFile_Array=imageInput.files[0];
   formData.append("File", this.SelectedFile_Array);
   console.log(formData)
   let url='ImageUpload/DocumentUpload/';
   this.allapi.upload_image(url,formData).subscribe(promise=>
    {
       this.banner_image=promise.path;
         })
  }
}


selectFileUpload1(imageInput1: any) {
    var formData = new FormData();
    const file: File = imageInput1.files[0];
    if (imageInput1.files[0].type != "image/jpeg") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Upload the JPEG file',
        showConfirmButton: false,
        timer: 3000
    })
        return; 
    } else if (imageInput1.files[0].size > 2097152) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Image size should be less than 2MB',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
    else{
   this.SelectedFile_Array=imageInput1.files[0];
   formData.append("File", this.SelectedFile_Array);
   console.log(formData)
   let url='ImageUpload/DocumentUpload/';
   this.allapi.upload_image(url,formData).subscribe(promise=>
    {
       this.banner_image=promise.path;
         })
  }
}

  closeModal(){
    this.formModel.hide();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-master-additional-category',
  templateUrl: './master-additional-category.component.html',
  styleUrls: ['./master-additional-category.component.css']
})
export class MasterAdditionalCategoryComponent implements OnInit { 
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
submitted = false;
  public form: FormGroup;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder) { this.form = formBuilder.group({
    addcategoryname:new FormControl('',[Validators.required]),
    subcatname:new FormControl('',[Validators.required]),   
        catname:new FormControl('',[Validators.required])
        
  }); }
  btn_dissable=true;
  additional_cat_name="";
  msc_id="";
  additional_cat_id=0;
  s_imageurl="";
  description="";
  mc_id="";
  search="";
  subcategory_dd:any;
  SelectedFile_Array:any;
  validation_list:any;
  subcategory_list:any;
  additional_cat_code="";
  category_dd:any;

  ngOnInit(): void {
    let url='Manage_Subsubcategory/getdata/';
    this.allapi.GetDataById(url,1).subscribe(promise=>      {
        this.category_dd=JSON.parse(promise.category_dd);
       this.subcategory_list=JSON.parse(promise.subsubcatlist_grid).Table;
      })
  }
  get_subcategory(ss:any){
    var data={
"language_id":1,
"mc_id":parseInt(ss)
    }
    let url='Manage_Subsubcategory/get_add_category/';
    this.allapi.PostData(url,data).subscribe(promise=>      {
        this.subcategory_dd=JSON.parse(promise.subcatlist_dd).Table;
   
      })
  }

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
          title: 'mage size should be less than 2MB',
          showConfirmButton: false,
          timer: 3000
      })
          return;
      }
      else
      {
        this.SelectedFile_Array=imageInput.files[0];
        formData.append("File", this.SelectedFile_Array);
        let url='ImageUpload/DocumentUpload/';
        return this.http.post('http://192.168.1.200:1305/api/ImageUpload/DocumentUpload', formData).subscribe((promise:any)=>
        {
         this.s_imageurl=promise.path;
        });
      }
  }

  Clear()
  {
this.mc_id="";
this.msc_id="";
this.additional_cat_name="";
this.s_imageurl="";
this.additional_cat_id=0;
this.submitted=false;
this.form.reset();
  }

  savedata()
{
  this.submitted = true;
    if (this.form.invalid) {
      return;
    }
if(this.s_imageurl=="")
{
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Please Upload Image',
    showConfirmButton: false,
    timer: 3000
})
return
}
  this.btn_dissable=false;
  var data={
    "additional_cat_id":this.additional_cat_id,
    "msc_id":parseInt(this.msc_id),
    "mc_id":parseInt(this.mc_id),
    "additional_cat_name":this.additional_cat_name,
    "description":"",
    "image_url":this.s_imageurl,
    "language_id":1
  }
  let url='Manage_Subsubcategory/savemanagesubcat/';
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
      this.subcategory_list=JSON.parse(promise.subsubcatlist_grid).Table;
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
}
edit_category(ss:any)
{
this.additional_cat_id=ss.additionalcatid,
this.msc_id=ss.mscid,
this.mc_id=ss.mcid,
this.get_subcategory(this.mc_id);
 this.additional_cat_name=ss.additionalcatname,
 this.additional_cat_code=ss.additionalcatcode,
  this.s_imageurl=ss.imageurl

}
delete_category(ss:any)
{
  this.btn_dissable=false;
  var data={
    "msc_id":ss.additionalcatid   
  }
  let url='Master_Category/delete_subcat/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status="Insert")
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.subcategory_list=JSON.parse(promise.subcategory_list);

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

    //validation
    get f(){
      return this.form.controls;
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.ngOnInit();
    }
    
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-master-category',
  templateUrl: './master-category.component.html',
  styleUrls: ['./master-category.component.css']
})
export class MasterCategoryComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  public myform:any;
  public form: FormGroup;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder) { this.form = formBuilder.group({
    categoryname:new FormControl('',[Validators.required]),
    categorycode:new FormControl('',[Validators.required]),
    descr:new FormControl('',[Validators.required]),
    itemimage:new FormControl('')

  }); }
  // form = new FormGroup({
  //   categoryname: new FormControl('',[Validators.required]),
  //   categorycode: new FormControl('',[Validators.required]),
  //   imageurl: new FormControl('',[Validators.required]),
  // });
   base64="data:image/jpeg;base64,";
   Url='http://124.153.106.183:8015/EMarket_Image';
  btn_dissable=true;
  category_name="";
  category_code="";
  description="";
  s_imageurl="";
  SelectedFile_Array:any;
  validation_list:any;
  category_list:any;
  mc_id=0;
  submitted:any;
  search="";
  ngOnInit(): void {
    let url='Master_Category/get_data_cat/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
       this.category_list=JSON.parse(promise.category_list).Table;
      })
  }



savedata()
{

  this.submitted = true;
  if(this.form.value.categoryname.trim() ==''){
       this.form.controls['categoryname'].setErrors({'required': true})
    }
    if(this.form.value.descr.trim() ==''){
      this.form.controls['descr'].setErrors({'required': true})
   }
    if (this.form.invalid) {
      return;
    }

  this.btn_dissable=false;
  var data={
    "mc_id":this.mc_id,
    "category_name":this.category_name.trim(),
    "category_code":this.category_code,
    "description":this.description.trim(),
    "image_url":this.s_imageurl,
    "language_id":1
  }
  let url='Master_Category/save_cat/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        this.submitted = false;
        this.form.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
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
      else if(promise.status=="Duplicate")
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
this.mc_id=ss.mcid,
 this.category_name=ss.categoryname,
 this.category_code=ss.categorycode
 this.description=ss.v_description
  this.s_imageurl=ss.imageurl

}
delete_category(ss:any)
{
  this.btn_dissable=false;
  var data={
    "mc_id":ss.mcid
  }
  let url='Master_Category/delete_cat/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status="Deleted")
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.category_list=JSON.parse(promise.category_list).Table;

    }
      else if(promise.status="Duplicate")
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


Clear()
{
  this.mc_id=0;
 this.category_name="";
  this.category_code="";
  this.description="";
  this.s_imageurl="";
  this.submitted = false;
  this.form.reset();
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
      let url='ImageUpload/Cateory_Image_Upload/';
      return this.http.post('http://localhost:1305/api/ImageUpload/Cateory_Image_Upload', formData).subscribe((promise:any)=>
      {
       this.s_imageurl=promise.path;
      });
    }
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

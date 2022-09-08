import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-master-subcategory',
  templateUrl: './master-subcategory.component.html',
  styleUrls: ['./master-subcategory.component.css']
})
export class MasterSubcategoryComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any;

  public form: FormGroup;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder:FormBuilder) { this.form = formBuilder.group({
    categoryname:new FormControl('',[Validators.required]),
    subcatname:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
    descr:new FormControl('',[Validators.required]),
    imageurl:new FormControl(''),

  }); }
 submitted = false;
  btn_dissable=true;
  msc_name="";
  mc_id="";
  msc_id=0;
  s_imageurl="";
  description="";
  category_dd:any;
  SelectedFile_Array:any;
  validation_list:any;
  subcategory_list:any;
search="";
disabled=false;
showFilter=false;
limitSelection=false;
cities:any=[];
selectedItems:any=[];
dropdownSettings:any={};
Url='http://124.153.106.183:8015/EMarket_Image';

onItemSelect(item:any){
  console.log('onItemSelect', item);
}
onSelectAll(item:any){
  console.log('onSelectAll', item);
}

  ngOnInit(): void {

    let url='Master_Category/get_data_subcat/';
    this.allapi.GetDataById(url,1).subscribe(promise=>      {
        this.category_dd=JSON.parse(promise.category_dd);
       this.subcategory_list=JSON.parse(promise.subcategory_list);
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
        return this.http.post('http://localhost:1305/api/ImageUpload/Cateory_Image_Upload', formData).subscribe((promise:any)=>
        {
         this.s_imageurl=promise.path;
        });
      }
  }

  Clear()
  {
    this.msc_id=0;
  this.mc_id="";
    this.msc_name="";
    this.description="";
    this.s_imageurl="";
    this.form.reset();
    this.submitted=false;
  }

  savedata()
{
  this.submitted = true;
  if(this.form.value.subcatname.trim() ==''){
    this.form.controls['subcatname'].setErrors({'required': true})
  }
  if(this.form.value.descr.trim() ==''){
    this.form.controls['descr'].setErrors({'required': true})
  }
  if (this.form.invalid) {
    return;
  }

  this.btn_dissable=false;
  var data={
    "msc_id":this.msc_id,
    "mc_id":parseInt(this.mc_id),
    "msc_name":this.msc_name,
    "description":this.description,
    "image_url":this.s_imageurl,
    "language_id":1
  }
  let url='Master_Category/save_subcat/';
  this.allapi.PostData(url,data).subscribe(promise=>
    {
      if(promise.status=="Insert")
      {
        this.submitted=false;
        this.form.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.subcategory_list=JSON.parse(promise.subcategory_list);

    }
     else if(promise.status=="Update")
      {
        this.msc_id=0;
        this.mc_id="";
          this.msc_name="";
          this.description="";
          this.s_imageurl="";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 3000
      })
      this.subcategory_list=JSON.parse(promise.subcategory_list);

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
this.msc_id=ss.msc_id,
this.mc_id=ss.mc_id,
 this.msc_name=ss.msc_name,
 this.description=ss.msc_description
  this.s_imageurl=ss.msc_imageurl

}
delete_category(ss:any)
{
  this.btn_dissable=false;
  var data={
    "msc_id":ss.msc_id
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
      //this.ngOnInit();
    }
}

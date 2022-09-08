import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { alphaValidatorExtension } from '@rxweb/reactive-form-validators/validators-extension';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-managestore',
  templateUrl: './managestore.component.html',
  styleUrls: ['./managestore.component.css']
})
export class ManagestoreComponent implements OnInit {

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute,
   private spinner:NgxSpinnerService) { }

   vendorstore = new FormGroup({

    storename: new FormControl('' ,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(5),Validators.maxLength(40)]),

    storetitle: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
    Validators.minLength(5),Validators.maxLength(40)]),
    storedetails: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
    Validators.minLength(5),Validators.maxLength(50)]),
    pickupaddress: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
    Validators.minLength(5),Validators.maxLength(50)]),
    v_state: new FormControl('',[Validators.required]),
    v_city: new FormControl('',[Validators.required,Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(3),Validators.maxLength(30)]),
    v_pincode: new FormControl('',[Validators.required]),

    store_pic: new FormControl(''),
    contactname: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    altmobile: new FormControl('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),




  });

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  validation_list:any;
  store_id=0;
  store_name="";
  store_title="";
  store_details="";
  store_image="";
  pickup_location="";
  pincode="";
  city="";
  state_id="";
  contact_name="";
  contact_mobile="";
  contact_email="";
  search="";
  edit=false;
vendor_store_list:any;
statelist:any;
SelectedFile_Array:any;
submitted=false;
closeform:any;
base64='data:image/jpeg;base64,';
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';
contact_primary_mobile=""
contact_alternate_mobile=""
keyPressSpace(event:any) {
  if(event.target.selectionStart===0 && event.code==='Space')
  {
    event.preventDefault();
  }
}

keyPresspincode(event:any) {
  var inp = String.fromCharCode(event.keyCode);

  if (/[0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

keyPressAlphaNumeric(event:any) {
  var inp = String.fromCharCode(event.keyCode);
  // (/[a-zA-Z0-9-_ ]/.test(inp))
  if (/[a-zA-Z0-9-_ ]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

   ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    var data={
      "language_id":1,
      "country_id":1
    }
    let url='Vendor_Store/getdata/'
this.allapi.PostData(url,data).subscribe(promise=>
  {
    this.vendor_store_list=JSON.parse(promise.vendor_store_list).Table;
    this.statelist=JSON.parse(promise.statelist).Table;
  })
  }
   //validation
   get f(){
    return this.vendorstore.controls;
  }

  save_store()
  {
    // alert(1)
    this.spinner.show();
    if(this.vendorstore.value.storename.trim().length<5){
      this.vendorstore.controls['storename'].setErrors({'minlength': true})
    }
    if(this.vendorstore.value.storetitle.trim().length<5){
      this.vendorstore.controls['storetitle'].setErrors({'minlength': true})
    }
    if(this.vendorstore.value.storedetails.trim().length<5){
      this.vendorstore.controls['storedetails'].setErrors({'minlength': true})
    }
    if(this.vendorstore.value.pickupaddress.trim().length<5){
      this.vendorstore.controls['pickupaddress'].setErrors({'minlength': true})
    }
    if(this.vendorstore.value.v_city.trim().length<3){
      this.vendorstore.controls['v_city'].setErrors({'minlength': true})
    }

    this.submitted = true;
    if (this.vendorstore.invalid) {
      this.spinner.hide();
      return;

    }

    if(this.store_image=="" || this.store_image==null)
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Upload Store Image',
        showConfirmButton: false,
        timer: 2000
    })
    this.spinner.hide();
    return;
    }
    var data={
      "language_id":1,
      "store_id":this.store_id,
      "store_name":this.store_name,
      "store_title":this.store_title,
      "store_details":this.store_details,
      "store_image":this.store_image,
      "pickup_location":this.pickup_location,
      "pincode":parseInt(this.pincode),
      "country_id":1,
      "state_id":parseInt(this.state_id),
      "city":this.city,
      "contact_name":this.contact_name,
      "contact_primary_mobile":parseInt(this.contact_primary_mobile),
      "contact_email":this.contact_email,
      "contact_alternate_mobile":parseInt(this.contact_alternate_mobile)

    }
    console.log('save',data)
    let url='Vendor_Store/save_store/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        console.log(promise)
        if(promise.status=="Insert")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
       this.submitted=false;
       this.edit=false;
       this.vendorstore.reset();
        this.vendor_store_list=JSON.parse(promise.vendor_store_list).Table;
        this.statelist=JSON.parse(promise.statelist).Table
        this.closeform.hide();
        }
        else if(promise.status=="Failed")
        {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
        }
        else if (promise.msg_flg == "Validation") {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Please Enter All Mandatory Fields',
            showConfirmButton: false,
            timer: 3000
        })

          this.validation_list=promise.validation_list;

      }
      })
      this.spinner.hide();
  }
  edit_store(ss:any)
  {
    console.log('ss',ss)
   this.edit=true;
    this.store_id=ss.store_id;
   this.store_name=ss.store_name;
   this.store_title=ss.store_title;
   this.store_details=ss.store_details;
    this.store_image=ss.store_image;
    this.pickup_location=ss.pickup_location;
    this.pincode=ss.pincode;
   this.state_id=ss.state_id;
    this.city=ss.city;
    // mukta 30-08-2022
    this.contact_name=ss.contact_name,
    this.contact_email=ss.contact_email,
    this.contact_primary_mobile=ss.contact_primary_mobile,
    this.contact_alternate_mobile=ss.contact_alternate_mobile,


    this.closeform.show();
    }
    delete_store(ss:any) {

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
                "store_id":ss.store_id,
                  "language_id": 1
              }
              let url='Vendor_Store/delete_store/';
              this.allapi.PostData(url, data).subscribe(promise=> {

                  if (promise.status == "Delete") {
                    this.vendor_store_list=JSON.parse(promise.vendor_store_list).Table;
                    this.statelist=JSON.parse(promise.statelist).Table;
                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Deleted Successfully',
                          showConfirmButton: false,
                          timer: 3000
                      });

                  }
                  else if(promise.status == "Failed"){
                      Swal.fire({
                          position: 'center',
                          icon: 'warning',
                          title: 'Somthing Wrong Please Try Later',
                          showConfirmButton: false,
                          timer: 3000
                      })
                  }
              })

          }
      })

    };



  selectFileUpload(imageInput: any) {

    var formData = new FormData();
    const file: File = imageInput.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);
    // reader.onload = (event) => {
    //        this.imageBaseUrl=event.target
    //   this.updatedUrl=this.imageBaseUrl.result;
    //   this.store_image=this.updatedUrl;
    // }

  if (imageInput.files[0].type != "image/jpeg") {
    this.store_image="";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please Upload the JPEG file',
          showConfirmButton: false,
          timer: 3000
      })
          return;
      }
      else if (imageInput.files[0].size > 2097152) {
        this.store_image="";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Image size should be less than 2MB',
          showConfirmButton: false,
          timer: 3000
      })
          return;
      }
      else if (imageInput.files[0].size < 10000) {
        this.store_image="";
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Image size should be Greate than 10kb',
          showConfirmButton: false,
          timer: 3000
      })
          return;
      }

      this.SelectedFile_Array = imageInput.files[0];
      formData.append("File", this.SelectedFile_Array);
      let url = 'http://localhost:1305/api/ImageUpload/Store_Image_Upload';
      return this.httpClient.post('http://localhost:1305/api/ImageUpload/Store_Image_Upload', formData).subscribe((promise: any) => {
        this.store_image = promise.path;
      })


  }




  imagepath:any=''
  updatedUrl:any='https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock-2.png'
  imageDetails:any=[]
  listenClick(e:any){
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event) => {
        //console.log(event.target)
        this.imagepath=event.target
        this.updatedUrl=this.imagepath.result;
      }


  }
  public openModal(){
    this.edit=false;
    //this.vendorstore.reset();
    this.submitted=false;
    this.store_id=0;
    this.store_name="";
    this.store_title="";
    this.store_details="";
    this.store_image="";
    this.pickup_location="";
    this.city="";
    this.pincode="";
    this.state_id="";
    // Mukta 02-09-2022
    this.contact_name="",
    this.contact_email="",
    this.contact_primary_mobile="",
    this.contact_alternate_mobile="",


    this.closeform.show();
  }
  public doSomething(){

    this.closeform.hide();
  }
}

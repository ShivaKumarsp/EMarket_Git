import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
   private activateroute:ActivatedRoute) { }

   vendorstore = new FormGroup({
    storename: new FormControl('',[Validators.required]),
    storetitle: new FormControl('',[Validators.required]),
    storedetails: new FormControl('',[Validators.required]),
    pickupaddress: new FormControl('',[Validators.required]),
    v_state: new FormControl('',[Validators.required]),
    v_city: new FormControl('',[Validators.required]),
    v_pincode: new FormControl('',[Validators.required]),
    store_pic: new FormControl('')
  });

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  store_id=0;
  store_name="";
  store_title="";
  store_details="";
  store_image="";
  pickup_location="";
  pincode="";
  city="";
  state_id="";
  search="";
vendor_store_list:any;
statelist:any;
SelectedFile_Array:any;
submitted=false;
closeform:any;
   ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    var data={
      "language_id":1,
      "country_id":1
    }
    let url='Vendor_Store/getdata/';
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
    this.submitted = true;
    if (this.vendorstore.invalid) {
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
      "city":this.city
    }
    let url='Vendor_Store/save_store/';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
        if(promise.status=="Insert")
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
        this.store_id=0;
        this.store_name="";
        this.store_title="";
        this.store_details="";
        this.store_image="";
        this.pickup_location="";
        this.city="";
        this.pincode="";
        this.state_id="";
        this.vendor_store_list=JSON.parse(promise.vendor_store_list).Table;
        this.statelist=JSON.parse(promise.statelist).Table;
       
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
        
      })
  }
  edit_store(ss:any)
  {
   
    this.store_id=ss.store_id;
   this.store_name=ss.store_name;
   this.store_title=ss.store_title;
   this.store_details=ss.store_details;
    this.store_image=ss.store_image;
    this.pickup_location=ss.pickup_location;
    this.pincode=ss.pincode;
   this.state_id=ss.state_id;
    this.city=ss.city;
   
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
    reader.onload = (event) => {
           this.imageUrl=event.target
      this.updatedUrl=this.imageUrl.result;
      this.store_image=this.updatedUrl;
    }

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
        this.allapi.PostData_login(url,formData).subscribe(promise=>
          {
            this.store_image=promise.path;            
          })           
      }
  }

  

 
  imageUrl:any=''
  updatedUrl:any='https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock-2.png'
  imageDetails:any=[]
  listenClick(e:any){
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event) => {
        console.log(event.target)
        this.imageUrl=event.target
        this.updatedUrl=this.imageUrl.result;
      }


  }
  public openModal(){
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
   

    const formModels = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    formModels.show();
  }
  public doSomething(){
    const closeform = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    closeform.hide();
  }
}

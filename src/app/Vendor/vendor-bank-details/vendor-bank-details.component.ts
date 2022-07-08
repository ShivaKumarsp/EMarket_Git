import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-bank-details',
  templateUrl: './vendor-bank-details.component.html',
  styleUrls: ['./vendor-bank-details.component.css']
})
export class VendorBankDetailsComponent implements OnInit {

  constructor(private httpClient: HttpClient,
       private formBuilder: FormBuilder,
    private allapi: AllapiService) { }

    vendorbank = new FormGroup({
      accountholdername: new FormControl('',[Validators.required]),
      bankaccount: new FormControl('',[Validators.required]),
      ifsccode: new FormControl('',[Validators.required]),
      accounttype: new FormControl('',[Validators.required]),
      passbookimage: new FormControl()
   
    });
    vendor_bank:any;    
  passbook_image_available:boolean=false
  is_verified=0;
  vendor_bank_id=0;
  account_holder_name="";
  bank_account="";
  ifsc_code="";
  account_type="";
  passbook_image="";
  SelectedFile_Array:any;
  submitted=false;
  imageUrl:any;
  account_verify=0;
acc_dis:boolean=false;
request_delete=0;
   //validation
   get f(){
    return this.vendorbank.controls;
  }

  ngOnInit(): void {
    let url='Vendor_Store/get_bank_data/'
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        var bnk=JSON.parse(promise.vendor_bank).Table;
        if(bnk!='')
        {
          this.vendor_bank=JSON.parse(promise.vendor_bank).Table;
          this.vendor_bank_id=this.vendor_bank[0].vendor_bank_id;
          this.account_holder_name=this.vendor_bank[0].account_holder_name;
          this.bank_account=this.vendor_bank[0].bank_account;
          this.ifsc_code=this.vendor_bank[0].ifsc_code;
          this.account_type=this.vendor_bank[0].account_type;
          this.passbook_image=this.vendor_bank[0].passbook_image;
          this.account_verify=this.vendor_bank[0].account_verify;
          this.request_delete=this.vendor_bank[0].request_delete; 
        if(this.account_verify==1)
        {
          this.acc_dis=true;
        }
        }       
      })
  }

  save_bank_details()
  {
    this.submitted = true;
    if (this.vendorbank.invalid) {
      return;
    }

    var data={
      "vendor_bank_id":this.vendor_bank_id,
      "account_holder_name":this.account_holder_name,
      "bank_account":this.bank_account,
      "ifsc_code":this.ifsc_code,
      "account_type":this.account_type,
      "passbook_image":this.passbook_image
    }
    let url='Vendor_Store/save_bank_data/'
    this.allapi.PostData(url, data).subscribe(promise=>
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
        this.vendor_bank_id=0;
        this.account_holder_name="";
        this.bank_account="";
        this.ifsc_code="";
        this.account_type="";
        this.passbook_image="";
        this.account_verify=0;
        this.vendor_bank=JSON.parse(promise.vendor_bank).Table;
        if(this.vendor_bank!='')
        {
          this.vendor_bank=JSON.parse(promise.vendor_bank).Table;
          this.vendor_bank_id=this.vendor_bank[0].vendor_bank_id;
          this.account_holder_name=this.vendor_bank[0].account_holder_name;
          this.bank_account=this.vendor_bank[0].bank_account;
          this.ifsc_code=this.vendor_bank[0].ifsc_code;
          this.account_type=this.vendor_bank[0].account_type;
          this.passbook_image=this.vendor_bank[0].passbook_image;
          this.account_verify=this.vendor_bank[0].account_verify; 
          this.request_delete=this.vendor_bank[0].request_delete; 
          if(this.account_verify==1)
        {
          this.acc_dis=true;
        }
        }   
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
  update_request_delete(ss:any)
  {
    var data={
      "vendor_bank_id":this.vendor_bank_id,
      "request_delete":this.vendor_bank_id,
      "request_status":ss
    }
    let url='Vendor_Store/request_delete_account/'
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
   
    this.vendor_bank=JSON.parse(promise.vendor_bank).Table;
    if(this.vendor_bank!='')
    {
      this.vendor_bank=JSON.parse(promise.vendor_bank).Table;
      this.vendor_bank_id=this.vendor_bank[0].vendor_bank_id;
      this.account_holder_name=this.vendor_bank[0].account_holder_name;
      this.bank_account=this.vendor_bank[0].bank_account;
      this.ifsc_code=this.vendor_bank[0].ifsc_code;
      this.account_type=this.vendor_bank[0].account_type;
      this.passbook_image=this.vendor_bank[0].passbook_image;
      this.account_verify=this.vendor_bank[0].account_verify; 
      this.request_delete=this.vendor_bank[0].request_delete; 
      if(this.account_verify==1)
    {
      this.acc_dis=true;
    }
    }   
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
  selectFileUpload(imageInput: any) {
    var formData = new FormData();
    const file: File = imageInput.files[0];
  
    var reader = new FileReader();      
    reader.readAsDataURL(imageInput.files[0]);      
    reader.onload = (event) => {
           this.imageUrl=event.target
         this.passbook_image=this.imageUrl.result;
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
            this.passbook_image=promise.path;            
          })           
      }
  }
}

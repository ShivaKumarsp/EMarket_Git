import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

    vendorbank = new FormGroup({
      accountholdername: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(5)]),
      bankaccount: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),Validators.minLength(5)]),
      ifsccode: new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{4}0[0-9]{6}$'),Validators.minLength(7)]),
      accounttype: new FormControl('',[Validators.required]),
      passbookimage: new FormControl('')
   
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
validation_list:any;
base64='data:image/jpeg;base64,';
imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';

   //validation
   get f(){
    return this.vendorbank.controls;
  }
  keyPressSpace(event:any) {
    if(event.target.selectionStart===0 && event.code==='Space')
    {
      event.preventDefault();       
    }
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
    this.vendorbank.controls["passbookimage"].setValidators(null);
    this.vendorbank.controls["passbookimage"].updateValueAndValidity();
   
    this.spinner.show();
    if(this.vendorbank.value.accountholdername.trim().length<5){
      this.vendorbank.controls['accountholdername'].setErrors({'minlength': true})
    }
    if(this.vendorbank.value.bankaccount.trim().length<5){
      this.vendorbank.controls['bankaccount'].setErrors({'minlength': true})
    }
    if(this.vendorbank.value.ifsccode.trim().length<7){
      this.vendorbank.controls['ifsccode'].setErrors({'minlength': true})
    }

    this.submitted = true;
    if (this.vendorbank.invalid) {
      this.spinner.hide();
      return;
    }
    if(this.passbook_image=='' || this.passbook_image==null)
    {
      this.submitted = true;
      this.vendorbank.controls["passbookimage"].setValidators([Validators.required]);
      this.vendorbank.controls["passbookimage"].updateValueAndValidity();

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please Upload Bank Passbook',
        showConfirmButton: false,
        timer: 3000
    })
    this.spinner.hide();
    return
    }


    var data={
      "vendor_bank_id":this.vendor_bank_id,
      "account_holder_name":this.account_holder_name.trim(),
      "bank_account":this.bank_account.trim(),
      "ifsc_code":this.ifsc_code.trim(),
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
        else if(promise.status=="Validation")
        {
          this.validation_list=promise.validation_list;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Enter/Update All Mandatory Field',
            showConfirmButton: false,
            timer: 2000
        })
        }
        else if(promise.status=="Failed")
        {
          this.validation_list=promise.validation_list;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: promise.message,
            showConfirmButton: false,
            timer: 2000
        })
        }
        this.spinner.hide();
      })
      this.spinner.hide();
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
    if (imageInput.files[0].type != "image/jpeg") {
      this.passbook_image="";
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
      this.passbook_image="";
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
      this.passbook_image="";
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Image size Minimun 10kb',
        showConfirmButton: false,
        timer: 3000
    })
        return;
    }
    
    this.SelectedFile_Array = imageInput.files[0];
    formData.append("File", this.SelectedFile_Array);
    let url = 'http://localhost:1305/api/ImageUpload/Vendor_Details_Image_Upload';
    return this.httpClient.post(url, formData).subscribe((promise: any) => {
      this.passbook_image=promise.path;  
   
    })
  }

 
}

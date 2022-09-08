import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fileSize } from '@rxweb/reactive-form-validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-multipleimage',
  templateUrl: './add-multipleimage.component.html',
  styleUrls: ['./add-multipleimage.component.css']
})
export class AddMultipleimageComponent implements OnInit {

  submitted=false
  itemid:any;
  // sent_img:number=0
  //sucess_img:number=0
  imageDetails:any
    item_image=""
    selectItemImageUpload: any

  loop:any=[]
  constructor(private activateroute:ActivatedRoute,
    private httpclient:HttpClient,
    private fb: FormBuilder,
    private allapi: AllapiService,
    private spinner:NgxSpinnerService) { }

     imageform=new FormGroup({
      itemimage: new FormControl()
    })

    base64='data:image/jpeg;base64,';
    imageBaseUrl='http://124.153.106.183:8015/EMarket_Image';

  ngOnInit(): void {
    this.itemid=this.activateroute.snapshot.paramMap.get("itemid");

  }

  removethis(e:any){
    this.item_image=""
    // removed from front End
    let index= this.imageDetails.indexOf(e)
    if(index>-1)
    {
      this.imageDetails.splice(index,1)
    }

    //remove from Back End
  }

  saveimage()
  {
   if(this.imageDetails.length<3)
   {
    Swal.fire({
      position:'center',
      icon:'warning',
      title:'Please Upload Minimun 3 Image',
      showConfirmButton:false,
    })
    return
   }
    let data={
      item_id:parseInt(this.itemid),
      'imageDetails':this.imageDetails,
    }
    console.log('d',data)
    let imageurl = 'Vendor_Add_Item/save_multiple_images/'
    this.allapi.PostData(imageurl,data).subscribe(promise => {
      this.loop.push(data.item_id)
      if (promise.return_int == "Save") {
        this.loop.push(data.item_id)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Images Saved Successfully.',
          showConfirmButton: false,
          timer: 3000
        })

       //window.location.replace("/app/additemspecification/" + promise.ret_item_id);
        //this.spinner.hide();
      }
      else if (promise.status == "Failed") {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }
      // else if (promise.status == "Validation") {
      //   this.validation_list = promise.validation_list;
      // }
      else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.messageflg,
          showConfirmButton: false,
          timer: 5000
        })
      }

    })
    window.location.reload();
  }


//SelectedFile_Array:any;
VendorImageUpload(imageInput: any) {
// console.log(imageInput)
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
  else if (imageInput.files[0].size < 10000) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Image size Minimun 10kb',
      showConfirmButton: false,
      timer: 3000
  })
      return;
  }

  this.selectItemImageUpload = imageInput.files[0];
  // console.log(this.selectItemImageUpload)
  formData.append("File", this.selectItemImageUpload);
  //let url = 'http://localhost:1305/api/ImageUpload/Item_Image_Upload';
  return this.httpclient.post('http://localhost:1305/api/ImageUpload/Item_Image_Upload', formData).subscribe((promise: any) => {
    this.item_image = promise.path;
    // alert(this.item_image)
    // alert(this.imageDetails)

    if(this.imageDetails!=undefined)
    {
      //console.log(this.imageDetails.length)
      if(this.imageDetails.length>0)
      {
        this.imageDetails.push({image_url:this.item_image})
      }
      else
      {
        this.imageDetails=[];
        this.imageDetails.push({image_url:this.item_image})
      }

    }
else{
  this.imageDetails=[];
  this.imageDetails.push({image_url:this.item_image})
}

  })
}

get f()
{
  return this.imageform.controls
}



}

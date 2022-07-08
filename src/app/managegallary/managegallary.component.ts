import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllapiService } from '../apiservice/allapi.service';
declare var window:any;
@Component({
  selector: 'app-managegallary',
  templateUrl: './managegallary.component.html',
  styleUrls: ['./managegallary.component.css']
})
export class ManagegallaryComponent implements OnInit {
  search = new FormGroup({
    searchingString: new FormControl('', Validators.minLength(1))
  });
  files = new FormGroup({
    name:new FormControl(''),
    type: new FormControl(''),
    data: new FormControl('')
  });
  imageUrl:any=''
  imageDetails:any=[]
  medialist:any
  title=""
  media_type=""
  media_data=""
  selectItemImageUpload: any;
  status=""
  medialist1:any
  allmedialist:any
  current_m_type:any
  current_m_base64:any
  global_media_id:number=0
  global_media:any
  formModel:any
  p_imageurl:any
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,
) { }
  galleryData:any=[]
  searchImage(){
    // console.log(console.log(this.search.value));
  }
  SaveFile(){
    this.screen=0
    this.title=''
    this.formModel.hide()
    // console.log(console.log(this.files.value));
    var data={
      "title":this.title,
      "media_type":this.current_m_type,
      "media_data":this.current_m_base64.result,
      "media_id":this.global_media_id
      // "created_by":1,
    }
    console.log(data);
    let saveurl='media/save_media/'
    this.allapi.PostData(saveurl,data).subscribe(promise=>{
      if (promise.msg_flg == "Insert") {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'updated Successfully',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else if (promise.msg_flg == "Failed") {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Not updated, Please Try Again',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: (promise.messageflg),
            showConfirmButton: false,
            timer: 3000
        })
    }
    })
    //modal


    //location.reload();
    this.files.reset();this.screen=0;this.imageUrl=''
    setTimeout(()=>{this.getAll()},1000)
  }
  remove(e:any){
    this.screen=0
    Swal.fire({
      title: 'Are you sure?',
      text: "Do You want Delete This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed)
      {

        var data={
          "media_id":e,
        }
        let deleteurl='media/Delete/'+e
        this.allapi.PostData(deleteurl,data).subscribe(promise=>{
          if (promise.msg_flg == "Delete") {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Deleted Successfully',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else if (promise.msg_flg == "Failed") {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Not Deleted, Please Try Again',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: (promise.messageflg),
                showConfirmButton: false,
                timer: 3000
            })
        }
        })
        setTimeout(()=>{this.getAll()},1000)
      }
    })

  };
  screen=0
  //image convert tobase64
  changeImage(e:any){

    if (e.target.files && e.target.files[0]) {
      this.imageDetails.pop();
      this.imageDetails.push(
        {
          name:e.target.files[0].name,
          size:e.target.files[0].size,
          type:e.target.files[0].type
        }
      )
      this.current_m_type= e.target.files[0].type

      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event) => {
        //console.log(event.target)
        this.imageUrl=event.target
        this.current_m_base64=event.target
      }
      this.screen=1
    }
  }


  ngOnInit(): void {
    this.formModel = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.getAll()
    this.screen=0


  }
  getAll(){
    this.galleryData=[]
    let getmedia='media/get_allmedia/'
    this.allapi.GetDataById(getmedia,500).subscribe(promise=>{
      //this.medialist=promise.medialist
      this.allmedialist=JSON.parse(promise.allmedialist).Table
       this.allmedialist.forEach((x:any,i:any)=>{

        this.galleryData.push(
          {
            id:x.mediaid,
            data:x.mediadata,
            userid:x.createdby,
            updatedOn:x.createdon,
          }
        )
       });

    })
  }
 // image upload to convert base 64 to imageuploadcontroller
 ItemImageUpload(imageInput: any) {
  var formData = new FormData();
  const file: File = imageInput.files[0];
  this.selectItemImageUpload = imageInput.files[0];
  formData.append("File", this.selectItemImageUpload);
  let url = 'http://192.168.1.200:1305/api/ImageUpload/DocumentUpload';


  return this.http.post(url, formData).subscribe((promise: any) => {
    this.p_imageurl = promise.path;
    console.log(this.p_imageurl)
  })
}

}

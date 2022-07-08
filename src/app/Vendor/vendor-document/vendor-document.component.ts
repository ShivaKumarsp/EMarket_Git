import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window:any;
@Component({
  selector: 'app-vendor-document',
  templateUrl: './vendor-document.component.html',
  styleUrls: ['./vendor-document.component.css']
})
export class VendorDocumentComponent implements OnInit {

//declaration
documentlist:any=[]
documentListOtherDetails:any
doc_array:any=[];
showdoc:boolean=false
vendordocumentlist:any
vendor_id=0
md_documentname=""
documentno=""
vdoc_id=0
newvdoc_id:any=0
newdocumentdata:any=''
newdocumentName:any=""
editable:boolean=false
formModel:any;
formModels:any
md_id="";
md_document_no=""
tempModel="1234"
v_obj:any
screen:any=0
messageflg:any=[]
pattrn=""


    form!: FormGroup;
  constructor(private httpClient: HttpClient,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private allapi: AllapiService,) {
        }

    get f(){
        return this.form.controls;
      }
    savedata() {

      this.documentlist.forEach((list:any)=>{
        let cc = 'control'+list.mdid
        let newvdoc_id=0
        let newvdoc_fileurl=""
        let newvdoc_filename:""
        let newvdoc_description:""
        let newmd_id=list.mdid
        let newmd_documentname=""
        let newdocument=''
        let newmd_document_no=''
        let language_id=0
        //for edit data
        this.vendordocumentlist.forEach((x:any)=>{
          if(x.mddocumentname == list.mddocumentname){
            newvdoc_id=x.vdocid
             if(  x.documentnumber != this.forms.value[cc]){
              let datas={
                "vdoc_id": x.vdocid,
                "md_document_no":this.forms.value[cc],
                "md_documentname":x.mddocumentname,
                "test":'usewr'
              }
             }
          }
        })
        if(this.forms.value[cc] != undefined){
          newmd_document_no = this.forms.value[cc]
        }

        var data = {
            vdoc_id:newvdoc_id,
            vdoc_fileurl:"",
            vdoc_filename:"",
            vdoc_description:"",
            md_id:newmd_id,
            md_documentname:list.mddocumentname,
            document:newmd_document_no,
            md_document_no:newmd_document_no,
            language_id:1,
        }
        console.log(data)
        let oldid = 'old'+list.mdid
        let oldData = document.getElementById(oldid)?.innerHTML
        if(oldData != data.document){
          this.save(data)
        }
      })
    setTimeout(()=>{this.getData()},1000)}
//save
save(data:any)
{
  this.messageflg.length=0
  let saveurl='Vendor_Document/save_vendor_documents/'
      this.allapi.PostData(saveurl,data).subscribe(promise=> {
        if(this.messageflg){
          this.messageflg.push(promise.messageflg)
        }

              if (promise.msg_flg == "Update") {
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Vendor Documents Uploaded Successfully.',
                      showConfirmButton: false,
                      timer: 3000
                  })
              }
              else if (promise.msg_flg == "Failed") {
                  Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Vendor Documents Not Uploaded, Please Try Again',
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
          setTimeout(()=>{window.location.reload(true)},1000)
          this.forms.reset()
}

    //dynamic form creation
    forms = this.formBuilder.group({});
    addform(e:any,label:any,all:any)
    {
      this.tempModel = ''
      let c='control'+e
      let availdata=""
      this.vendordocumentlist.map((x:any)=>{ if(x.documentid===e){ availdata= x.documentnumber}})
      if(availdata=='' || availdata==null){ availdata=''}
      this.forms.addControl(c, new FormControl(availdata,[Validators.minLength(5),Validators.required,Validators.pattern(all.mdpattern)]))
      this.tempModel=availdata

      //this.forms.addControl(c, new FormControl())
      //console.log(all)
      // this.vendordocumentlist.forEach((list:any)=>{

      //    if(label==list.mddocumentname ){

      //       this.tempModel=list.documentnumber
      //     }
      //   })
      }
     ngOnInit(): void {
        this.getData()
    }

  getData(){

    var lang1 = window.sessionStorage.getItem('lang_id');
      if (lang1 == null) {
          var sid = 1;
      }
      else {
          var sid = parseInt(lang1);
      }
      let geturl='Vendor_Document/getdata/'
      this.allapi.GetDataById(geturl, sid).subscribe(promise => {
          console.log(promise)
          this.vendordocumentlist=JSON.parse(promise.vendordocumentlist).Table
          this.documentlist = JSON.parse(promise.documentlist).Table;
          console.log( this.vendordocumentlist)
          console.log(this.documentlist)
        })

    this.screen=0
 }

}





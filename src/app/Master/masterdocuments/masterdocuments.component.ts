import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';
declare var window:any;
@Component({
  selector: 'app-masterdocuments',
  templateUrl: './masterdocuments.component.html',
  styleUrls: ['./masterdocuments.component.css']
})
export class MasterdocumentsComponent implements OnInit {
  dform:FormGroup
  masterdoclist:any
  dformModel:any
  mdid=""
  md_documentname=""
  md_description=""
  md_pattern=""
  is_editing:any=false
  is_data:any
  submitted:boolean=false
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
   private allapi:AllapiService,
   private activateroute:ActivatedRoute) {

      this.dform = new FormGroup({
        md_id:new FormControl('',),
        docname: new FormControl('',[Validators.required,Validators.minLength(5)]),
        description: new FormControl(''),
        pattern: new FormControl(''),
        language_id: new FormControl(''),
        isrequired:new FormControl(''),
      });
   }

  ngOnInit(): void {
    this.dformModel = new window.bootstrap.Modal(
      document.getElementById("masterdocModal")
    );
    this.getonload();
  }

  getonload()
  {
    let url='masterdocument/getdata/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.masterdoclist=JSON.parse(promise.masterdocumentlist).Table;
        console.log(promise)

      })
  }
  //modal
  openModal(e:any,is_edit:boolean)
  {
    this.is_editing=is_edit
    this.is_data=e

    let desc = ""

    if(is_edit)
    {
      if(e.in_md_description != null){
        desc =e.in_md_description
      }
      this.dform.patchValue(
        {
          md_id:e.in_md_id,
          pattern:e.in_pattern,
          description:desc,
          docname:e.in_md_documentname,
          language_id:1,
          isrequired:e.in_required,
        }
      )

    }
    else{
      this.dform.patchValue(
        {
          md_id:0,
          pattern:'',
          description:'',
          docname:'',
          language_id:1,
          isrequired:false,
        }
      )
    }

    this.dformModel.show();

  }
  //close-Modal
  closeModal()
  {
    this.dformModel.hide();
  }
  //update
  update()
  {
    var data={
      md_id:this.dform.value.md_id,
      md_documentname:this.dform.value.docname,
      md_description:this.dform.value.description,
      pattern:this.dform.value.pattern,
      language_id:1,
      isrequired:this.dform.value.isrequired,
    }
    console.log(data)
    let geturl='masterdocument/save/'
    this.allapi.PostData(geturl,data).subscribe(response=>{
      console.log(response)
      this.closeModal()
      this.getonload()
    })

  }
}

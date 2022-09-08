import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managefacilitationcenter',
  templateUrl: './managefacilitationcenter.component.html',
  styleUrls: ['./managefacilitationcenter.component.css']
})
export class ManagefacilitationcenterComponent implements OnInit {
  urlhub_id:any
  hub_id=""
  hublist:any
  deliverablePincodes:any=[]
  outputData:any=""
  newhub_id:any=0
  spin_id=""
  newspin_id:any=0
  screen:any=0
  screenBody:any=0
  hubLists:any
  hubListsType2:any=[]
  formType:any=0
  pincodelist:any
  statelist:any
  countrylist:any
  citylist:any
  dpincodelist:any
  tableserviceable:any=[]
  submitted = false;
  statelists:any
  citylists:any
  hubpinlists:any
  messageflg:any=[]
  currenthub:any
  hform= new FormGroup(
    {
      hub_id:new FormControl(''),
      hname:new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern("^[a-zA-Z0-9_ ]*$")]),
      email:new FormControl('',[Validators.required,Validators.email]),
      contact:new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      Address:new FormControl('',[Validators.required,Validators.pattern("[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}")]),
      hcity:new FormControl('',[Validators.required]),
      hstate:new FormControl('',[Validators.required]),
      hpin:new FormControl('',[Validators.required]),
      delpin:new FormControl(''),
      hcountry:new FormControl('',[Validators.required]),
      htype:new FormControl(3),
      Phub:new FormControl('')
    }

  );
  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.urlhub_id = this._Activatedroute.snapshot.paramMap.get("hub_id")
    this.hform.patchValue({
      Phub:this.urlhub_id
    })
    this.onload()
  }

  //get state
  get_state(e:any)
  {
    var data={
      "language_id":1,
      "country_id":parseInt(e.target.value)
    }
    //console.log(data)
    let getstate='Managehub/get_state/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
      this.statelist=JSON.parse(promise.statelists).Table
    })
  }
  //bind data while editing
  get_state_by_id(e:any)
  {
    var data={
      "language_id":1,
      "country_id":e
    }

    let getstate='Managehub/get_state/'
    this.allapi.PostData(getstate,data).subscribe(promise=>{
      this.statelist=JSON.parse(promise.statelists).Table
    })
  }

    //get city
    get_city(e:any)
    {
      var data={
        "language_id":1,
        "country_id":parseInt(this.hform.value.hcountry),
        "state_id":parseInt(e.target.value)
      }
      //console.log(data)
      let getstate='Managehub/get_city/'
      this.allapi.PostData(getstate,data).subscribe(promise=>{
        //console.log(this.citylist)
        this.citylist=JSON.parse(promise.citylists).Table
      })
    }
     //get city
     get_cityWe(e:any)
     {
      //  console.log(e)
      //  console.log(this.hform.value)
       var data={
         "language_id":1,
         "country_id":parseInt(this.hform.value.hcountry),
         "state_id":e
       }
       //console.log(data)
       let getstate='Managehub/get_city/'
       this.allapi.PostData(getstate,data).subscribe(promise=>{
         //console.log(this.citylist)
         this.citylist=JSON.parse(promise.citylists).Table
       })
     }
//get pincode
get_pincode(e:any)
{
  var data={
    "language_id":1,
    "country_id":parseInt(this.hform.value.hcountry),
    "state_id":parseInt(this.hform.value.hstate),
    "city_id":parseInt(e.target.value)
  }
  //console.log(data)
  let getstate='Managehub/get_pincode/'
  this.allapi.PostData(getstate,data).subscribe(promise=>{
    //console.log(this.pincodelist)
    this.pincodelist=JSON.parse(promise.hubpinlists).Table
  })
}

//get pincode While editing
get_pincodeWe(e:any)
{
  var data={
    "language_id":1,
    "country_id":parseInt(this.hform.value.hcountry),
    "state_id":parseInt(this.hform.value.hstate),
    "city_id":e
  }
  //console.log(data)
  let getstate='Managehub/get_pincode/'
  this.allapi.PostData(getstate,data).subscribe(promise=>{
    //console.log(this.pincodelist)
    this.pincodelist=JSON.parse(promise.hubpinlists).Table
  })
}
  //onload
  onload(){
    let gethub='Managehub/get/'
    this.allapi.GetDataById(gethub,1).subscribe(promise=>{
      this.hublist=promise.hublist
      this.countrylist=JSON.parse(promise.countrylist).Table
      this.dpincodelist=JSON.parse(promise.dpincodelist).Table
      this.hubLists=JSON.parse(this.hublist)["Table"]
      console.log(this.hubLists)
      this.hubLists.forEach((ele:any) => {
      if(ele.parent_id==this.urlhub_id){
        this.hubListsType2.push(ele)
      }
      console.log('element',ele,this.urlhub_id)
      if(ele.in_hub_id==this.urlhub_id){
        this.currenthub=ele

      }
      });
    })

  }
  //get servicable by hub id

  getServiceableListbyHubID(hubid:any){
    let getbyhubid='Managehub/get_servicablePincodes/'
    this.allapi.GetDataById(getbyhubid,hubid).subscribe(promise=>{
      this.tableserviceable=JSON.parse(promise.servicablepincodelist)["Table"]
      console.log(this.tableserviceable)
      //console.log(this.tableserviceable)
    })
  }
    //save
    save()
    {
      this.messageflg.length=0
      if(this.hform.value.Address.trim() ==''){
        this.hform.controls['Address'].setErrors({'required': true})
      }
      if(this.hform.value.hname.trim() ==''){
        this.hform.controls['hname'].setErrors({'required': true})
      }

     //console.log(this.hform)
    this.submitted = true;
    if (this.hform.invalid) {
      return;
    }
      if(this.formType ==0){
        this.newhub_id=0
      }else{
        this.newhub_id = this.hform.value.hub_id
      }
      let _parent_id=0
      if(this.hform.value.htype==3)
      {
        _parent_id=parseInt(this.hform.value.Phub)
      }
      //let pincode6=this.getPincode(parseInt(this.hform.value.hpin),false)
      let data={
            hub_id:this.newhub_id,
            Address:this.hform.value.Address,
            contact_no:parseInt(this.hform.value.contact) ,
            email: this.hform.value.email,
            hub_city:parseInt(this.hform.value.hcity),
            hub_name: this.hform.value.hname,
            //hub_pincode:this.hform.value.hpin,
            pincode_id:parseInt(this.hform.value.hpin),
            hub_state:parseInt(this.hform.value.hstate),
            hub_country:parseInt(this.hform.value.hcountry),
            hub_type:parseInt(this.hform.value.htype),
            parent_id:_parent_id
      }
      //console.log(this.hform.value.hpin)
      //console.log('data',data)
      //console.log('hform', this.hform.value)
      let savehub='Managehub/save_hub/'
      this.allapi.PostData(savehub,data).subscribe(promise=>{
        if(this.messageflg){
          this.messageflg.push(promise.messageflg)
        }
        if (promise.msg_flg == "Save") {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'updated Successfully',
              showConfirmButton: false,
              timer: 3000
          })
          this.formType=1
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
      //window.location.reload();
      //this.hform.reset()
      })

      this.screenBody=1;
      this.tableserviceable.length=0
      this.getServiceableListbyHubID(this.newhub_id)
    }
    getPins(e:any){
      if( e!== null){
        let str = ''
        JSON.parse(e).map((x:any,y:any)=>{
          let obj:any=this.getPincode(x,true)
          let tempdata = '<strong>'+obj[0].in_pincode +'</strong><br/>'+obj[0].in_area
          str = str+ '<span class="mb-3 p-1 small">'+tempdata+'</span> <br/>'
        })
        e=str
        return e

      }
    }
    //save servicable pincode
    addthis(){
      let pin = this.hform.value.delpin
      if(pin){
        let jpin = JSON.parse(pin)
        let spin = 0
          let insert=true
          Object.values(this.tableserviceable).forEach((key:any,value:any) => {
            if((jpin.pincodeid == key.in_pincode_id) && (jpin.pincodes == key.in_pincode)){
              insert=false
            }
          });
          if(insert){
            this.tableserviceable.push({
              in_area:jpin.pinarea,
              in_pincode:jpin.pincodes,
              in_pincode_id:jpin.pincodeid,
              in_spin_id:spin,
            })

            let data={

              spin_id:spin,
              hub_id:this.newhub_id,
              pincode:jpin.pincodes,
              pincode_id:jpin.pincodeid,

            }
            //console.log(data)
            let savehub='Managehub/save_servicablepin/'
            this.allapi.PostData(savehub,data).subscribe(promise=>{
              if(this.messageflg){
                this.messageflg.push(promise.messageflg)
              }
              if (promise.msg_flg == "Save") {
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
            this.getServiceableListbyHubID(this.newhub_id)

            })





          }
      }
    }
    currentHub:any=0
    //edit
    Edit(hlist:any)
    {
      this.formType=1
      this.screen=1
      this.get_state_by_id(hlist.in_hub_country)
      this.hform.patchValue(
        {
          hname: hlist.in_hub_name,
          hub_id:hlist.in_hub_id,
          Address:hlist.in_address,
          contact:hlist.in_contact_no,
          email: hlist.in_email,
          hcountry:hlist.in_hub_country,
          hstate:hlist.in_hub_state,
          hcity: hlist.in_hub_city,
          hpin:hlist.in_pincode_id,
          htype:hlist.in_hub_type,
          Phub:hlist.parent_id,
        }
      )
      this.get_cityWe(hlist.in_hub_state)
      this.get_pincodeWe(hlist.in_hub_city)
    }
    //remove
    removeTag(e:any){
      if(e){
        var index = this.tableserviceable.indexOf(e);
        if (index !== -1) {
          this.tableserviceable.splice(index, 1);
        }
      }

    }
    showlist()
    {
      window.location.reload()
    }
    //get pin code for deliverable pincode
    getPincode(id:any ,witharea:boolean){
      let reData = 0
      let reArr:any =[]
      this.dpincodelist.forEach((ele:any) => {
        if(ele.in_pincode_id == id){
          reData= ele.in_pincode
          reArr.push(ele)
        }
      });
        if(witharea){
          id = reArr
        }else{
          id = reData

        }
       return id
    }
    //delete
    delete(e:any)
    {
        let data={

              spin_id:e,
              hub_id:this.newhub_id,


        }
        let savehub='Managehub/delete'
        this.allapi.PostData(savehub,data).subscribe(promise=>{

          if (promise.msg_flg == "delete") {
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
                title: 'Not updated, Please Try Again',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Failed',
                showConfirmButton: false,
                timer: 3000
            })
        }
        if (promise.msg_flg == "delete")
        {
          this.getServiceableListbyHubID(this.newhub_id)
        }


        })

    }
    stringify(e:any){
      return JSON.stringify(e)
    }
    //validation
    get f(){
      return this.hform.controls;
    }


}

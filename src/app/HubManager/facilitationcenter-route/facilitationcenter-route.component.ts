import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facilitationcenter-route',
  templateUrl: './facilitationcenter-route.component.html',
  styleUrls: ['./facilitationcenter-route.component.css']
})
export class FacilitationcenterRouteComponent implements OnInit {
  submitted=false
  facilitationcenterlist:any
  consignmentlist:any
  facilitationschedulelist:any
  newt_id=0
  locallist:any
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  search="";
  is_active=true
  minDate=new  Date()
  maxDate=new Date()
  messageflg:any
  vehicletypelist:any

  constructor(private allapi:AllapiService) { }

  formRoute=new FormGroup({
    hub_id:new FormControl (''),
    fhubid:new FormControl ('',[Validators.required]),
    transport_id:new FormControl ('',[Validators.required]),
    schedule_date:new FormControl ('',[Validators.required]),
    departure_time:new FormControl ('',[Validators.required]),
  }

);
  formTransport=new FormGroup ({
    tname:new FormControl ('',[Validators.required,Validators.pattern("^[a-zA-Z_ ]*$")]),
    temail:new FormControl ('',[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    tmobile:new FormControl ('',[Validators.required,Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    hub_id:new FormControl ('',),
    treg:new FormControl ('',[Validators.required,Validators.pattern("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$")]),
    vehiclel:new FormControl ('',[Validators.required,Validators.pattern("^[0-9]{1,2}.[0-9]{1,2}$")]),
    vehicleb:new FormControl ('',[Validators.required,Validators.pattern("^[0-9]{1,2}.[0-9]{1,2}$")]),
    vehicleh:new FormControl ('',[Validators.required,Validators.pattern("^[0-9]{1,2}.[0-9]{1,2}$")]),
    vehiclew:new FormControl ('',[Validators.required,Validators.pattern("^[0-9]{2,3}.[0-9]{1,2}$")]),
    vtype:new FormControl ('',[Validators.required]),
  })

  ngOnInit(): void {

    this.onload()
  }
  onload()
  {
    let geturl='hubtofacilitationcenter/Get/'
    this.allapi.GetDataById(geturl,1).subscribe(promise=>{
      //console.log(this.locallist)
       this.facilitationcenterlist=JSON.parse(promise.facilitationcenterlist).Table
       this.facilitationschedulelist=JSON.parse(promise.facilitationschedulelist).Table
       this.locallist=JSON.parse(promise.locallist).Table
       this.vehicletypelist=JSON.parse(promise.vehicletypelist).Table


    })
  }
//save
save()
{
  this.submitted=true
  console.log(this.formTransport.controls)
  if(this.formTransport.invalid)
  {
    return ;
  }
  let data={
    transport_id:this.newt_id,
    transportor_name:this.formTransport.value.tname,
    vehicle_registration_no:this.formTransport.value.treg,
    contact_no: parseInt(this.formTransport.value.tmobile),
    email_id:this.formTransport.value.temail,
    //hub_id:10,
    vehicle_type:this.formTransport.value.vtype,
    length:parseInt(this.formTransport.value.vehiclel),
    breadth:parseInt(this.formTransport.value.vehicleb),
    height:parseInt(this.formTransport.value.vehicleh),
    max_weight:parseInt(this.formTransport.value.vehiclew)
}
console.log('formsave',data)
let savehub='hubtofacilitationcenter/Save/'
this.allapi.PostData(savehub,data).subscribe(promise=>{

 // backend validation
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

})

window.location.reload()
this.onload()
}
//save schedule
schedulesave()
{
  this.submitted=true
  if(this.formRoute.invalid)
  {
    return;
  }
  let data={
      assign_id:0,
      hub_id:10,
      transport_id:this.formRoute.value.transport_id,
      facilitation_center:this.formRoute.value.fhubid,
      scheduled_date:this.formRoute.value.schedule_date,
      departure_time:this.formRoute.value.departure_time,

  }
  //console.log('schedulesave',data)
  let savehub='hubtofacilitationcenter/schedulesave//'
this.allapi.PostData(savehub,data).subscribe(promise=>{
 // backend validation
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
})
window.location.reload()
this.onload()
}
  get f()
  {
   return this.formTransport.controls
  }
  get g()
  {
    return this.formRoute.controls
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

}

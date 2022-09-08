import { ControlPosition } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hubtofacilitationcenter',
  templateUrl: './hubtofacilitationcenter.component.html',
  styleUrls: ['./hubtofacilitationcenter.component.css']
})
export class HubtofacilitationcenterComponent implements OnInit {
  showCheckbox=false
  facilitationcenterlist:any
  consignmentlist:any
  locallist:any
  loop:any=[]
  //DefaultHubId=10
  dd=new Date()
  submitted=false
  minDate=new Date()
  maxDate=new Date()
  leftTab=true
  pconsignmentlist:any
  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let geturl='hubtofacilitationcenter/Get/'
    this.allapi.GetDataById(geturl,1).subscribe(promise=>{
       this.facilitationcenterlist=JSON.parse(promise.facilitationcenterlist).Table
       this.consignmentlist=JSON.parse(promise.consignmentlist).Table
      //console.log('consignmentlist',this.consignmentlist)
       this.locallist=JSON.parse(promise.locallist).Table
       this.pconsignmentlist=JSON.parse(promise.pconsignmentlist).Table
     // console.log(promise)
    })

  }
  newbatch:any=[]
  form = new FormGroup({
    transportID: new FormControl(),
    facilitationHubID: new FormControl(),
    //departureTime:new FormControl(),
    sDate:new FormControl()
  });
  submit(){
    //console.log(this.form.value)
  }
  selectedRowIds: Set<number> = new Set<number>();
  selectedId: string='';

  onRowClick(consignmentid: number) {
    if(this.selectedRowIds.has(consignmentid)) {
     this.selectedRowIds.delete(consignmentid);
    }
    else {
      this.selectedRowIds.add(consignmentid);
      console.log('selected',this.selectedRowIds)
    }
  }
  getSelectedRowsP(){
    return this.pconsignmentlist.filter((x:any) => this.selectedRowIds.has(x.consignmentid));
  }
  getSelectedRows(){
    console.log(this.consignmentlist)
    return this.consignmentlist.filter((x:any) => this.selectedRowIds.has(x.consignmentid));
  }
//drop
  onLogClick() {
    this.newbatch=this.getSelectedRows()
    this.showCheckbox =false

    if(this.newbatch.length>0)
    {
      //create batch Id
      var data={
        //send_by_id:  this.DefaultHubId,
        send_by_roleid: 8,
        send_by_status:1,
        receive_by_id: this.form.value.facilitationHubID,
        receive_by_roleid: 9,
        receive_by_status: 3,
      }
      console.log('savebatch',data)
      let geturl='hubtofacilitationcenter/Save_batch/'
      this.allapi.PostData(geturl,data).subscribe(promise=>{
       let newBatchId=JSON.parse(promise.rdata).Table[0].out_batch_id
       console.log('response',newBatchId)
       this.newbatch.forEach((element:any) => {
         let newdata={
          consignment_id:element.consignmentid,
          batch_id:newBatchId,
         }
         console.log(newdata)
         //save batch_consignment (map bach with consignment)
         let geturl='hubtofacilitationcenter/Save_batch_consignment/'
        // let countP=1
         this.allapi.PostData(geturl,newdata).subscribe(promise=>{
          this.loop.push(newdata.consignment_id)
          //console.log(this.loop)
          if (promise.msg_flg == "Save") {
            this.loop.push(newdata.consignment_id)
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
        //save schedule
        let generatedata={
          assigned_id:0,
          transportor_id:this.form.value.transportID,
          facilitation_id:this.form.value.facilitationHubID,
          //hub_id:this.form.value.facilitationHubID,
          scheduled_date:this.form.value.sDate,
          batch_id:newBatchId,
          type_of_consignment:2,
         }
         console.log('gdata',generatedata)
        let saveurl='hubtofacilitationcenter/schedulesave/'
        this.allapi.PostData(saveurl,generatedata).subscribe(promise=>{
              //console.log('schedulesave',promise)
            //backend validation show
            // if(this.messageflg){
            //     this.messageflg.push(promise.messageflg)
            // }
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
         //update batch
         let data2={
          batch_id:newBatchId
         }
         let updateurl='hubtofacilitationcenter/update_batch_consignment/'
         this.allapi.PostData(updateurl,data2).subscribe(promise=>{

         })
       });


      })

    }
  this.ngOnInit()
  window.location.reload()
  }
//pick up
onLogClickp() {
  this.newbatch=this.getSelectedRowsP()
  console.log('selected pick',this.newbatch)
  this.showCheckbox =false

  if(this.newbatch.length>0)
  {
    //create batch Id
    var data={
      send_by_id:this.form.value.facilitationHubID,
      send_by_roleid: 9,
      send_by_status:1,
      //receive_by_id: this.form.value.facilitationHubID,
      receive_by_roleid: 8,
      receive_by_status: 3,
    }
    console.log('picksavebatch',data)
    let geturl='hubtofacilitationcenter/Save_batch/'
    this.allapi.PostData(geturl,data).subscribe(promise=>{
     let newBatchId=JSON.parse(promise.rdata).Table[0].out_batch_id
     console.log('response',newBatchId)
     this.newbatch.forEach((element:any) => {
       let newdata={
        consignment_id:element.consignmentid,
        batch_id:newBatchId,
       }
       console.log(newdata)
       //save batch_consignment (map bach with consignment)
       let geturl='hubtofacilitationcenter/Save_batch_consignment/'
      // let countP=1
       this.allapi.PostData(geturl,newdata).subscribe(promise=>{
        this.loop.push(newdata.consignment_id)
        //console.log(this.loop)
        if (promise.msg_flg == "Save") {
          this.loop.push(newdata.consignment_id)
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
      //save schedule
      let generatedata2={
        assigned_id:0,
        transportor_id:this.form.value.transportID,
        facilitation_id:this.form.value.facilitationHubID,
        //hub_id:this.form.value.facilitationHubID,
        scheduled_date:this.form.value.sDate,
        batch_id:newBatchId,
        type_of_consignment:1,
       }
       console.log('gdata',generatedata2)
      let psaveurl='hubtofacilitationcenter/schedulesave/'
      this.allapi.PostData(psaveurl,generatedata2).subscribe(promise=>{
            console.log('schedulesave',promise)
          //backend validation show
          // if(this.messageflg){
          //     this.messageflg.push(promise.messageflg)
          // }
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
       //update batch
       let datau={
        batch_id:newBatchId
       }
       let updateurl='hubtofacilitationcenter/update_pbatch_consignment/'
       this.allapi.PostData(updateurl,datau).subscribe(promise=>{
       })
     });


    })

  }
this.ngOnInit()
window.location.reload()
}

  get f()
  {
    return this.form.controls
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-hub-route',
  templateUrl: './hub-route.component.html',
  styleUrls: ['./hub-route.component.css']
})
export class HubRouteComponent implements OnInit {
  time = {hour: 13, minute: 30};

  newRoutes:any=[]
  constructor(private allapi:AllapiService) { }
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];

  hub_list_1:any;
  hub_list_2:any;
  hub_route_list:any;
  validation_list:any;
  transportation_type_list:any;
  source_hub_id="";
  destination_hub_id="";
  transport_id="";
  distance="";
  travel_time_hour="";
  travel_time_minute="";
  departure_time="";
  hub_route_id=0;
  submitted=false;
  search="";
  //form group
  routeForm=new FormGroup({
      hub1:new FormControl ('',[Validators.required]),
      hub2:new FormControl ('',[Validators.required]),
         transportationType:new FormControl ('',[Validators.required]),
      totalDistance:new FormControl ('',[Validators.required]),
      travelHour:new FormControl (''),
      travelMinute:new FormControl ('',[Validators.required]),
      departuretime:new FormControl ('',[Validators.required]),
    }
  );

  hubs:any=[
    {hubID:5123,
      hubName:"Udayagiri Mysore Logistic",
      locationState:"Karnataka",
      locationPincode:	570019,
      deliverablePincode: [	570014,	570015,	570016,	570017,	570018,	570019,	570020,	570021,	570022]
    },
    {
      hubID:2332,
      hubName:"Bangalore Kalkunte Logistic",
      locationState:"Karnataka",
      locationPincode:560067,
      deliverablePincode: [560067,560066,560065,560068]
    },
    {
      hubID:3564,
      hubName:"West Delhi Logistic",
      locationState:"Delhi",
      locationPincode:110015,
      deliverablePincode: [110018,110015,110016,110019,110017]
    },
    {
      hubID:4234,
      hubName:"Ananthapur Logistic",
      locationState:"Andhra Predesh",
      locationPincode:515001,
      deliverablePincode: [515001,515002,515003,515004]
    }
  ]

  ngOnInit(): void {
    let url='Hub_Route/get_data/';
    this.allapi.GetDataById(url,1).subscribe(promise=>
      {
        this.hub_list_1=JSON.parse(promise.hub_list_1).Table;      
        this.hub_route_list=JSON.parse(promise.hub_route_list).Table;
        
      })
  }

  get_transport_type(ss:any)
  {
    var data={
      "source_hub_id":parseInt(ss)
    }
    let url='Hub_Route/get_transport_type';
    this.allapi.PostData(url,data).subscribe(promise=>
      {
       this.transportation_type_list=JSON.parse(promise.transportation_type_list).Table;
       this.hub_list_2=JSON.parse(promise.hub_list_2).Table;
      })
  }

 saveRoute(){
  this.submitted = true;
    if (this.routeForm.invalid) {
      return;
    }
    if(this.travel_time_hour=="")
    {
      this.travel_time_hour="0";
    }
var data={
  "hub_route_id":this.hub_route_id,
  "source_hub_id":this.source_hub_id,
  "destination_hub_id":this.destination_hub_id,
  "transport_id":this.transport_id,
  "distance":this.distance,
  "travel_time_hour":parseInt(this.travel_time_hour),
  "travel_time_minute":parseInt(this.travel_time_minute),
  "departure_time":this.departure_time,
  "language_id":1
}
let url='Hub_Route/save_hub_route';
this.allapi.PostData(url,data).subscribe(promise=>
  {
    this.validation_list=[];
    if(promise.status=="Insert")
    {
      this.submitted=false;
      this.routeForm.reset();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    this.hub_list_1=JSON.parse(promise.hub_list_1).Table;      
    this.hub_route_list=JSON.parse(promise.hub_route_list).Table;
 
  }
    else if(promise.status=="Failed")
    {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: promise.message,
        showConfirmButton: false,
        timer: 3000
    })
    }
    else if(promise.status=="Validation")
    {
      this.validation_list=promise.validation_list;
    }
    
  })
 }
 edit_data(ss:any)
 {
  this.hub_route_id=ss.hub_route_id;
  this.source_hub_id=ss.source_hub_id;
  this.get_transport_type(this.source_hub_id);
  this.destination_hub_id=ss.destination_hub_id;
  this.transport_id=ss.transport_id;
  this.distance=ss.distance;
  this.travel_time_hour=ss.travel_time_hour;
  this.travel_time_minute=ss.travel_time_minute;
  this.departure_time=ss.departure_time;
 }
delete_data(ss:any) {

  Swal.fire({
      title: 'Are you sure?',
      text: "Do You want Delete This!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
  }).then((result) => {
      if (result.isConfirmed) { 

        var data={
          "hub_route_id":parseInt(ss.hub_route_id),
        }
        let url='Hub_Route/delete_hub_route/';
        this.allapi.PostData(url,data).subscribe(promise=>
          {  
            if(promise.status="Insert")
            {
              this.hub_list_1=JSON.parse(promise.hub_list_1).Table;      
              this.hub_route_list=JSON.parse(promise.hub_route_list).Table;

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
          }
            else if(promise.status="Failed")
            {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: promise.message,
                showConfirmButton: false,
                timer: 3000
            })
            }
            
          })

      }
  })

};

 Clear()
 {
  this.source_hub_id="";
  this.destination_hub_id="";
  this.transport_id="";
  this.distance="";
  this.travel_time_hour="";
  this.travel_time_minute="";
  this.departure_time="";
  this.hub_route_id=0;
  this.submitted=false;
this.routeForm.reset();
 }
  //validation
  get f(){
    return this.routeForm.controls;
  }

 onTableDataChange(event: any) {
  this.page = event;
  this.ngOnInit();
}
 export(){
  console.log(this.newRoutes)
 }
}

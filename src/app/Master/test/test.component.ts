import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Graph from 'graphology';
import { dijkstra,edgePathFromNodePath } from 'graphology-shortest-path';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  hub_lists:any=[]
  hub_route_list:any=[]
  graph:any
  starts:any="8"
  ends:any="15"
  all:any=[]
  all_str:any=[]
  routeSelected:any
  ConsignmentEntry:any = new Date()
  calculatedTiming = new Date()
  tempTimeTravel:any={}
  tempDepartureTime:any={}
  finallyReachDateTime:any=[]
  finallyReachRoute:any=[]
  constructor(private httpClient: HttpClient){}
  ngOnInit(): void {

    this.httpClient.get('http://localhost:1305/api/Test/get_data/1').subscribe((res:any)=>{
        this.hub_lists = JSON.parse(res['hub_list']).Table
        console.log(this.hub_lists)
        this.hub_route_list = JSON.parse(res['hub_route_list']).Table
        console.log(this.hub_route_list)
        this.graph = new Graph({allowSelfLoops:false})
        this.hub_lists.forEach((i:any)=>{  this.graph.addNode(i.hub_id.toString()) })
        this.hub_route_list.forEach((i:any)=>{
          if(!this.graph.hasEdge(i.source_hub_id, i.destination_hub_id,)){
            this.graph.addDirectedEdge(i.source_hub_id.toString(), i.destination_hub_id.toString(), { travel_time: i.travel_time, departure_time: i.departure_time} )
          }
        }
        )
        this.graph.forEachOutNeighbor(this.starts, (neighbor:any)=> {
          let newGraph = dijkstra.bidirectional(this.graph, neighbor,this.ends)
          if(newGraph){
            let str = this.starts+newGraph.join('')
            if(this.all_str.indexOf(str) === -1){
              let a = [this.starts, ...newGraph]
              this.all.push(a)
              this.all_str.push(str)
              this.next(a)
            }
          }
        })


        this.hub_route_list.forEach((routes:any,index:any)=>{
          let _hub1=routes.source_hub_id
          let _hub2=routes.destination_hub_id
          let _travel_time= routes.travel_time
          let _departure_time=routes.departure_time

          //this.tempTimeTravel.push(_obj)
          let a = this.tempTimeTravel[_hub1+'->'+_hub2]
          if(a){
            if(a.length>0){
              this.tempTimeTravel[_hub1+'->'+_hub2] = [a[0],_travel_time]
            }
          }
          else{
            this.tempTimeTravel[_hub1+'->'+_hub2] = [_travel_time]
          }

          let b = this.tempDepartureTime[_hub1+'->'+_hub2]
          if(b){
            if(b.length>0){
              this.tempDepartureTime[_hub1+'->'+_hub2] = [b[0],_departure_time]
            }
          }
          else{
            this.tempDepartureTime[_hub1+'->'+_hub2] = [_departure_time]
          }

        })


        this.all.forEach((route:any)=>{
          let d = new Date()
          this.routeSelected=route
          //console.log(this.graph.getEdgeAttributes(route[0], route[1]))

          route.forEach((node:any,i:any)=>{
            if(i <= (route.length-2)){
              let hub1 = node
              let hub2 = route[i+1]
              //set default 4 hours

              let travelHour = this.getleastHour(this.tempTimeTravel[hub1+'->'+hub2])
              let WindowTime = this.getWindow(this.tempDepartureTime[hub1+'->'+hub2],d)
              let newWindowTime = new Date(WindowTime.getFullYear(), WindowTime.getMonth(), WindowTime.getDate(), (WindowTime.getHours()+travelHour), 0, 0)

              d = new Date(newWindowTime)
            }

          })
          this.finallyReachDateTime.push(d)
          this.finallyReachRoute.push(route)


        })
        let _finalReachTime = this.leastVal(this.finallyReachDateTime)
        let finalDateTime=  this.finallyReachDateTime[this.finallyReachDateTime.indexOf(_finalReachTime)]
        let finalRoute= this.finallyReachRoute[this.finallyReachDateTime.indexOf(_finalReachTime)]
        console.log('Selected Route', finalRoute)
        console.log( 'Reaching to last hub', finalDateTime)
        console.log('All reaching times',this.finallyReachDateTime)

    });
  }
  getleastHour(arr:any){
              let new_tloop =arr.sort(function(a:any, b:any){return a-b});
              return new_tloop[0]
  }
  leastVal(arr:any){
    let t:any
    arr.forEach((a:any, b:any)=>{

      if(b<(arr.length-1)){
        if(a<arr[b+1]){
          t=a
        }else{
          t=arr[b+1]
        }
      }

    }
    );

    return t
  }

  next(arr:any){
    arr.forEach((node:any,index:any)=>
    {
      if(index <= (arr.length-2)){
        let hub1 = node
        let hub2 = arr[index+1]
        let t = this.graph.getEdgeAttributes(hub1, hub2)
         this.graph.dropDirectedEdge(hub1,hub2)
         let _newGraph = dijkstra.bidirectional(this.graph, this.starts,this.ends)
         if(_newGraph){
          let str = _newGraph.join('')
          if(this.all_str.indexOf(str) === -1){
            this.all.push(_newGraph)
            this.all_str.push(str)
          }
         }
         this.graph.addDirectedEdge(hub1,hub2,t)
      }
    })
  }

  tempArr:any=[]

  getWindow(arr:any,nd:any){
    // arr array of window timing , nd new DateTime to start checking window

    let r:any
    this.tempArr.push(nd)

    arr.forEach((avail:any)=>{

      let _avail = avail.split(":")
      let tempND = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate(), _avail[0], _avail[1], _avail[2])
      this.tempArr.push(tempND)

    })
    this.tempArr = this.tempArr.sort()
    if((this.tempArr.length-1) == this.tempArr.indexOf(nd)){
          let t = new Date(this.tempArr[0]);
          t.setDate(this.tempArr[0].getDate()+1);
          this.tempArr[0] = new Date(t)
        r = new Date(this.tempArr[0])
    }else{
      r = new Date(this.tempArr[this.tempArr.indexOf(nd)+1])
    }
    this.tempArr=[]
    return r
  }

}


















// save_data(ss:any)
// {
//   var myroute="";
//   this.consignment_id=ss.consignment_id;
//   this.order_item_id=ss.order_item_id;
//   this.order_id=ss.order_id;
//   this.first_hub_id=ss.first_hub_id;
//   this.last_hub_id=ss.last_hub_id;
//   this.starts="";
//   this.ends="";
//   this.starts= this.first_hub_id.toString();
//   this.ends= this.last_hub_id.toString();
//   console.log('first hub', this.starts,'last hub',this.ends)
  
//   this.graph = new Graph({allowSelfLoops:false})

//   this.hub_list_1.forEach((i:any)=>{  this.graph.addNode(i.hub_id.toString()) })
//   console.log('route',this.hub_route_list)
 
  
//   this.hub_route_list.forEach((i:any)=>{

//     if(!this.graph.hasEdge(i.source_hub_id, i.destination_hub_id)){
//       this.graph.addDirectedEdge(i.source_hub_id.toString(), i.destination_hub_id.toString(), { travel_time: i.travel_time, departure_time: i.departure_time} )
//     }
//   }
//   )
//   if(!this.graph.hasEdge(this.starts, this.ends)){
//     this.graph.forEachOutNeighbor(this.starts, (neighbor:any)=> {
//       console.log(this.starts, neighbor)
//       let newGraph = dijkstra.bidirectional(this.graph, neighbor,this.ends)
//       console.log(newGraph)
//       if(newGraph){
//         let str = this.starts+newGraph.join('')
//         if(this.all_str.indexOf(str) === -1){
//           let a = [this.starts, ...newGraph]
//           this.all.push(a)
//           this.all_str.push(str)
//           this.next(a)
//         }
//       }
//     })

//     console.log(this.graph)

//     this.hub_route_list.forEach((routes:any,index:any)=>{
//       let _hub1=routes.source_hub_id.toString()
//       let _hub2=routes.destination_hub_id.toString()
//       let _travel_time= routes.travel_time
//       let _departure_time=routes.departure_time

//       //this.tempTimeTravel.push(_obj)
//       let a = this.tempTimeTravel[_hub1+'->'+_hub2]
//       if(a){
//         if(a.length>0){
//           this.tempTimeTravel[_hub1+'->'+_hub2] = [a[0],_travel_time]
//         }
//       }
//       else{
//         this.tempTimeTravel[_hub1+'->'+_hub2] = [_travel_time]
//       }

//       let b = this.tempDepartureTime[_hub1+'->'+_hub2]
//       if(b){
//         if(b.length>0){
//           this.tempDepartureTime[_hub1+'->'+_hub2] = [b[0],_departure_time]
//         }
//       }
//       else{
//         this.tempDepartureTime[_hub1+'->'+_hub2] = [_departure_time]
//       }

//     })


//     this.all.forEach((route:any)=>{
//       let d = new Date()
//       this.routeSelected=route
//       //console.log(this.graph.getEdgeAttributes(route[0], route[1]))

//       route.forEach((node:any,i:any)=>{
//         if(i <= (route.length-2)){
//           let hub1 = node
//           let hub2 = route[i+1]
//           //set default 4 hours

//           let travelHour = this.getleastHour(this.tempTimeTravel[hub1+'->'+hub2])
//           let WindowTime = this.getWindow(this.tempDepartureTime[hub1+'->'+hub2],d)
//           let newWindowTime = new Date(WindowTime.getFullYear(), WindowTime.getMonth(), WindowTime.getDate(), (WindowTime.getHours()+travelHour), 0, 0)

//           d = new Date(newWindowTime)
//         }

//       })
//       this.finallyReachDateTime.push(d)
//       this.finallyReachRoute.push(route)


//     })
//     let _finalReachTime = this.leastVal(this.finallyReachDateTime)
//     let finalDateTime=  this.finallyReachDateTime[this.finallyReachDateTime.indexOf(_finalReachTime)]
//     let finalRoute= this.finallyReachRoute[this.finallyReachDateTime.indexOf(_finalReachTime)]

    
//      myroute = finalRoute.toString();
    
//     console.log('Selected Route', finalRoute)
//     console.log( 'Reaching to last hub', finalDateTime)
//     console.log('All reaching times',this.finallyReachDateTime)

//   }
//   else{

//     this.hub_route_list.forEach((routes:any,index:any)=>{
//       let _hub1=routes.source_hub_id
//       let _hub2=routes.destination_hub_id
//       let _travel_time= routes.travel_time
//       let _departure_time=routes.departure_time

//       //this.tempTimeTravel.push(_obj)
//       let a = this.tempTimeTravel[_hub1+'->'+_hub2]
//       if(a){
//         if(a.length>0){
//           this.tempTimeTravel[_hub1+'->'+_hub2] = [a[0],_travel_time]
//         }
//       }
//       else{
//         this.tempTimeTravel[_hub1+'->'+_hub2] = [_travel_time]
//       }

//       let b = this.tempDepartureTime[_hub1+'->'+_hub2]
//       if(b){
//         if(b.length>0){
//           this.tempDepartureTime[_hub1+'->'+_hub2] = [b[0],_departure_time]
//         }
//       }
//       else{
//         this.tempDepartureTime[_hub1+'->'+_hub2] = [_departure_time]
//       }

//     })
//     console.log(this.tempTimeTravel)
//     console.log(this.tempDepartureTime)
//     let d = new Date()
//     let travelHour = this.getleastHour(this.tempTimeTravel[this.starts+'->'+this.ends])
//     let WindowTime = this.getWindow(this.tempDepartureTime[this.starts+'->'+this.ends],d)
//     let newWindowTime = new Date(WindowTime.getFullYear(), WindowTime.getMonth(), WindowTime.getDate(), (WindowTime.getHours()+travelHour), 0, 0)
//     console.log('hours' ,travelHour,'Seleted transport time',WindowTime, 'reaching ',newWindowTime)

//     console.log('Selected Route',this.starts, this.ends )
//     console.log( 'Reaching to last hub', 123)
//     console.log('All reaching times',123)
//   }







//   var data={
//     "consignment_id":this.consignment_id,      
//     "hub_route_id":1,
//     "hub_route":myroute,    
//     "order_item_id":this.order_item_id,
//     "order_id":this.order_id,
//     "language_id":1
//   }
//   let url='Consignment/save_consignment';
//   this.allapi.PostData(url,data).subscribe(promise=>
//     {
//       if(promise.status=="Insert")
//       {
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: promise.message,
//           showConfirmButton: false,
//           timer: 2000
//       })
     
//       if(promise.consignment_print_data!="")
//       {   
//         this.consignment_print_data_two= JSON.parse(promise.consignment_print_data_two).Table;  
//         this.print_data=JSON.parse(promise.consignment_print_data).Table;
//         this.customer_name=this.print_data[0].customer_name;
//         this.address_line_1=this.print_data[0].address_line_1;
//         this.address_line_2=this.print_data[0].address_line_2;
//         this.city=this.print_data[0].city;
//         this.state_name=this.print_data[0].state_name;
//         this.pincode=this.print_data[0].pincode;
//         this.land_mark=this.print_data[0].land_mark;
//         this.mobile=this.print_data[0].mobile;
//         this.email_id=this.print_data[0].email_id;
//         this.store_name=this.print_data[0].store_name;
//         this.pickup_location=this.print_data[0].pickup_location;
//         this.first_hub=this.print_data[0].first_hub;
//         this.last_hub=this.print_data[0].last_hub;
//         this.payment_method=this.print_data[0].payment_method;
//         this.weight=this.print_data[0].weight;
//         this.closeform.show();
//       }
//       this.hub_list_1=JSON.parse(promise.hub_list_1).Table;
//       this.hub_list_2=JSON.parse(promise.hub_list_2).Table;
//       this.consignment_list=JSON.parse(promise.consignment_list).Table; 
//       this.hub_route_list=JSON.parse(promise.hub_route_list).Table; 
   
//       this.screen=0;
//       this.clear();
//       }
//       else if(promise.status=="Failed")
//       {
//         Swal.fire({
//           position: 'center',
//           icon: 'warning',
//           title: promise.message,
//           showConfirmButton: false,
//           timer: 2000
//       })
//       }
//       else if(promise.status=="Validation")
//       {
//         this.validation_list=promise.validation_list;
//       }
    
//     })
// }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllapiService } from 'src/app/apiservice/allapi.service';
import Swal from 'sweetalert2';
declare var window: any;
import Graph from 'graphology';
import { dijkstra, edgePathFromNodePath } from 'graphology-shortest-path';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css'],
})
export class ConsignmentComponent implements OnInit {
  @ViewChild('invoice') invoiceElement!: ElementRef;
  @ViewChild('invoicep') invoicepElement!: ElementRef;

  constructor(
    private allapi: AllapiService,
    private spinner: NgxSpinnerService
  ) {}

  bc_margin_top = 1;
  bc_height = 50;
  bc_width = 2;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  SerialId = 12345;
  screen: any = 0;
  submitted = false;
  search = '';
  editdata: boolean = false;

  consignment_id = 0;
  consignment_l = '';
  consignment_b = '';
  consignment_h = '';
  weight = '';
  first_hub_id = '';
  last_hub_id = '';
  consignment_status = '';
  hub_route_id = '';
  order_item_id = '';
  edit_item_name = '';
  hub_list_1: any;
  hub_list_2: any;
  validation_list: any;
  consignment_list: any;

  closeform: any;
  invoiceform: any;

  print_data: any;
  consignment_print_data_two: any;
  edit_consignment_data: any;

  starts: any;
  ends: any;

  order_id = 0;
  customer_name = '';
  address_line_1 = '';
  address_line_2 = '';
  city = '';
  state_name = '';
  pincode = '';
  land_mark = '';
  mobile = '';
  email_id = '';
  store_name = '';
  pickup_location = '';
  first_hub = '';
  last_hub = '';
  payment_method = '';
  hub_route_list: any;
  graph: any;
  all_str: any = [];
  all: any = [];
  routeSelected: any;
  ConsignmentEntry: any = new Date();
  calculatedTiming = new Date();
  tempTimeTravel: any = {};
  tempDepartureTime: any = {};
  finallyReachDateTime: any = [];
  finallyReachRoute: any = [];
  allhub_max: any;
  allhub_max_new: any;
  allhub_123: any;
  quantity = 0;
  invoice_list: any;
  invoice_list_one: any;
  invoice_list_two: any;
  item_name = '';
  customername = '';
  address_line1 = '';
  address_line2 = '';
  ccity = '';
  pin = '';
  landmark = '';
  statename = '';
  country_name = '';
  selling_price=0
  gst_number=0
  gross_amount = 0
payable_amount = 0
total_order_amount = 0
discount_amount = 0
tax_amount = 0


  consignmentdata = new FormGroup({
    v_order_item_id: new FormControl('', [Validators.required]),
    v_consignment_l: new FormControl('', [Validators.required]),
    v_consignment_b: new FormControl('', [Validators.required]),
    v_consignment_h: new FormControl('', [Validators.required]),
    v_weight: new FormControl('', [Validators.required]),
    v_first_hub: new FormControl('', [Validators.required]),
    v_last_hub: new FormControl('', [Validators.required]),
    v_consignment_status: new FormControl('', [Validators.required]),
    v_hub_route_id: new FormControl('', [Validators.required]),
    v_edit_item_name: new FormControl(),
  });
  get f() {
    return this.consignmentdata.controls;
  }

  //invoiceModal
  open_invoice(pi: any) {
    this.invoiceform = new window.bootstrap.Modal(
      document.getElementById('invoiceprintModal')
    );
    this.consignment_id = pi.consignment_id;
    this.order_id = pi.order_id;
    var data = {
      consignment_id: pi.consignment_id,
      order_id: pi.order_id,
      language_id: 1,
    };

    let url = 'Consignment/consignment_print_data/';
    this.allapi.PostData(url, data).subscribe((promise) => {

      if (promise.invoice_list_two != '') {
        this.invoice_list = JSON.parse(promise.invoice_list).Table;
        this.invoice_list_one = JSON.parse(promise.invoice_list_one).Table;
        this.invoice_list_two = JSON.parse(promise.invoice_list_two).Table;

        this.customer_name = this.invoice_list_one[0].customer_name;
        this.address_line_1 = this.invoice_list_one[0].address_line_1;
        this.address_line_2 = this.invoice_list_one[0].address_line_2;
        this.city = this.invoice_list_one[0].city;
        this.state_name = this.invoice_list_one[0].state_name;
        this.pincode = this.invoice_list_one[0].pincode;
        this.land_mark = this.invoice_list_one[0].land_mark;
        this.mobile = this.invoice_list_one[0].mobile;
        this.email_id = this.invoice_list_one[0].email_id;
        this.store_name = this.invoice_list_one[0].store_name;
        this.pickup_location = this.invoice_list_one[0].pickup_location;
        this.first_hub = this.invoice_list_one[0].first_hub;
        this.last_hub = this.invoice_list_one[0].last_hub;
        this.payment_method = this.invoice_list_one[0].payment_method;
        this.weight = this.invoice_list_one[0].weight;
        this.quantity = this.invoice_list_one[0].quantity;
        this.item_name = this.invoice_list_one[0].item_name;
        this.customername = this.invoice_list_two[0].customername;
        this.address_line1 = this.invoice_list_two[0].address_line1;
        this.address_line2 = this.invoice_list_two[0].address_line2;
        this.ccity = this.invoice_list_two[0].ccity;
        this.pin = this.invoice_list_two[0].pin;
        this.landmark = this.invoice_list_two[0].landmark;
        this.statename = this.invoice_list_two[0].state_name;
        this.country_name = this.invoice_list_two[0].country_name;
        this.selling_price = this.invoice_list_one[0].selling_price;
        //this.gst_number = this.invoice_list_two[0].gst_number;
        this.gross_amount = this.invoice_list_one[0].gross_amount;
        this.payable_amount = this.invoice_list_one[0].payable_amount;
        this.total_order_amount = this.invoice_list_one[0].total_order_amount;
        this.discount_amount = this.invoice_list_one[0].discount_amount;
        this.tax_amount = this.invoice_list_one[0].tax_amount;

        this.invoiceform.show();
      }
    });
  }

  ngOnInit(): void {
    this.closeform = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    let url = 'Consignment/get_data/';
    this.allapi.GetDataById(url, 1).subscribe((promise) => {
      this.hub_list_1 = JSON.parse(promise.hub_list_1).Table;
      this.hub_list_2 = JSON.parse(promise.hub_list_2).Table;
      this.consignment_list = JSON.parse(promise.consignment_list).Table;
      this.hub_route_list = JSON.parse(promise.hub_route_list).Table;
console.log(this.consignment_list)
    });
  }

  save_data(ss: any) {
    var myroute = '';
    this.consignment_id = ss.consignment_id;
    this.order_item_id = ss.order_item_id;
    this.order_id = ss.order_id;
    this.first_hub_id = ss.first_hub_id;
    this.last_hub_id = ss.last_hub_id;
    this.starts = '';
    this.ends = '';
    this.starts = this.first_hub_id.toString();
    this.ends = this.last_hub_id.toString();
    if (this.starts != this.ends) {
      this.graph = new Graph({ allowSelfLoops: false });
      this.hub_list_1.forEach((i: any) => {
        this.graph.addNode(i.hub_id.toString());
      });
      this.hub_route_list.forEach((i: any) => {
        if (
          !this.graph.hasEdge(
            i.source_hub_id.toString(),
            i.destination_hub_id.toString()
          )
        ) {
          this.graph.addDirectedEdge(
            i.source_hub_id.toString(),
            i.destination_hub_id.toString(),
            { travel_time: i.travel_time, departure_time: i.departure_time }
          );
        }
      });
      this.graph.forEachOutNeighbor(this.starts, (neighbor: any) => {
        let newGraph = dijkstra.bidirectional(this.graph, neighbor, this.ends);
        if (newGraph) {
          let str = this.starts + newGraph.join('');
          if (this.all_str.indexOf(str) === -1) {
            let a = [this.starts, ...newGraph];
            this.all.push(a);
            this.all_str.push(str);
            this.next(a);
          }
        }
      });

      this.hub_route_list.forEach((routes: any, index: any) => {
        let _hub1 = routes.source_hub_id.toString();
        let _hub2 = routes.destination_hub_id.toString();
        let _travel_time = routes.travel_time;
        let _departure_time = routes.departure_time;

        //this.tempTimeTravel.push(_obj)
        let a = this.tempTimeTravel[_hub1 + '->' + _hub2];
        if (a) {
          if (a.length > 0) {
            this.tempTimeTravel[_hub1 + '->' + _hub2] = [a[0], _travel_time];
          }
        } else {
          this.tempTimeTravel[_hub1 + '->' + _hub2] = [_travel_time];
        }

        let b = this.tempDepartureTime[_hub1 + '->' + _hub2];
        if (b) {
          if (b.length > 0) {
            this.tempDepartureTime[_hub1 + '->' + _hub2] = [
              b[0],
              _departure_time,
            ];
          }
        } else {
          this.tempDepartureTime[_hub1 + '->' + _hub2] = [_departure_time];
        }
      });
      let windows: any = {};
      this.all.forEach((route: any) => {
        let d = new Date();
        this.routeSelected = route;

        let tempArr: any = [];
        route.forEach((node: any, i: any) => {
          if (i <= route.length - 2) {
            let hub1 = node;
            let hub2 = route[i + 1];
            let travelHour = this.getleastHour(
              this.tempTimeTravel[hub1 + '->' + hub2]
            );
            let WindowTime = this.getWindow(
              this.tempDepartureTime[hub1 + '->' + hub2],
              d
            );
            let newWindowTime = new Date(
              WindowTime.getFullYear(),
              WindowTime.getMonth(),
              WindowTime.getDate(),
              WindowTime.getHours() + travelHour,
              0,
              0
            );

            d = new Date(newWindowTime);
            tempArr.push(WindowTime);
          }
        });
        let routeCode = route.join().replaceAll(',', '');
        windows[routeCode] = tempArr;

        this.finallyReachDateTime.push(d);
        this.finallyReachRoute.push(route);
      });
      let _finalReachTime = this.leastVal(this.finallyReachDateTime);
      let finalDateTime =
        this.finallyReachDateTime[
          this.finallyReachDateTime.indexOf(_finalReachTime)
        ];
      let finalRoute =
        this.finallyReachRoute[
          this.finallyReachDateTime.indexOf(_finalReachTime)
        ];

      // console.log('windows ',windows[finalRoute.join().replaceAll(',','')])

      // this.all.forEach((route:any)=>{
      //   let d = new Date()
      //   this.routeSelected=route
      //   //console.log(this.graph.getEdgeAttributes(route[0], route[1]))

      //   route.forEach((node:any,i:any)=>{
      //     if(i <= (route.length-2)){
      //       let hub1 = node
      //       let hub2 = route[i+1]
      //       //set default 4 hours

      //       let travelHour = this.getleastHour(this.tempTimeTravel[hub1+'->'+hub2])
      //       let WindowTime = this.getWindow(this.tempDepartureTime[hub1+'->'+hub2],d)
      //       let newWindowTime = new Date(WindowTime.getFullYear(), WindowTime.getMonth(), WindowTime.getDate(), (WindowTime.getHours()+travelHour), 0, 0)

      //       d = new Date(newWindowTime)
      //     }

      //   })
      //   this.finallyReachDateTime.push(d)
      //   this.finallyReachRoute.push(route)

      // })

      let finalwindows = windows[finalRoute.join().replaceAll(',', '')];
      myroute = finalRoute.toString();

      //     this.allhub_123 = [finalRoute];
      //     this.allhub_max=[];
      //     this.allhub_123.forEach((element:any) => {
      //       if(element){
      // element.forEach((node:any,index:any)=>{
      // if(index<(element.length-1)){
      //   let hub1 = node
      //   let hub2 = element[index+1]
      //   this.allhub_max.push({'first_hub_id':parseInt(hub1),'last_hub_id':parseInt(hub2)})
      // }
      // })
      // }
      // });

      // console.log(this.allhub_max)
      // console.log('Selected Route', finalRoute)
      // console.log( 'Reaching to last hub', finalDateTime)
      // console.log('All reaching times',this.finallyReachDateTime)

      this.allhub_max = [];
      finalwindows.forEach((wtime: any, i: any) => {
        // console.log(finalRoute[i],finalRoute[i+1],wtime)
        this.allhub_max.push({
          first_hub_id: parseInt(finalRoute[i]),
          last_hub_id: parseInt(finalRoute[i + 1]),
          movement_date_time: wtime,
        });
      });
    } else {
      var dd = new Date();
      this.allhub_max = [];
      this.allhub_max.push({
        first_hub_id: parseInt(this.starts),
        last_hub_id: parseInt(this.ends),
        movement_date_time: dd,
      });
      myroute = (this.starts + ',' + this.ends).toString();
    }

    var data = {
      consignment_id: this.consignment_id,
      hub_route_id: 1,
      hub_route: myroute,
      order_item_id: this.order_item_id,
      order_id: this.order_id,
      language_id: 1,
      hubarray: this.allhub_max,
    };
    //console.log('save_consignment',data)
    let url = 'Consignment/save_consignment/';
    this.allapi.PostData(url, data).subscribe((promise) => {
      if (promise.status == 'Insert') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: promise.message,
          showConfirmButton: false,
          timer: 2000,
        });

        this.hub_list_1 = JSON.parse(promise.hub_list_1).Table;
        this.hub_list_2 = JSON.parse(promise.hub_list_2).Table;
        this.consignment_list = JSON.parse(promise.consignment_list).Table;
        this.hub_route_list = JSON.parse(promise.hub_route_list).Table;

        if (promise.consignment_print_data != '') {
          this.consignment_print_data_two = JSON.parse(
            promise.consignment_print_data_two
          ).Table;

          this.print_data = JSON.parse(promise.consignment_print_data).Table;
          this.customer_name = this.print_data[0].customer_name;
          this.address_line_1 = this.print_data[0].address_line_1;
          this.address_line_2 = this.print_data[0].address_line_2;
          this.city = this.print_data[0].city;
          this.state_name = this.print_data[0].state_name;
          this.pincode = this.print_data[0].pincode;
          this.land_mark = this.print_data[0].land_mark;
          this.mobile = this.print_data[0].mobile;
          this.email_id = this.print_data[0].email_id;
          this.store_name = this.print_data[0].store_name;
          this.pickup_location = this.print_data[0].pickup_location;
          this.first_hub = this.print_data[0].first_hub;
          this.last_hub = this.print_data[0].last_hub;
          this.payment_method = this.print_data[0].payment_method;
          this.weight = this.print_data[0].weight;
          //Mukta 19-8-2022
          this.quantity = this.print_data[0].quantity;
          this.closeform.show();
        }
        this.invoice_print()
        this.screen = 0;
        this.clear();
      } else if (promise.status == 'Failed') {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: promise.message,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (promise.status == 'Validation') {
        this.validation_list = promise.validation_list;
      }
    });
  }

  view_print(ss: any) {
    this.consignment_id = ss.consignment_id;
    this.order_id=ss.order_id
    var data = {
      consignment_id: ss.consignment_id,
      order_id:ss.order_id,
      language_id: 1,
    };
    let url = 'Consignment/consignment_print_data/';
    this.allapi.PostData(url, data).subscribe((promise) => {

      if (promise.consignment_print_data != '') {
        this.consignment_print_data_two = JSON.parse(promise.consignment_print_data_two).Table;
        this.print_data = JSON.parse(promise.consignment_print_data).Table;
        this.customer_name = this.print_data[0].customer_name;
        this.address_line_1 = this.print_data[0].address_line_1;
        this.address_line_2 = this.print_data[0].address_line_2;
        this.city = this.print_data[0].city;
        this.state_name = this.print_data[0].state_name;
        this.pincode = this.print_data[0].pincode;
        this.land_mark = this.print_data[0].land_mark;
        this.mobile = this.print_data[0].mobile;
        this.email_id = this.print_data[0].email_id;
        this.store_name = this.print_data[0].store_name;
        this.pickup_location = this.print_data[0].pickup_location;
        this.first_hub = this.print_data[0].first_hub;
        this.last_hub = this.print_data[0].last_hub;
        this.payment_method = this.print_data[0].payment_method;
        this.weight = this.print_data[0].weight;
        //Mukta 19-8-2022
        this.quantity = this.print_data[0].quantity;

        this.closeform.show();
      }
    });
  }
  public generatePDF(): void {
    html2canvas(this.invoiceElement.nativeElement, { scale: 1 }).then(
      (canvas) => {
        const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
        const fileWidth = 200;
        const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
        let PDF = new jsPDF('p', 'mm', 'a4');
        PDF.addImage(
          imageGeneratedFromTemplate,
          'PNG',
          0,
          5,
          fileWidth,
          generatedImageHeight
        );
        PDF.html(this.invoiceElement.nativeElement.innerHTML);
        PDF.save('download.pdf');
      }
    );
  }

  lable_print() {
    var data = {
      consignment_id: this.consignment_id,
      language_id: 1,
    };
    let url = 'Consignment/consignment_print_update/';
    this.allapi.PostData(url, data).subscribe((promise) => {
      if (promise.status == 'Update') {
        this.consignment_list = JSON.parse(promise.consignment_list).Table;
        html2canvas(this.invoiceElement.nativeElement, { scale: 2 }).then(
          (canvas) => {
            const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
            const fileWidth = 200;
            const generatedImageHeight =
              (canvas.height * fileWidth) / canvas.width;
            let PDF = new jsPDF('p', 'mm', 'a4');
            PDF.addImage(
              imageGeneratedFromTemplate,
              'PNG',
              0,
              5,
              fileWidth,
              generatedImageHeight
            );
            PDF.html(this.invoiceElement.nativeElement.innerHTML);
            let newdate=new Date().toLocaleString()
            newdate=newdate.replace(', ','-')
            newdate=newdate.replace(':','-')
            newdate=newdate.replace(' ','-')


            let temp='Label'+newdate+'.pdf'
            PDF.save(temp);

          }
        );

        //window.print();
      }
    });
  }
  //mukta
  invoice_print() {
    var data = {
      consignment_id: this.consignment_id,
      order_id:this.order_id,
      language_id: 1,
    };

    let url = 'Consignment/invoice_print_update/';
    this.allapi.PostData(url, data).subscribe((promise) => {
      console.log('IP',promise)
      if (promise.status == 'Update') {
        this.consignment_list = JSON.parse(promise.consignment_list).Table;
        html2canvas(this.invoicepElement.nativeElement, { scale: 2}).then(
          (canvas) => {
            const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
            const fileWidth = 200;
            const generatedImageHeight =
              (canvas.height * fileWidth) / canvas.width;
            let PDF2 = new jsPDF('p', 'mm', 'a4');
            PDF2.addImage(
              imageGeneratedFromTemplate,
              'PNG',
              0,
              5,
              fileWidth,
              generatedImageHeight
            );
            PDF2.html(this.invoicepElement.nativeElement.innerHTML);
            let newdate=new Date().toLocaleString()
            newdate=newdate.replace(', ','-')
            newdate=newdate.replace(':','-')
            newdate=newdate.replace(' ','-')


            let temp='Invoice'+newdate+'.pdf'
            PDF2.save(temp);


          }

        );
      }
    });
  }


  clear() {
    this.consignment_id = 0;
    this.consignment_l = '';
    this.consignment_b = '';
    this.consignment_h = '';
    this.weight = '';
    this.first_hub_id = '';
    this.last_hub_id = '';
    this.consignment_status = '';
    this.hub_route_id = '';
    this.order_item_id = '';
    this.submitted = false;
  }
  back_screen(ss: any) {
    this.clear();
    this.screen = ss;
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

  getleastHour(arr: any) {
    let new_tloop = arr.sort(function (a: any, b: any) {
      return a - b;
    });
    return new_tloop[0];
  }
  leastVal(arr: any) {
    let t: any;
    arr.forEach((a: any, b: any) => {
      if (b < arr.length - 1) {
        if (a < arr[b + 1]) {
          t = a;
        } else {
          t = arr[b + 1];
        }
      }
    });

    return t;
  }

  next(arr: any) {
    arr.forEach((node: any, index: any) => {
      if (index <= arr.length - 2) {
        let hub1 = node;
        let hub2 = arr[index + 1];
        let t = this.graph.getEdgeAttributes(hub1, hub2);
        this.graph.dropDirectedEdge(hub1, hub2);
        let _newGraph = dijkstra.bidirectional(
          this.graph,
          this.starts,
          this.ends
        );
        if (_newGraph) {
          let str = _newGraph.join('');
          if (this.all_str.indexOf(str) === -1) {
            this.all.push(_newGraph);
            this.all_str.push(str);
          }
        }
        this.graph.addDirectedEdge(hub1, hub2, t);
      }
    });
  }

  tempArr: any = [];

  getWindow(arr: any, nd: any) {
    // arr array of window timing , nd new DateTime to start checking window

    let r: any;
    this.tempArr.push(nd);

    arr.forEach((avail: any) => {
      let _avail = avail.split(':');
      let tempND = new Date(
        nd.getFullYear(),
        nd.getMonth(),
        nd.getDate(),
        _avail[0],
        _avail[1],
        _avail[2]
      );
      this.tempArr.push(tempND);
    });
    this.tempArr = this.tempArr.sort();
    if (this.tempArr.length - 1 == this.tempArr.indexOf(nd)) {
      let t = new Date(this.tempArr[0]);
      t.setDate(this.tempArr[0].getDate() + 1);
      this.tempArr[0] = new Date(t);
      r = new Date(this.tempArr[0]);
    } else {
      r = new Date(this.tempArr[this.tempArr.indexOf(nd) + 1]);
    }
    this.tempArr = [];
    return r;
  }

  // edit_data(ss:any)
  // {
  //   var data={
  //     "consignment_id":ss.consignment_id,
  //     "language_id":1
  //         }
  //         let url='Consignment/consignment_get_edit_data/';
  //         this.allapi.PostData(url,data).subscribe(promise=>
  //           {
  //             this.edit_consignment_data=JSON.parse(promise.edit_consignment_data).Table;
  //             if(this.edit_consignment_data!="")
  //             {
  //             this.edit_item_name=this.edit_consignment_data[0].item_name;
  //             }

  //           })

  //   this.consignment_id=ss.consignment_id;
  //   this.consignment_l=ss.consignment_l;
  //   this.consignment_b=ss.consignment_b;
  //   this.consignment_h=ss.consignment_h;
  //   this.weight=ss.weight;
  //   this.first_hub_id=ss.first_hub_id;
  //   this.last_hub_id=ss.last_hub_id;
  //   this.hub_route_id=ss.hub_route_id;
  //   this.consignment_status=ss.status;
  //   this.order_item_id=ss.order_item_id;
  //   this.editdata=true;

  //   this.screen=1;
  // }
}

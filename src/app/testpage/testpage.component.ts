import { Component, Input, OnInit } from '@angular/core';
import { AllapiService } from '../apiservice/allapi.service';



@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})

export class TestpageComponent implements OnInit {
  all_variant_attr_list: any;

 

  constructor(private allapi:AllapiService) { }
  //templatesList:any;
  templatesList: any[] | undefined = undefined;

  ngOnInit(): void {
 
  
    let item=sessionStorage.getItem('itemid');
      var data = {
        "language_id": 1,
        "item_id": Number(item)
      }
    
        let requestFormUrl='/Landing_Item_Details/get_data/';
        this.allapi.PostData(requestFormUrl,data).subscribe(response => {   
    
    
          this.templatesList = this.groupBy(response.entity, "workspaceName");

        });

       
      }
      groupBy = (xs: any[], key: string) => {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      }
}

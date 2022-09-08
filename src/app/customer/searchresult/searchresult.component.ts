import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllapiService } from 'src/app/apiservice/allapi.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchresultComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
   private router: Router,
   private allapi:AllapiService,
   private formBuilder: FormBuilder){

   }

   base64="data:image/jpeg;base64,";
  searchTxt:any=''
  responseSearch:any=[]
  resultlist:any

  rangeGroup = new FormGroup({
    rangeInput: new FormControl(''),
  });


  ngOnInit(): void {
    this.searchTxt =this._Activatedroute.snapshot.paramMap.get("search")?.toString()
     this.searchTxt = decodeURIComponent(this.searchTxt)

    var data={
      searchstring:this.searchTxt
    }
    console.log(data)
    let getresult='search_result/getresult/'
    this.allapi.PostData(getresult,data).subscribe(promise=>{
      console.log(promise)
            this.resultlist=JSON.parse(promise.resultlist)
            this.resultlist.Table.forEach((x:any,y:any)=>{
              this.responseSearch.push(
                {
                  itemId:x.itemid,
                  img:x.itemimage,
                  title:x.itemname,
                  mrp:x.itemmrp,
                  listedPrice:x.listingprice,
                  productId:x.productid,
                  additionCat:'Category',
                  additionCatId:0
                }
              )

            })

    })


  }



}

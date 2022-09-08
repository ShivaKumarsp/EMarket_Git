import {  FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
 
  form = new FormGroup({
    selectOpt: new FormControl('')
  })
  opt = [
    { id: 1, name: "Select 1", check:false },
    { id: 2, name: "Select 2" , check:false},
    { id: 3, name: "Select 3", check:false },
    { id: 4, name: "Select 4" , check:false},
    { id: 5, name: "Select 5", check:false },
  ];

  base64='file:///D:/Upload/gallery/men-s-formal-shirts-500x500.jpg';
  get(){
    console.log('2')
    console.log(this.form.value)
  }
  
  ngOnInit(): void {

  }
}



import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goProductContent(){
    this.router.navigate(['/productcontent','4321']);

  }
  goProductContent2(){
    this.router.navigate(['/productcontent']);

  }
  goHome(){
    this.router.navigate(['/home'])
  }

  goNews(){
    let navigationExtras:NavigationExtras={
      queryParams:{'aid':'123'}
    }
    this.router.navigate(['/news'],navigationExtras)

  }

}

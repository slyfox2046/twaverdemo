import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-newscontent',
  templateUrl: './newscontent.component.html',
  styleUrls: ['./newscontent.component.sass']
})
export class NewscontentComponent implements OnInit {
  public queryParams:any;
  constructor(public route:ActivatedRoute) {

  }

  ngOnInit() {
    //get 传值
    // console.log(this.route.queryParams)
    // this.route.queryParams.subscribe((data)=>{
    //   this.queryParams = JSON.stringify(data);
    // })

    // 动态路由
    this.route.params.subscribe((data)=>{
      console.log(data);
      this.queryParams=JSON.stringify(data);
    })

  }

}

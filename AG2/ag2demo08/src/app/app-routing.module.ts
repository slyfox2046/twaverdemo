import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {NewsComponent} from "./components/news/news.component";
import {NewscontentComponent} from "./components/newscontent/newscontent.component";
import {ProductcontentComponent} from "./components/productcontent/productcontent.component";

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"news",component:NewsComponent},
  {path:"newscontent/:aid",component:NewscontentComponent},
  {path:"product",component:ProductComponent},
  {path:"productcontent",component:ProductcontentComponent},//不带参数的跳转
  {path:"productcontent/:pid",component:ProductcontentComponent},
  {path:"**",redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(homeRoutes), CommonModule],
    exports: [RouterModule]
})
export class HomeModule {

}
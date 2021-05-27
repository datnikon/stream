import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeModule {

}
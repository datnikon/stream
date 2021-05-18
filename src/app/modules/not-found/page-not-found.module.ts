import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found.component";

const router: Routes = [
    {
        path: '',
        component: PageNotFoundComponent
    }
]

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule.forChild(router)]
})
export class PageNotFoundModule {

}
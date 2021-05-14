import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found.component";

const router: Routes = [
    {
        path: '',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [NotFoundComponent],
    imports: [RouterModule.forChild(router)]
})
export class NotFoundModule {

}
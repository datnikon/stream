import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { GuiComponent } from './components/gui/gui.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [HomeComponent, GuiComponent],
    imports: [RouterModule.forChild(homeRoutes), CommonModule, FormsModule],
    exports: [RouterModule]
})
export class HomeModule {

}
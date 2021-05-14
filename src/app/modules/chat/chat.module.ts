import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChatComponent } from "./components/chat/chat.component";

@NgModule({
    declarations: [ChatComponent],
    imports: [FormsModule],
    exports: [ChatComponent]
})
export class ChatModule {

}
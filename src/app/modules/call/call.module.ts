import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ChatModule } from "../chat/chat.module";
import { CallComponent } from "./components/call/call.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { PeerService } from "./services/peer.service";
import { SocketService } from "./services/socket.service";
import { HttpClientModule } from '@angular/common/http';
const callRoutes: Routes = [
    {
        path: '',
        component: CallComponent
    }
]

@NgModule({
    declarations: [
        CallComponent,
        VideoPlayerComponent,
    ],
    providers: [
        PeerService,
        SocketService
    ],
    imports: [RouterModule.forChild(callRoutes), CommonModule, ChatModule, FormsModule, HttpClientModule],
    exports: [RouterModule]
})
export class CallModule {

}
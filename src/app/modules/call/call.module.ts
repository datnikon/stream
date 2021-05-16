import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ChatModule } from "../chat/chat.module";
import { AudioPlayerComponent } from "./components/audio-player/audio-player.component";
import { CallComponent } from "./components/call/call.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { PeerService } from "./services/peer.service";
import { SocketService } from "./services/socket.service";
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
        AudioPlayerComponent
    ],
    providers: [
        PeerService,
        SocketService
    ],
    imports: [RouterModule.forChild(callRoutes), CommonModule, ChatModule, FormsModule],
    exports: [RouterModule]
})
export class CallModule {

}
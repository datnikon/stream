import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AudioPlayerComponent } from "../components/audio-player/audio-player.component";
import { CallComponent } from "../components/call/call.component";
import { ChatComponent } from "../components/chat/chat.component";
import { VideoPlayerComponent } from "../components/video-player/video-player.component";
const callRoutes: Routes = [
    {
        path: '',
        component: CallComponent
    }
]

@NgModule({
    declarations: [CallComponent, ChatComponent, VideoPlayerComponent, AudioPlayerComponent],
    imports: [RouterModule.forChild(callRoutes), CommonModule, FormsModule],
    exports: [RouterModule]
})
export class CallModule {

}
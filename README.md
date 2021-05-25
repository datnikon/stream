# Introduction
Make a website for people to make a video call, chat without account with simple steps.
# Demo
  You can check on https://live.datnikon.com/
## Technical
- Angular 12, NodeJs, PeerJs(base on WebRTC), Socket.Io, Turn server.
- Hosting/Web server: Alibaba cloud (free version), NGINX, Let's encrypt.
## How to run
- Download this source code.
- Install peer (npm i peer -g).
- Run 'peerjs --port 3001'.
- Go to 'src' foder and run 'npm i', then run 'ng serve --open'.
- Go to 'backend' foder and run 'npm i', then run 'node app.js'.

## Build & Deploy
- Build: ng build --aot

## Deploy
- You need cofig turn server before deploy. Take a look in 'getTurnServeConfig' method of 'peer.service.ts'.
- Copy code after build to your server.
- Use angular-http-server to run your angular code on port 4300 (https://www.npmjs.com/package/angular-http-server).
- Use Pm2 to run  nodejs code, peerjs (pm2 run 'peerjs --port 3001').
- Install Let's encrypt to cofig https.
- Take a look with nginx config file:
![image](https://user-images.githubusercontent.com/26564132/119516071-a07e9780-bda0-11eb-9be9-0809011867a3.png)
}

## Refer:
- https://www.youtube.com/watch?v=DvlyzDZDEq4
- https://www.youtube.com/watch?v=_bjOq4wQCZA



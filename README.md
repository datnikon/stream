# Introduction
A website for people to make a video call, chat without account with simple steps.
# Demo
  You can check on https://live.datnikon.com/
  Note: I use turn server (free version - limit 500Mb/month) so after 500Mb transferred the video call on this demo page not work.
## Technicals
- Angular 12, NodeJs, PeerJs (base on WebRTC), Socket.Io, Turn server (option, use for deploy).
- Hosting/Web server: Alibaba cloud (free version), NGINX, Let's encrypt (just for deploy).
## How to run
- Download this source code.
- Install peer (npm i peer -g).
- Run 'peerjs --port 3001'.
- Go to 'backend' folder, run 'npm install', then run 'node app.js'.
- Go to 'src' folder, run 'npm install', then run 'ng serve --open' to open angular application on port 4200.

## Build
- ng build --aot

## Deploy
- You need config turn server before deploy. Take a look in 'getTurnServeConfig()' method of 'peer.service.ts'.
- Copy code to your server.
- Use angular-http-server to run your angular code on port 4300 (https://www.npmjs.com/package/angular-http-server).
- Use PM2 to start server (pm2 run 'node app.js', start peerjs (pm2 run 'peerjs --port 3001').
- Install Let's encrypt to cofig https.
- Take a look with Nginx config file:
![image](https://user-images.githubusercontent.com/26564132/119516071-a07e9780-bda0-11eb-9be9-0809011867a3.png)
}
# Features plan
Updating
# License
- Feel free, give me a star if you like it <3
## Refer:
- https://www.youtube.com/watch?v=DvlyzDZDEq4
- https://www.youtube.com/watch?v=_bjOq4wQCZA



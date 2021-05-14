import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: Socket;
  constructor() {
    this.socket = io('ws://localhost:3000');
  }

  listen(channel: string, fn: Function) {
    this.socket.on(channel, fn());
  }

  send(chanel: string, message: SignalMessage) {
    this.socket.emit(chanel, message)
  }

  onConnect(fn: () => void) {
    this.listen('connect', fn)
  }

  requestForJoiningRoom(msg: SignalMessage) {
    this.send('room_join_request', msg)
  }

  onRoomParticipants(fn: (participants: Array<string>) => void) {
    this.listen('room_users', fn)
  }

  sendOfferSignal(msg: SignalMessage) {
    this.send('offer_signal', msg)
  }

  onOffer(fn: (msg: SignalMessage) => void) {
    this.listen('offer', fn)
  }

  sendAnswerSignal(msg: SignalMessage) {
    this.send('answer_signal', msg)
  }

  onAnswer(fn: (msg: SignalMessage) => void) {
    this.listen('answer', fn)
  }

  onRoomLeft(fn: (socketId: string) => void) {
    this.listen('room_left', fn)
  }

}

export interface SignalMessage {
  callerId?: string
  calleeId?: string,
  msg?: string,
  roomName?: string
}

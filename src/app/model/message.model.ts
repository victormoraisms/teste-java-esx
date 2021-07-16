import {Observable} from "rxjs";

export class MessageModel {

  constructor(public message: string, public senderUsername: string, public roomId: number, public dhMessage: Date) {
  }

  // id: number,
  // message: string,
  // senderId: number,
  // roomId: number,
  // dhMessage: number
}

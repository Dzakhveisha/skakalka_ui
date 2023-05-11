import {Injectable} from '@angular/core';
import {ChatMessage, NewChatMessage} from "../model/ChatMessage";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/User";

declare var SockJS: new (arg0: string) => any;
declare var Stomp: { over: (arg0: any) => any; };

// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class TextChatService {


  private getHeadersWithAuth(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private JwtHelper: JwtHelperService, private http: HttpClient) {

  }

  public stompClient: { connect: (arg0: {}, arg1: (frame: any) => void) => void; subscribe: (arg0: string, arg1: (message: any) => void) => void; send: (arg0: string, arg1: {}, arg2: any) => void; } | undefined;
  public msg = new Map();

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient?.connect({}, function (frame) {
      that.stompClient?.subscribe("/user/" + that.JwtHelper.decodeToken().sub + "/queue/messages", (message) => {
        if (message.body) {
          console.log(message.body)
          let receivedMsg = JSON.parse(message.body);

          if (that.msg.has(receivedMsg.from.login)) {
            let list = that.msg.get(receivedMsg.from.login)
            list.push(receivedMsg)
            that.msg.set(receivedMsg.from.login, list)
          } else {
            let list: ChatMessage[] = []
            list.push(receivedMsg)
            that.msg.set(receivedMsg.from.login, list)
          }
        }
      });
    });

    ws.onclose = function () {
      console.log('close ws');
      this.stompClient?.disconnect();
    };
  }

  sendMessage(message: NewChatMessage) {
    return this.stompClient?.send("/app/chat", {}, JSON.stringify(message));
  }

  disconnect() {
    console.log('close ws');
    // @ts-ignore
    this.stompClient?.disconnect()
    this.msg = new Map();
  }


  getChats(): Observable<any> {
    return this.http.request<User[]>("GET", 'http://localhost:8080/api/v1/chats/' + this.JwtHelper.decodeToken().sub,
      {headers: this.getHeadersWithAuth()});
  }

  getMessages(withUser: string): Observable<any> {
    return this.http.request<ChatMessage[]>("GET", 'http://localhost:8080/api/v1/chats/' + this.JwtHelper.decodeToken().sub +
      '/' + withUser,
      {headers: this.getHeadersWithAuth()});
  }

  clearMap() {
    this.msg = new Map();
  }
}

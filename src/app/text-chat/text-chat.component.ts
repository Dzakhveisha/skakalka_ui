import {Component, OnInit} from '@angular/core';
import {TextChatService} from "../shared/service/text-chat.service";
import {AuthService} from "../shared/service/auth.service";
import {ChatMessage, NewChatMessage} from "../shared/model/ChatMessage";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Specialization} from "../shared/model/Slot";
import {HttpErrorResponse} from "@angular/common/http";
import {User, UserName} from "../shared/model/User";
import {ch} from "@fullcalendar/core/internal-common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-text-chat',
  templateUrl: './text-chat.component.html',
  styleUrls: ['./text-chat.component.css']
})
export class TextChatComponent implements OnInit{

  input: string | undefined;

  messageToSent: NewChatMessage = {
    id: null,
    from: "",
    to: "",
    message: "",
    dateTime: ""
  };

  msgService: TextChatService;

  msgs: ChatMessage[] = [];
  userChats: User[] = [];
  curChat: User | undefined;

  me: User | undefined;

  constructor(private messageService: TextChatService, private jwtHelper: JwtHelperService, private router: Router,
              private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.msgService = messageService;
    this.messageToSent.from = this.jwtHelper.decodeToken().sub
    router.events.subscribe((val) => {
      this.messageService.clearMap()
    });
    this.activatedRoute.params.subscribe(params => {

      let login = params['login'];
      if (login != undefined) {
        this.authService.getUser(login).subscribe({
          next: (user: User) => {
            this.chooseChat(user)
            this.userChats.push(user)
          },
          error: (err: HttpErrorResponse) => {
            console.log("lol " + err.error.errorMessage + err.error.errorCode)
            alert(err.error.errorMessage)
          }
        })
      }

    })
  }

  ngOnInit(): void {
    this.msgService.getChats().subscribe({
      next: (spec: User[]) => {
        console.log(spec)
        this.userChats = this.userChats.concat(spec);
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    })
    this.authService.getAuthUser().subscribe({
      next: (spec: User) => {
        console.log(spec)
        this.me = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    })
  }

  sendMessage() {
    if (this.input) {
      this.messageToSent.message = this.input
      this.messageToSent.to = <string>this.curChat?.login
      this.messageService.sendMessage(this.messageToSent);
      this.msgs.push({
        message: this.input,
        from: this.me,
        dateTime: "",
        to:this.curChat,
        id:null
      })
      this.input = '';
    }
  }

  chooseChat(chat: User) {
    this.messageService.clearMap()
    this.curChat = chat
    this.messageService.getMessages(chat.login).subscribe({
      next: (spec: ChatMessage[]) => {
        console.log(spec)
        this.msgs = spec;
      },
      error: (err: HttpErrorResponse) => {
        console.log("lol " + err.error.errorMessage + err.error.errorCode)
        alert(err.error.errorMessage)
      }
    })
  }
}

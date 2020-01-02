import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InitService, TokenCheckService, ApiService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { ToastrService } from 'ngx-toastr';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { ConversationsComponent } from '../components/conversations/conversations.component';

declare var jQuery: any;

@Component({
  selector: 'app-zd-whatsapp-window',
  templateUrl: './zd-whatsapp-window.component.html',
  styleUrls: ['./zd-whatsapp-window.component.css']
})
export class ZdWhatsappWindowComponent implements OnInit, OnDestroy {

  @ViewChild(ChatWindowComponent, {static: true}) _chat:ChatWindowComponent
  @ViewChild(ConversationsComponent, {static: true}) _conv:ConversationsComponent

  ticket:any
  agentId:any
  loading:Object = {}
  agent:Object = {}
  timeout:any

  constructor(public _api: ApiService,
              public _init: InitService,
              private _tokenCheck: TokenCheckService,
              private route: Router,
              private orderPipe: OrderPipe,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrService) {

    this.activatedRoute.params.subscribe( params => {
      if ( params.agentId ){
        this.agentId = params.agentId
        this.getAgent( params.agentId )
      }
      if ( params.ticket ){
        this.ticket = params.ticket
        this._chat.getConv( this.ticket )
      }
    });

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    clearTimeout(this.timeout)
  }

  test(){
    console.log(this._chat.tktData)
    console.log(this._chat.tktData['requester']['photo']['content_url'])
  }

  getAgent( agentId  ){
    this.loading['user'] = true;

    this._api.restfulGet( agentId, 'Calls/showUser' )
                .subscribe( res => {

                  this.loading['user'] = false;
                  console.log(res['data'])
                  this.agent = res['data']['data']['user']

                  jQuery('.agent-name').text(this.agent['name'])
                  let url = 'https://material.angular.io/assets/img/examples/shiba1.jpg'
                  if( this.agent['photo'] ){
                    url = this.agent['photo']['content_url'] ? this.agent['photo']['content_url'] : 'https://material.angular.io/assets/img/examples/shiba1.jpg'
                  }
                  jQuery('.user-image').css('background-image', 'url(' + url + ')');

                }, err => {
                  this.loading['user'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  closeTkt( tkt = this.ticket  ){
    this._chat.loading['reading'] = true;
    this.loading['closing'] = true;

    this._api.restfulGet( tkt, 'Whatsapp/solve' )
                .subscribe( res => {

                  this._chat.loading['reading'] = false;
                  this.loading['closing'] = false;
                  this._conv.getTickets()


                }, err => {
                  this._chat.loading['reading'] = false;
                  this.loading['closing'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  chgConv( id ){
    this.ticket = id
    clearTimeout(this._chat.timeout)
    this._chat.getConv(id, true)
  }

  reloadConv(){
    console.log('reload')
    clearTimeout(this._conv.timeout)
    this._conv.getTickets()
  }

  reloadChat(tkt){
    this.ticket = tkt
    clearTimeout(this._chat.timeout)
    this._chat.getConv(tkt)
  }

}

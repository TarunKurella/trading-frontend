import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../Client';
import { ClientSecurityService } from '../client-security.service';
import { Instruments } from '../Instruments';

import { transaction } from '../transaction';
import {map} from 'rxjs/operators'
import { Custodian } from '../Custodian';
import { Clients } from '../Clients';
import { provideRoutes } from '@angular/router';
import { POrder } from '../POrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('f')
  form:any
  client:Client=new Client();
  clients:Clients[]=[];
  instruments:Instruments[]=[];
  instrument:Instruments=new Instruments();
  Model:transaction=new transaction("","","","",0,0,0,"");
   c:String="";
   order:POrder=new POrder();
  constructor(private clientService:ClientSecurityService) {


   }

  ngOnInit(): void {
  }
  getInstrument(id:any){
    this.clientService.getInstrument(id).subscribe(response=>{
      this.instrument= new Instruments(response.id,response.name,response.faceValue,response.expiryDate);

  })
}
  getClient(token:String,id:string){
    this.clientService.getClient(token,id).subscribe(response=>{
      this.client= new Client(response.id,response.name,response.cust_id,response.transaction_limit);

  })}
  getClients(token:String){
    this.clientService.getAllClients(token).subscribe(respons=>
      {
       this.clients=respons.map((item:any)=>{
         console.log(this.clients)
         return new Clients(item.id,item.name);
       });
      }

    )
  }

  getInstuments(){
    this.clientService.getInstruments().subscribe(
      response=>{
        {
        this.instruments=response.map(item=>{
         return  new Instruments(item.id,item.name,item.faceValue,item.expiryDate);
        })

      }}
    );
  }
  oninput(event:any){
    console.log("value is"+this.form.value.Client_id);
   this.getClient(this.clientService.token,event.target.value);

  }
  oncl(){
    this.clients=this.clientService.clients;
    this.getInstuments();
  }
  oninputinst(event:any){
   this.getInstrument(event.target.value);

  }
  onevent(event:any){
 if(event.target.value=="Buy"){
  console.log("value is"+"BUY");
 }
  }


onorder(){

  this.order=new POrder(this.form.value.Client_id,this.form.value.Instrument_id,this.form.value.Price,this.form.value.Quantity,this.form.value.Direction)
  this.clientService.insertOrder(this.order).subscribe(value=>alert(value));

}
}

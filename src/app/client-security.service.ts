import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from './Client';
import { Clients } from './Clients';
import { credentials } from './credentials';
import { Custodian } from './Custodian';
import { Instruments } from './Instruments';

@Injectable({
  providedIn: 'root'
})
export class ClientSecurityService {
  clients:Clients[]=[];

  custid:string="";
  token:string="";



   url:string="http://localhost:8083";
  constructor(private http:HttpClient) { }

  public generateToken(request:credentials){
    this.custid=request.username;
    return this.http.post(this.url+"/authenticate",JSON.parse(JSON.stringify(request)),{responseType:'text' as 'json'})

  }
  public getCustodian(id:String){
  }
  public welcome(token:string){
    let tokenstr="Bearer "+token;
    this.token=token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get(this.url,{headers,responseType:'text' as 'json'})


  }
  public getClient(token:String,id:string):Observable<Client>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get<Client>(this.url+"/client/" +id,{headers});
  }
  public getAllClients(token:String):Observable<Clients[]>{
    console.log(this.token);
    const tokenstr="Bearer "+this.token;

    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get<Clients[]>(this.url+"/clients/"+this.custid ,{headers})

  }

  public getInstruments():Observable<Instruments[]>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get<Instruments[]>(this.url+"/instruments",{headers});
  }
  public getInstrument(id:String):Observable<Instruments>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get<Instruments>(this.url+"/instrument/" + id,{headers});
  }
  public insertOrder(orderRequest:any){
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.post(this.url+"/order",JSON.parse(JSON.stringify(orderRequest)),{headers})
  }
  getcli(cl:Clients[]){
    this.clients=cl;
  }
  gettoken(token:string){
    this.token=token;
  }



}

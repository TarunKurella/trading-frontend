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

  custid:String=""; 
  token:any;

   url:String="http://localhost:9090/";
  constructor(private http:HttpClient) { }

  public generateToken(request:credentials){
    this.custid=request.username;
    return this.http.post("http://localhost:8080/authenticate",JSON.parse(JSON.stringify(request)),{responseType:'text' as 'json'})
    
  }
  public getCustodian(id:String){
  }
  public welcome(token:String){
    let tokenstr="Bearer "+token;
    this.token=token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);
    
    return this.http.get("http://localhost:8080/",{headers,responseType:'text' as 'json'})
    
  
  }
  public getClient(token:String,id:String):Observable<Client>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);
    return this.http.get<Client>("http://localhost:8080/client/" + id,{headers});
  }
  public getAllClients(token:String):Observable<Clients[]>{
    console.log(this.token);
    const tokenstr="Bearer "+this.token;
  
    const headers=new HttpHeaders().set("Authorization",tokenstr);
    
    return this.http.get<Clients[]>("http://localhost:8080/clients/CS001" ,{headers})
 
  }    

  public getInstruments():Observable<Instruments[]>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);

    return this.http.get<Instruments[]>("http://localhost:8080/instuments/",{headers});
  }
  public getInstrument(id:String):Observable<Instruments>{
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);
    
    return this.http.get<Instruments>("http://localhost:8080/instument/" + id,{headers});
  }
  public insertOrder(orderRequest:any){
    const tokenstr="Bearer "+this.token;
    const headers=new HttpHeaders().set("Authorization",tokenstr);
    
    this.http.post("http://localhost:8080/transaction",JSON.stringify(orderRequest),{headers})
  }
  getcli(cl:Clients[]){
    this.clients=cl;
  }
  gettoken(token:String){
    this.token=token;
  }


  
}

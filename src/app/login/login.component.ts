import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientSecurityService } from '../client-security.service';
import { Clients } from '../Clients';
import { credentials } from '../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f')
  form:any;
  model:credentials=new credentials("","");

  authRequest:any={
    "username":"CS001",
    "password":"yes123$"
  };
token:string="";

  response:any;
  auth:credentials=new credentials("","");
  constructor(private router:Router,
    private clientservice:ClientSecurityService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  public getAccessToken(authRequest:any){
  let resp=this.clientservice.generateToken(authRequest);
  resp.subscribe(resp=>{console.log(this.token=JSON.stringify(resp));this.clientservice.token=JSON.stringify(resp);this.accessapi(resp)});
  }
  public accessapi(token:any){
    let resp=this.clientservice.welcome(token);
    this.clientservice.token=token;
    localStorage.setItem('token',token);
    console.log(localStorage.getItem('token'))
    
    resp.subscribe(data=>{this.response=data})

  }
  onclick(){
    const authen=new credentials(this.form.value.username,this.form.value.password);
    this.getAccessToken(authen);
    console.log(this.token)
    this.clientservice.getAllClients(this.clientservice.token).subscribe((respons:any)=>
    {
      console.log(respons)
      if(respons){
        this.router.navigate(['order'])
      }
      
     this.clientservice.clients=respons.map((item:any)=>{

       return new Clients(item.id,item.name);
     });
     console.log(this.clientservice.clients)
    })
    



  }

}

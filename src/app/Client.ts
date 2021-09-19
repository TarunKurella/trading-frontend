import { Custodian } from "./Custodian";

export class Client{
    constructor(public id:String="",
    public name:String="",
    public cust_id:Custodian=new Custodian("",""),
    public transaction_limit:number=0
    ){

    }
}
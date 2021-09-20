export class POrder{
  constructor(
      public client_id:string="",
      public instrument_id:String="",
      public price:Number=0,
      public quantity:Number=0,
      public type:String=""
  ){

  }
}

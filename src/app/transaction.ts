export class transaction{
    constructor(
        public Client_id:String="",
        public Client_name:String="",
        public Instrument_id:String="",
        public Instrument_name:String="",
        public faceValue:Number=0,
        public Price:Number=0,
        public Quantity:Number=0,
        public Direction:String=""
    ){

    }
}
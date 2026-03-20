import { Branch } from "../Gitstructure/Branch";


export class Moon{
    name:string;
    size:number;
    type:string;
    importance:number;

    constructor(){
        this.name="main";
        this.size=1;
        this.type="";
        this.importance=0;
    }

    CreateMoon(branch:Branch){
        this.name=branch.name;
        this
    }

    

}
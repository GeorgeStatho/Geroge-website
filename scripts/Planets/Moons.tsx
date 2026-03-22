import { Branch } from "../Gitstructure/Branch";
import { calculateImportance } from "../utils/CalculateImportance";

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
        this.size=branch.commitCount;
        this.importance=calculateImportance(branch.date,branch.commitCount,0)
    }

    

}
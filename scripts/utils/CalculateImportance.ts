import { DatetoInt } from "./DateToInt";

export function calculateImportance(Date:string,Commits:number,xNum:number){
        let importance=0.35*DatetoInt(Date) + 0.25*Commits+ 0.20*xNum + 0.10*0 + 0.10*0;//forks and stars
        return importance;
    }
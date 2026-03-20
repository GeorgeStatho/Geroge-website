import { Moon } from "./Moons";
import { Asteroid } from "./AsteroidRing";
import { Repo } from "../Gitstructure/Repos";
import { DatetoInt } from "../utils/DateToInt";
import languageColors from "../utils/languageColors";

export class Planet{
    name:string;
    size:number;
    importance:number
    color:string;
    moons:Moon[];
    asteroids:Asteroid[];
    constructor(name:string){
        this.name=name;
        this.size=0;
        this.importance=0;
        this.color="";
        this.moons=[];
        this.asteroids=[];
    }

    calculateImportance(repoDate:string,repoCommits:number,branchNum:number){
        let importance=0.35*DatetoInt(repoDate) + 0.25*repoCommits+ 0.20*branchNum + 0.10*0 + 0.10*0;//forks and stars
        return importance;
    }

    determineColor(languages:string[]){
        return languageColors[languages[0]]
    }

    createPlanet(repo:Repo){
        this.importance=this.calculateImportance(repo.date,repo.commitCount,repo.branches.length);
        this.color=this.determineColor(repo.languages);
        let moon=new Moon()
        for (let branch of repo.branches){
            
        }
    }

}
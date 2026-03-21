import { Moon } from "./Moons";
import { Asteroid } from "./AsteroidRing";
import { Repo } from "../Gitstructure/Repos";
import { DatetoInt } from "../utils/DateToInt";
import languageColors from "../utils/languageColors";
import { calculateImportance } from "../utils/CalculateImportance";

export class Planet{
    name:string;
    date:string;
    size:number;
    importance:number;
    color:string;
    isUserPlanet:boolean;
    hasRing:boolean;
    moons:Moon[];
    asteroids:Asteroid[];
    constructor(name:string){
        this.name=name;
        this.date="";
        this.size=0;
        this.importance=0;
        this.color="";
        this.isUserPlanet=false;
        this.hasRing=true;
        this.moons=[];
        this.asteroids=[];
    }

    determineColor(languages:string[]){
        const primaryLanguage = languages[0]?.toLowerCase();
        return languageColors[primaryLanguage] ?? "#94a3b8";
    }

    createPlanet(repo:Repo){
        this.date=repo.date;
        this.importance=calculateImportance(repo.date,repo.commitCount,repo.branches.length);
        this.color=this.determineColor(repo.languages);
        this.moons = [];
        for (let branch of repo.branches){
            const moon=new Moon();
            moon.CreateMoon(branch);
            this.moons.push(moon);
        }
    }

}

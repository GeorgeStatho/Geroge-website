import { Moon } from "./Moons";
import { Asteroid } from "./AsteroidRing";
import { Repo } from "../Gitstructure/Repos";
import { DatetoInt } from "../utils/DateToInt";
import languageColors from "../utils/languageColors";
import { calculateImportance } from "../utils/CalculateImportance";

export class Planet{
    name:string;
    size:number;
    importance:number;
    color:string;
    isUserPlanet:boolean;
    hasRing:boolean;
    moons:Moon[];
    asteroids:Asteroid[];
    constructor(name:string){
        this.name=name;
        this.size=0;
        this.importance=0;
        this.color="";
        this.isUserPlanet=false;
        this.hasRing=true;
        this.moons=[];
        this.asteroids=[];
    }

    determineColor(languages:string[]){
        return languageColors[languages[0]]
    }

    createPlanet(repo:Repo){
        this.importance=calculateImportance(repo.date,repo.commitCount,repo.branches.length);
        this.color=this.determineColor(repo.languages);
        const moon=new Moon();
        for (let branch of repo.branches){
            moon.CreateMoon(branch);
        }
    }

}

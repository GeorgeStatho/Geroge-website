import { Moon } from "./Moons";
import { Asteroid } from "./AsteroidRing";

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

}
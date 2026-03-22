import { Planet } from "./Planets";

import { GitUser } from "../Gitstructure/GitHubUser";

export class SolarSystem{
    planets:Planet[];
    user:GitUser;
    constructor(name:string){
        this.planets=[new Planet(name)];
        this.user=new GitUser(name)
    }

    createUserPlanet(){
        const userPlanet = this.planets[0];
        userPlanet.color="#f4b942";
        userPlanet.importance=999;
        userPlanet.size=110;
        userPlanet.isUserPlanet=true;
        userPlanet.hasRing=false;
        userPlanet.imageUrl=this.user.avatarUrl;
    }

    async createSolarSystem() {
        await this.user.fillRepos();
        this.createUserPlanet();
        let planet:Planet;
        for (const repo of this.user.Repos) {
          planet=new Planet(repo.name);
          
          planet.createPlanet(repo)
          this.planets.push(planet);
        }
      }


}

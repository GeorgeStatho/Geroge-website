import { Planet } from "./Planets";

import { GitUser } from "../Gitstructure/GitHubUser";

class SolarSystem{
    planets:Planet[];
    user:GitUser;
    constructor(name:string){
        this.planets=[new Planet(name)];
        this.user=new GitUser(name)
    }

    async createPlanets() {
        await this.user.fillRepos();
        let planet:Planet;
        for (const repo of this.user.Repos) {
          planet=new Planet(repo.name);
    
          for (const [branchName, commits] of Object.entries(repo.branches)) {
            
            
          }
        }
      }

    calculateImportance(recency:number,numOfCommits:number,){

    }

}
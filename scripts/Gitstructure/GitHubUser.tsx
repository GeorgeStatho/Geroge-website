import {Repo} from "./Repos";
import { getRepos } from "./gitAPI";

export class GitUser{
    name:string;
    Repos:Repo[];

    constructor(name:string){
        this.name=name;
        this.Repos=[];
    }

    async fillRepos(){
        const result =await getRepos(this.name);
        const repoNodes =
        result.data.user.contributionsCollection.commitContributionsByRepository;

        for (const repoData of repoNodes) {
            const repoName = repoData.repository.name;
            const repo = new Repo(repoName);
            await repo.createRepoData(repoName);
            this.Repos.push(repo);
        }
    }

}
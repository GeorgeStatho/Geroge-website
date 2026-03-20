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
            const repoCreatedAt = repoData.repository.createdAt;
            const repoCommitCount =
                repoData.repository.defaultBranchRef?.target?.history?.totalCount ?? 0;
            const repo = new Repo(repoName,repoCreatedAt,repoCommitCount);
            repo.fillBranches(repoData.repository.refs?.nodes ?? []);
            this.Repos.push(repo);
        }
    }

}

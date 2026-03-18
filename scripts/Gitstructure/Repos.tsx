import Commit from "./Commits";
export class Repo{
    name:string;
    date:string;
    commitCount:number;
    branches:Record<string,Commit[]>;

    constructor(name:string,date:string,commitCount:number=0){
        this.name=name;
        this.date=date;
        this.commitCount=commitCount;
        this.branches={};        
    }

    createRepoData(branchNodes: any[] = []) {
        this.branches = {};

        for (const branch of branchNodes) {
            this.branches[branch.name] = [];

            const commits = branch.target?.history?.nodes ?? [];

            for (const commit of commits) {
                this.branches[branch.name].push(
                    new Commit(
                        commit.messageHeadline,
                        commit.committedDate,
                        commit.additions + commit.deletions
                    )
                );
            }
        }
    }



}

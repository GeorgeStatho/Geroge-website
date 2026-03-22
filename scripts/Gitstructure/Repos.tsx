import { Branch } from "./Branch";

export class Repo{
    name:string;
    date:string;
    commitCount:number;
    languages:string[];
    branches:Branch[];

    constructor(name:string,date:string,commitCount:number=0,languages:string[]=[]){
        this.name=name;
        this.date=date;
        this.commitCount=commitCount;
        this.languages=languages;
        this.branches=[];        
    }

    fillBranches(branchNodes: any[] = []) {
        this.branches = [];

        for (const branch of branchNodes) {
            const branchData = new Branch(
                branch.name,
                branch.target?.committedDate ?? "",
                branch.target?.history?.totalCount ?? 0
            );
            branchData.fillCommits(branch.target?.history?.nodes ?? []);
            this.branches.push(branchData);
        }
    }
}

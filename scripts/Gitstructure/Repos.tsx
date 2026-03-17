import Commit from "./Commits";
import { getRepoData } from "./gitAPI";
export class Repo{
    name:string;
    date:string;
    branches:Record<string,Commit[]>;

    constructor(name:string,date:string){
        this.name=name;
        this.date=date
        this.branches={};        
    }

    async createRepoData(name: string) {
        const result = await getRepoData(name);
        const branchNodes = result.data.repository.refs.nodes;

        for (const branch of branchNodes) {
            this.branches[branch.name] = [];

            for (const commit of branch.target.history.nodes) {
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

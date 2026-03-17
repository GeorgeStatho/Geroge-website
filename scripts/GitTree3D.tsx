import { createRoot } from 'react-dom/client';
import { GitUser } from './Gitstructure/GitHubUser';
import { createElement } from 'react';
import {GitNode3D} from './GitNode3D'


class GitTree3D{
    user:GitUser;
    nodes:GitNode3D[];

    constructor(user:string){
        this.user=new GitUser(user);
        this.nodes=[new GitNode3D(null,{x:0,y:0,z:0}, 1)];
    }

    createNodes(){
        for(let repos in this.user.Repos){
            
        }
    }

};



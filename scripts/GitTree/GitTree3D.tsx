import { createRoot } from 'react-dom/client';
import { GitUser } from '../Gitstructure/GitHubUser';
import { Repo } from '../Gitstructure/Repos';
import { createElement } from 'react';
import {GitNode3D} from './GitNode3D'


export class GitTree3D{
    user:GitUser;
    rootNode:GitNode3D;
    nodes:GitNode3D[];

    constructor(user:string){
        this.user=new GitUser(user);
        this.nodes=[new GitNode3D(user,null)];
        this.rootNode=this.nodes[0];
    }

    getNodeTime(createdAt: string): number {
    const created = new Date(createdAt).getTime();
        return created;
    }

    async createNodes() {
    await this.user.fillRepos();

    for (const repo of this.user.Repos) {
      const repoNode = new GitNode3D(
        repo.name,
        this.rootNode
      );
      this.nodes.push(repoNode);

      for (const [branchName, commits] of Object.entries(repo.branches)) {
        const branchNode = new GitNode3D(
          branchName,
          repoNode,
          );
        this.nodes.push(branchNode);

        this.fillBranch(branchNode, commits, 0);
      }
    }
  }


    fillBranch(parentNode: GitNode3D, commits: any[], index: number) {
    if (index >= commits.length) {
      return;
    }

    const commit = commits[index];
    const commitNode = new GitNode3D(
      commit.author,
      parentNode,
      );

    this.nodes.push(commitNode);
    this.fillBranch(commitNode, commits, index + 1);
  }

};



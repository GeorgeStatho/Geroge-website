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
        this.nodes=[new GitNode3D(user,null,{x:0,y:0,z:0}, 1)];
        this.rootNode=this.nodes[0];
    }

    getRepoZ(createdAt: string): number {
    const start = new Date("2025-01-01T00:00:00Z").getTime();
    const created = new Date(createdAt).getTime();

        return (created - start) / (1000 * 60 * 60 * 24 * 30);
    }

    async createNodes() {
    await this.user.fillRepos();

    for (const repo of this.user.Repos) {
      const repoNode = new GitNode3D(
        repo.name,
        this.rootNode,
        { x: 0, y: 0, z: this.getRepoZ(repo.date) },
        1
      );
      this.nodes.push(repoNode);

      for (const [branchName, commits] of Object.entries(repo.branches)) {
        const branchNode = new GitNode3D(
          branchName,
          repoNode,
          { x: 0, y: 0, z: 0 },
          1
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
      { x: 0, y: 0, z: 0 },
      commit.size
    );

    this.nodes.push(commitNode);
    this.fillBranch(commitNode, commits, index + 1);
  }

};



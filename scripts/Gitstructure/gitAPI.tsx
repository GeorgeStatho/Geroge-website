const api_url:string="https://api.github.com/graphql";
const token = import.meta.env.VITE_GITHUB_TOKEN;





function getUser(){
    return fetch(api_url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `
        query {
            viewer {
            login
            }
        }
        `,
    }),
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export function getRepos(user:string){
    return fetch(api_url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `
        query Repos {
            user(login: "${user}") {
                contributionsCollection {
                commitContributionsByRepository(maxRepositories: 100) {
                    repository {
                    name
                    createdAt
                    }
                }
                }
            }
            }
        `,
    }),
    })
    .then((res) => res.json())
}




export function getRepoData(repoName:string){
    return fetch(api_url, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: `
        query RepoBranches {
            repository(owner: "georgestatho", name: "${repoName}") {
                refs(refPrefix: "refs/heads/", first: 30) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    name
                    target {
                    ... on Commit {
                        history(first: 10) {
                        pageInfo {
                            hasNextPage
                            endCursor
                        }
                        nodes {
                            oid
                            messageHeadline
                            committedDate
                            additions
                            deletions
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        `,
    }),
    })
    .then((res) => res.json())
}


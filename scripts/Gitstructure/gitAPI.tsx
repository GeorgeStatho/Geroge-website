const api_url:string="https://api.github.com/graphql";
const rawToken = import.meta.env.VITE_GITHUB_TOKEN ?? "";
const token = rawToken.trim().replace(/;$/, "");

async function runQuery(query:string){
    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
        const errorMessage = data.errors?.map((error: { message?: string }) => error.message).join(", ")
            || `GitHub API request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    return data;
}





function getUser(){
    return runQuery(`
        query {
            viewer {
            login
            }
        }
        `)
    .then((data) => console.log(data));
}

export function getRepos(user:string){
    return runQuery(`
        query Repos {
            user(login: "${user}") {
                avatarUrl(size: 256)
                contributionsCollection {
                commitContributionsByRepository(maxRepositories: 100) {
                    repository {
                    name
                    createdAt
                    languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                        nodes {
                        name
                        }
                    }
                    defaultBranchRef {
                        target {
                        ... on Commit {
                            history {
                            totalCount
                            }
                        }
                        }
                    }
                    refs(refPrefix: "refs/heads/", first: 30) {
                        nodes {
                        name
                        target {
                            ... on Commit {
                            committedDate
                            history(first: 10) {
                                totalCount
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
                }
            }
            }
        `,
    )
}

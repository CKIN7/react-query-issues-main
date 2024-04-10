import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../../api/gitHubApi"
import { sleep } from "../helpers/sleep"
import { Issue } from "../interfaces"


const getIssueInfo = async( issueNumber: number): Promise<Issue> => {
    await sleep(2)
    const { data } = await gitHubApi.get<Issue>(`/issues/${ issueNumber }`)
    return data
}

export const useIssue = (issueNumber: number) => {
 
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssueInfo(issueNumber),
    })

    return {
        issueQuery
    }
}
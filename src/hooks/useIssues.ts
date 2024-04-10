import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../../api/gitHubApi"
import { Issue } from "../interfaces/"
import { sleep } from "../helpers/sleep"

const getIssues = async(): Promise<Issue[]> => {
    await sleep(2)
    const { data } = await gitHubApi.get<Issue[]>('issues')
    return data
}

export const useIssues = () => {

    const issuesQuery = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues,
        // refetchInterval: 5000
    })

    return {
        issuesQuery
    }
}
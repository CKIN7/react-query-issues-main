import { useQuery } from "@tanstack/react-query"
import { Label } from "../interfaces/label"
import { gitHubApi } from "../../api/gitHubApi"

const getLabels = async ():Promise<Label[]> => {
    const { data } = await gitHubApi.get<Label[]>('/labels')
    return data
}


export const useLabels = () => {
  
    labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60,
    })

}
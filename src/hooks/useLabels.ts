import { useQuery } from '@tanstack/react-query';
import { Label } from '../interfaces/label';
import { gitHubApi } from '../../api/gitHubApi';

const getLabels = async (): Promise<Label[]> => {
    const { data } = await gitHubApi.get<Label[]>('/labels?per_page=100');
    return data;
};

export const useLabels = () => {
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        refetchOnWindowFocus: false,
        // staleTime: 1000 * 60 * 60,
        // initialData: [], // initial data funciona con el stale time, reactquery confia que esa es la ultima data (que esta fresh) en el cache
        // placeholderData: [
        //   {
        //     id: 69105383,
        //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
        //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        //     name: "Browser: IE",
        //     color: "c7def8",
        //     default: false,
        // },
        // {
        //     id: 69105358,
        //     node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
        //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
        //     name: "Browser: Safari",
        //     color: "c7def8",
        //     default: false,
        // }
        // ] // placeholderData, mientras se hace la peticion muestra esta data y a pesar de que tenemos el staleTime despues de que se resuelve el fetching ya ahi tenemos eso y no muestra el loading porque tenemos data
    });

    return labelsQuery;
};

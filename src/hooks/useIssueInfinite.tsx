import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../interfaces';
import { gitHubApi } from '../../api/gitHubApi';

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

interface QueryProps {
    pageParam?: number;
    queryKey: (string | Props)[];
}

const getIssues = async ({
    queryKey,
    pageParam = 1,
}: QueryProps): Promise<Issue[]> => {
    const [, , args] = queryKey;
    const { state, labels } = args as Props;
    // await sleep(2)
    const params = new URLSearchParams();

    if (state) params.append('state', state);
    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }
    params.append('page', pageParam.toString());
    params.append('per_page', '5');

    const { data } = await gitHubApi.get<Issue[]>('/issues', { params });

    return data;
};

export const useIssueInfinite = ({ state, labels }: Props) => {
    const issuesQuery = useInfiniteQuery({
        queryKey: ['issues', 'infinite', { state, labels }],
        queryFn: (data) => getIssues(data),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return;

            return pages.length + 1;
        },
    });

    return {
        issuesQuery,
    };
};

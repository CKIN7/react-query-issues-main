import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/gitHubApi';
import { Issue, State } from '../interfaces/';
import { useEffect, useState } from 'react';

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ({
    labels,
    state,
    page = 1,
}: Props): Promise<Issue[]> => {
    const params = new URLSearchParams();

    if (state) params.append('state', state);

    if (labels.length > 0) {
        const labelString = labels.join(',');
        params.append('labels', labelString);
    }

    params.append('page', page.toString());
    params.append('per_page', '5');

    const { data } = await gitHubApi.get<Issue[]>('issues', { params });

    return data;
};

export const useIssues = ({ state, labels }: Props) => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [state, labels]);

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, labels, page }],
        queryFn: () => getIssues({ labels, state, page }),
        refetchOnWindowFocus: false,
        // refetchInterval: 5000
    });

    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return;
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return {
        // Properties
        issuesQuery,

        // Getter
        page: issuesQuery.isFetching ? 'Loading...' : page,

        // Methods
        nextPage,
        prevPage,
    };
};

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../../interfaces';
import { FC } from 'react';

interface Props {
    issue: Issue;
}


export const IssueItem: FC<Props> = ({ issue }) => {
    return (
        <div className="card mb-2 issue">
            <div className="card-body d-flex align-items-center">

                {
                    issue.state === State.Open
                        ? <FiInfo size={30} color="red" />
                        : <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#25581 opened 2 days ago by <span className='fw-bold'>segfaulty1</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src="https://avatars.githubusercontent.com/u/1933404?v=4" alt="User Avatar" className="avatar" />
                    <span className='px-2'>2</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}

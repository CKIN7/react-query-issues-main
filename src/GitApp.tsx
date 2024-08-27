import { FC } from 'react';
import { Outlet } from 'react-router';

import { Link } from 'react-router-dom';

export const GitApp: FC = () => {
    return (
        <div className="container mt-3">
            <h1>
                <Link to="/issues/list">Git Issues</Link>
                <small>Seguimiento de problemas</small>
            </h1>
            <nav>
                <ul style={{ listStyleType: 'none' }}>
                    <li style={{ fontSize: '22px' }}>
                        <Link to="/issues/list/infinite">
                            Test Infinite Scroll
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ flow }) => {
    const theme = useTheme();

    return (
        <div style={{ marginTop: theme.spacing(2), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <Breadcrumbs separator={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.64582 2.14708C5.84073 1.95147 6.15731 1.9509 6.35292 2.14582L11.8374 7.6108C12.0531 7.82574 12.0531 8.17505 11.8374 8.39L6.35292 13.855C6.15731 14.0499 5.84073 14.0493 5.64582 13.8537C5.4509 13.6581 5.45147 13.3415 5.64708 13.1466L10.8117 8.0004L5.64708 2.85418C5.45147 2.65927 5.4509 2.34269 5.64582 2.14708Z" fill="#8E8E8E" />
                    </svg>} aria-label="breadcrumb">
                    {flow?.map((item, index) => {
                        const isLast = index === flow.length - 1;
                        return isLast ? (
                            <Typography
                                key={index}
                                color="text.primary"
                                sx={{
                                    cursor: item.onClick ? 'pointer' : 'default', color: '#2E2E2E',
                                    fontFamily: '"Inter", sans-serif',
                                    fontSize: '14px',

                                }}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </Typography>
                        ) : (
                            <Link
                                key={index}
                                to={item.to}
                                style={{ textDecoration: 'none', color: '#8E8E8E', fontFamily: '"Inter", sans-serif', fontSize: '14px' }}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
                <Typography sx={{
                    fontSize: '32px',
                    fontWeight: '300',
                    fontFamily: '"Inter", sans-serif'
                }} >
                    {flow[flow.length - 1]?.label}
                </Typography>
            </div>
        </div>
    );
};

export default BreadCrumb;

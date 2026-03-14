import { Box, CircularProgress } from '@mui/material';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const Loader = ({ loading, children,  center, style, size }) => {
    return !loading ? (
        children
    ) : (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: center ? 'center' : 'flex-start',
                position: 'relative',
                ...style
            }}
        >
            <CircularProgress
                override={override}
                color={"blue"}
                loading={loading}
                cssOverride={override}
                size={size ? size : 70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Box>
    );
};

export default Loader;

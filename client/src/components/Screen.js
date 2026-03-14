import { Box } from '@mui/material'
import React from 'react'
import BreadCrumb from './breadCrumb'
import Loader from './leader'
const Screen = React.memo(({ children, loading, flow }) => {
    return (
        <div style={{ padding: "20px", marginTop: "40px", backgroundColor: '#00000002', minHeight: '93vh' }}>
            
            <Box>
                <BreadCrumb flow={flow} />
                <Loader loading={loading} center overlay>
                    {children}
                </Loader>
            </Box>
        </div>
    )
});
export default Screen;

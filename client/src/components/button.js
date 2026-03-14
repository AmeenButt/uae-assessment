import { CircularProgress } from '@mui/material'
import { memo } from 'react'

function Button({ text, onClick, loading, disabled, type = "button", style }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            href="dashboard"
            style={{
                textWrap: "nowrap",
                opacity: disabled ? 0.5 : 1,  // Makes it dull when disabled
                cursor: disabled ? "not-allowed" : "pointer", // Pr
                ...style,
                backgroundColor: '#D42D27',
                borderRadius: '6px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: '400',
                color: "#fff",
                padding: "8px 20px",
                width: "100%",
                margin: "0 auto",
                textAlign: "center",
                border:'0px'
            }}
        >
            {
                loading ? <CircularProgress
                    style={{
                        color: 'white',
                        width: '20px',
                        height: '20px',
                    }}
                /> : `${text}`
            }
        </button>
    )
}
export default memo(Button)

import { Alert, Box } from "@mui/material";

type ErrorProps = {
    message: string
    onClick: () => void
}

export default function Error (props: ErrorProps) {
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    };

    return (
        <Box sx={{ ...style }}>
            <Alert variant={"outlined"} severity={"error"} onClose={props.onClick} onClick={props.onClick} >
                {props.message}
            </Alert>
        </Box>
    );
}
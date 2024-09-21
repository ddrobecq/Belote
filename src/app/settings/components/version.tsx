import { Stack, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export default function Version () {
    const version = process.env.NEXT_PUBLIC_VERSION;

    return(
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'} >
            <Stack direction={'row'} spacing={2} alignItems={'center'} >
                <InfoIcon fontSize={'large'} color={'primary'} />
                <Typography variant={'h3'} justifyContent={'rigth'} >Version</Typography>
            </Stack>
            <Typography variant='h3'>{version}</Typography>
        </Stack>
    );
}
import { Divider, Stack } from '@mui/material';
import Version from './components/version';
import SettingsTheme from './components/settings-theme';

export default function Settings () {
    return(
        <Stack direction={'column'} marginTop={5} spacing={1} alignContent={'center'} >
            <Version />
            <Divider />
            <SettingsTheme />
            <Divider />
        </Stack>
    );
}
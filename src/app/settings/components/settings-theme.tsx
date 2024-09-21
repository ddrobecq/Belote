'use client';

import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useLocalStorage from "@drobs/local-storage-react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { _DEFAULT_THEME_MODE, _STORAGE_KEY_THEME_MODE } from "@/theme/theme";
import { ThemeModeContext, ThemeModeType } from "@/theme/theme-context";
import ContrastIcon from '@mui/icons-material/Contrast';

export default function SettingsTheme () {
    const [defaultMode, setDefaultMode] = useLocalStorage(_STORAGE_KEY_THEME_MODE, _DEFAULT_THEME_MODE);
    const {mode, setMode} = useContext (ThemeModeContext);

    function handleChangeMode(e:React.MouseEvent<HTMLElement>, value:ThemeModeType):void {
        e.preventDefault();
        setMode (value);
        setDefaultMode (value);
    }

    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'space-between'} >
            <Stack direction={'row'} spacing={2} alignItems={'center'} >
                <ContrastIcon fontSize={'large'} color={'primary'} />
                <Typography variant={'h3'} justifyContent={'rigth'} >Mode</Typography>
            </Stack>
            <ToggleButtonGroup
                value={mode}
                defaultValue={defaultMode}
                exclusive
                onChange={handleChangeMode} 
                size={'small'} >
                <ToggleButton value={'dark'} ><DarkModeIcon /></ToggleButton> 
                <ToggleButton value={'light'} ><LightModeIcon/></ToggleButton> 
            </ToggleButtonGroup>
        </Stack>
    );
}

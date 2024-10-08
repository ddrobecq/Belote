'use client';

import React, { SyntheticEvent, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Divider } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';


export default function Menu () {
	const router = useRouter();
	const pathname = usePathname();
	const theme = useTheme();
	const [value, setValue] = useState(pathname);
      
	function handleChangeMenu(event:SyntheticEvent, newValue:string) {
		event.preventDefault();
		setValue(newValue);
		router.push(newValue);
	}
  
	return(
		<Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} >
			<Divider />
			<BottomNavigation 
				sx={{ backgroundColor:theme.palette.background.paper, height: 100, paddingBottom: 5}}
				showLabels
				value={value}
				onChange={handleChangeMenu} >
				<BottomNavigationAction value={'/stat'} label="Statistiques" icon={<AssessmentOutlinedIcon />} />
				<BottomNavigationAction value={'/'} label="Jouer" icon={<HomeIcon />} />
				<BottomNavigationAction value={'/users'} label="Joueurs" icon={<PeopleAltIcon />} />
				<BottomNavigationAction value={'/settings'} label="Paramètres" icon={<SettingsOutlinedIcon />} />
			</BottomNavigation>
		</Box>
	);
}

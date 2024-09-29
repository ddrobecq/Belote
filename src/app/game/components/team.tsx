import React from "react";
import { Typography } from "@mui/material";

type TeamProps = {
    name: string;
};

export default function Team(props: TeamProps) {
	return (
		<Typography variant="h1">{props.name}</Typography>
	);
}
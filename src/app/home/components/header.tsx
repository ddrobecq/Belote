import React from "react";
import { Stack } from "@mui/material";
import Image from "next/image";

export default function Header() {
	return (
		<Stack alignItems={'center'}>
			<Image
				src="/drobs.jpg"
				alt="Drobs Logo"
				width={120}
				height={120}
				priority
			/>
		</Stack>
	);
}
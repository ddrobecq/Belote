'use client';

import React from 'react';
import Users from "@drobs/users";

export default function Page() {
	const url = process.env.NEXT_PUBLIC_USERS_API_URL as string;
	return (
		<div>
			<Users url={url} size={'small'} />
		</div>
	);
}
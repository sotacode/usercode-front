import React from "react";
import NextHead from "next/head";

export const Head = () => {
	return (
		<NextHead>
			<title>Entrevista USERCODE</title>
			<meta key="title" content="Entrevista USERCODE" property="og:title" />
			<meta
				key="viewport"
				content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				name="viewport"
			/>
			<link href="/favicon.ico" rel="icon" />
		</NextHead>
	);
};

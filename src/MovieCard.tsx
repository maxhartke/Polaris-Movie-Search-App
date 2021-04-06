import React from "react";
import { useState } from "react";
import { Button, Card, Subheading, Heading } from "@shopify/polaris";
import { movie } from "./movie";

const MovieCard = (props: { movie: movie; buttonText: string }) => {
	return (
		<div id={props.movie.imdbID} style={{ width: 450, marginBlock: 10 }}>
			<Card sectioned>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<img
							style={{ height: 80, width: 60, borderRadius: 10 }}
							src={props.movie.Poster}
							alt={props.movie.Title}
						/>
						<div
							style={{
								marginInline: 10,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Heading>{props.movie.Title}</Heading>
							<Subheading>{props.movie.Year}</Subheading>
						</div>
					</div>
					<div style={{ justifyContent: "stretch" }}>
						<Button primary>{props.buttonText}</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};
export default MovieCard;

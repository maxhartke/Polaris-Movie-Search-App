import React from "react";
import { useEffect, useState } from "react";
import {
	AppProvider,
	Button,
	Heading,
	Page,
	TopBar,
	Card,
	DisplayText,
	ResourceList,
	ResourceItem,
	Avatar,
	TextStyle,
	TextContainer,
	TextField,
} from "@shopify/polaris";
import { movie } from "./movie";
import MovieCard from "./MovieCard";

function getWindowDimensions() {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

export default function App() {
	const [Input, setInput] = useState("");
	const [movies, setMovies] = React.useState<movie[]>([]);
	const [nominatedMovies, setNominatedMovies] = React.useState<movie[]>([]);
	const { width } = useWindowDimensions();
	function getMovies(title: string) {
		var request = new XMLHttpRequest();
		request.open(
			"GET",
			"https://www.omdbapi.com/?s=" +
				title +
				"&apikey=" +
				process.env.REACT_APP_OMDB_API_KEY,
			true
		);
		request.onload = function () {
			var movies = JSON.parse(this.response);
			if (request.status >= 200 && request.status < 400) {
				if (movies.Response != "False") {
					setMovies(movies.Search.slice(0, 5));
				}
			} else {
				console.log("error");
			}
		};
		request.send();
	}
	function search(title: string) {
		setInput(title);
		getMovies(title);
	}
	const add = (movie: movie) => {
		setNominatedMovies((nominatedMovies) => [...nominatedMovies, movie]);
		setMovies(movies.filter((e) => e != movie));
	};
	function remove(movie: movie) {
		setNominatedMovies(nominatedMovies.filter((e) => e != movie));
	}
	return (
		<AppProvider
			i18n={{}}
			theme={{
				colors: {
					surface: "#111213",
					onSurface: "#111213",
					interactive: "#2e72d2",
					secondary: "#111213",
					primary: "#3b5998",
					critical: "#d82c0d",
					warning: "#ffc453",
					highlight: "#5bcdda",
					success: "#008060",
					decorative: "#ffc96b",
				},
			}}
		>
			<Page>
				<div style={{ marginLeft: width > 600 ? 0 : 10 }}>
					<DisplayText size="medium">
						<TextStyle variation="strong">Movie Search App</TextStyle>
					</DisplayText>
				</div>

				<div
					style={{
						marginBlock: 10,
						width: width > 600 ? 1000 : 350,
						marginLeft: width > 600 ? 0 : 10,
					}}
				>
					<TextField
						type="text"
						label=""
						placeholder="Search for title"
						value={Input}
						onChange={(value) => search(value)}
					></TextField>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: width > 600 ? "row" : "column",
						width: width > 600 ? 1000 : 350,
						marginBlock: 10,
						marginLeft: width > 600 ? 0 : 10,
					}}
				>
					<div
						style={{ display: "flex", flexDirection: "column", width: 500 }}
						className="queried-movie-list"
					>
						<Heading>Results for: {Input}</Heading>
						{movies.map((movie, index) => (
							<div key={index} onClick={() => add(movie)}>
								<MovieCard
									key={index}
									movie={movie}
									buttonText="Select"
								></MovieCard>
							</div>
						))}
					</div>
					<div
						style={{ display: "flex", flexDirection: "column", width: 500 }}
						className="nominated-movie-list"
					>
						<Heading>Nominations:</Heading>
						{nominatedMovies.map((movie, index) => (
							<div key={index} onClick={() => remove(movie)}>
								<MovieCard
									key={index}
									movie={movie}
									buttonText="Remove"
								></MovieCard>
							</div>
						))}
					</div>
				</div>
			</Page>
		</AppProvider>
	);
}

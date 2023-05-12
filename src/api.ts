export const API_KEY = "80f770ab394bc4a45cdcf0d5a157354e";
export const BASE_PATH = `https://api.themoviedb.org/3`;
export const NOW_PLAYING_MOVIE = `${BASE_PATH}/movie/now_playing`;

interface IMovieApiProps extends Record<string, string> {
	language: string;
	region: string;
	page: string;
	api_key: string;
}

export async function getMovies() {
	const paramsObj = {
		language: "en-US",
		region: "kr",
		page: "1",
		api_key: API_KEY,
	};
	return await (
		await fetch(
			`${NOW_PLAYING_MOVIE}?${new URLSearchParams(paramsObj).toString()}`
		)
	).json();
}

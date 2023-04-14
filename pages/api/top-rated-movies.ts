import type { NextApiRequest, NextApiResponse } from 'next';

import { Movie } from '@/types/movie';

const API_KEY = process.env.API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const decade = req.query.decade as string;
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1&include_adult=false&primary_release_date.gte=${decade.split(',')[0]}&primary_release_date.lte=${decade.split(',')[1]}`;

    const response = await fetch(url, { next: { revalidate: 10000 } });
    if (!response.ok)
        throw new Error("Failed to fetch data");

    const data = await response.json();
    const movies: Movie[] = data.results
        .filter((movie: any) => movie.vote_count >= 500)
        .map((movie: any) => ({
            ID: movie.id,
            Title: movie.title,
            Year: movie.release_date.substring(0, 4),
            Rating: movie.vote_average.toFixed(1),
            Votes: movie.vote_count,
            Overview: movie.overview,
            Image_path: movie.poster_path,
        }));

    res.status(200).json(movies);
}
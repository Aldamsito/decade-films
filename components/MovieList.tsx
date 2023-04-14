import React, { memo, useMemo } from 'react';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

import movieStyles from './MovieList.module.css'

import { Movie } from '@/types/movie';

type MovieListProps = {
  decadeData: { decade: string; data: Movie[] }[];
};

function MovieList({ decadeData }: MovieListProps) {
  console.log('MovieList rendered');

  const list = useMemo(() => decadeData.reverse().map((decade) => (
    <div key={decade.decade}>
      <h1>{decade.decade.replace(',', ' - ')}</h1>
      <ul>
        {decade.data.map((movie: Movie, index) => (
          <li key={movie.ID}>
            <h2 className={movieStyles.movietitle}>{(index + 1).toString().padEnd(2, '\u00A0')} - {movie.Title}, {movie.Year}</h2>
            <div className={movieStyles.movie}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.Image_path}`}
                width={100}
                height={60}
                className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
                placeholder="blur"
                blurDataURL="/spinner.svg"
                alt="image is not available"
              />
              <div className={movieStyles.movieinfo}>
                <p className={movieStyles.moviedetails}> Avg. Ratings: {movie.Rating} </p>
                <p className={movieStyles.moviedetails}> Vote count:{movie.Votes}</p>
                <p className={movieStyles.moviedescription}> {movie.Overview}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )), [decadeData]);

  return (<div>{list}</div>);
}

MovieList.displayName = 'MovieList';

export default MovieList;
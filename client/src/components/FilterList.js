import React, { useEffect, useState } from 'react';
import FilterListItem from './FilterListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  filterList: {
    textAlign: 'center',
  },
  title: {
  }
}));

export default function Filter(props) {
  const classes = useStyles();


  const filterByGenre = (arr) => {
    console.log(arr);
  }

  // const genreArray = props.songsByGenre;
  // console.log(genreArray);
  console.log(props.songs)

  const list = props.songs.songs_by_genre.map((genre, index) => {
    return (
        <FilterListItem
          key={index}
          genreName={genre}
          handleFilter={filterByGenre}
        />
    );
  });

  return (
    <div className={classes.filterList}>
      <ul>
        {list}
        <FilterListItem
          genreName='All'
        />
      </ul>
    </div>
  );
}

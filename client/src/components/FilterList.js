import React, { useEffect, useState } from 'react';
import FilterListItem from './FilterListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
}));

export default function Filter(props) {
  const classes = useStyles();

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (props.songs && props.songs !== {}) {
      setGenres(Object.keys(props.songs.songs_by_genre));
    }
  }, [props.songs])

  const filterByGenre = (arr) => {
    console.log('Clicked on genre chip');
  }

  const list = genres.map((genre, index) => {
    return (
        <FilterListItem
          key={index}
          genreName={genre}
          handleFilter={filterByGenre}
        />
    );
  });

  return (
    <div className={classes.root}>
      <ul>
        {list}
        <FilterListItem
          genreName='All'
        />
      </ul>
    </div>
  );
}

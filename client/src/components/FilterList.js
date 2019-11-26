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
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (props.songs && props.songs !== {}) {
      setGenres(Object.keys(props.songs.songs_by_genre));
    }
  }, [props.songs])

  const filterByGenre = (arr) => {
    console.log(arr);
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

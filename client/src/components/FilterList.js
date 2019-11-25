import React, { useEffect, useState } from 'react';
import FilterListItem from './FilterListItem';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles(theme => ({
  filterList: {
    textAlign: 'center'
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const [genres, setGenre] = useState([]);

  useEffect(() => {
    if (props.songsByGenre) {
      const array = Object.keys(props.songsByGenre);
      setGenre(array);
    }
  }, [props.songsByGenre])

  const list = genres.map((genre, index) => {
    return (
        <FilterListItem
          key={index}
          genreName={genre}
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

import React from 'react';
import GenreFilterListItem from './GenreFilterListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
  },
}));

export default function Filter(props) {
  const classes = useStyles();

  // map over keys of songsByGenres object to render genre chips
  const list = Object.keys(props.songsByGenre).map((genre, index) => {
    return (
        <GenreFilterListItem
          key={index}
          genreName={genre}
          selected={props.value.includes(genre) ? true : false}
          filterByGenre={() => props.onChange(genre)}
        />
    );
  });

  return (
    <div className={classes.root}>
      <ul>
        {list}
      </ul>
    </div>
  );
}

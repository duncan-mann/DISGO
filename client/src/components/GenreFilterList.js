import React from 'react';
import GenreFilterListItem from './GenreFilterListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: 'transparent',
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
        <GenreFilterListItem genreName='All'/>
      </ul>
    </div>
  );
}

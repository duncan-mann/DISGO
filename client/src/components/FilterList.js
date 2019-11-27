import React from 'react';
import FilterListItem from './FilterListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
}));

export default function Filter(props) {
  const classes = useStyles();

  // map over keys of songsByGenres object to render genre chips
  const list = Object.keys(props.songsByGenre).map((genre, index) => {
    return (
        <FilterListItem
          key={index}
          genreName={genre}
          selected={props.value[genre] ? true : false}
          filterByGenre={() => props.onChange(genre)}
        />
    );
  });

  return (
    <div className={classes.root}>
      <ul>
        {list}
        <FilterListItem genreName='All'/>
      </ul>
    </div>
  );
}

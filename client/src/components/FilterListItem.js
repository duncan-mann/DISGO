import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles(theme => ({
  filterMargin: {
    margin: theme.spacing(1),
  },
  filterIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FilterListItem(props) {
  const classes = useStyles();

  return (
    <span onClick={() => props.handleFilter(props.genreName)} className='FilterListItem'>
      <Fab
        variant="extended"
        size="medium"
        color='secondary'
        aria-label="pick-genre"
        className={classes.filterMargin}
      >
        <MusicNoteIcon className={classes.filterIcon} />
        {props.genreName}
      </Fab>
    </span>
  );
}

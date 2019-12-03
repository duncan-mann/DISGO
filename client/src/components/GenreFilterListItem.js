import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

const useStyles = makeStyles(theme => ({
  genre_item: {
    color: 'white',
    borderColor: theme.palette.primary.light,
    fontSize: '0.8em',
    fontWeight: 'bold',
    padding: '1.2em',
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: 'white !important',
      color: 'black'
    }
  },
  genre_item_selected: {
    color: 'black',
    borderColor: theme.palette.primary.light,
    backgroundColor: 'white !important',
    fontSize: '0.8em',
    padding: '1.2em',
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: 'transparent !important',
      color: 'white'
    }
  }
}));

export default function FilterListItem(props) {
  const classes = useStyles();

  return (
      <Chip
        className={props.selected ? classes.genre_item_selected : classes.genre_item}
        size="small"
        icon={<MusicNoteIcon />}
        label={props.genreName}
        onClick={props.filterByGenre}
        clickable
        color='secondary'
        variant="outlined"
      />
  );
}

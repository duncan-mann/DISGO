import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
// import Fab from '@material-ui/core/Fab';
import MusicNoteIcon from "@material-ui/icons/MusicNote";

const useStyles = makeStyles(theme => ({
  chip: {
    color: 'white',
    borderColor: 'white',
    fontSize: 14,
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: 'white !important',
      color: 'black'
    }
  }
}));

export default function FilterListItem(props) {
  const classes = useStyles();

  return (
      <Chip
        className={classes.chip}
        size="small"
        icon={<MusicNoteIcon />}
        label={props.genreName}
        onClick={props.handleFilter}
        clickable
        color='secondary'
        variant="outlined"
      />
  );
}

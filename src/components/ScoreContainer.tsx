import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type ScoreType = {
  score: number;
  isDarkMode: boolean;
};

export default function ScoreContainer({ score, isDarkMode }: ScoreType) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      score: {
        backgroundColor: isDarkMode
          ? theme.palette.secondary.dark
          : theme.palette.primary.dark,
        fontSize: '20px',
        marginLeft: '20px',
      },
    }),
  );

  const classes = useStyles();
  return <div className={classes.score}>score: {score}</div>;
}

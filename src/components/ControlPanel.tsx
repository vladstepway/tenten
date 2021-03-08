import React from 'react';
import { createStyles, makeStyles, Switch, Theme } from '@material-ui/core';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

interface ControlPanelType {
  onRestartClick(): void;
  onThemeChange(): void;
  onMusicTurn(): void;
  isMusicOn: boolean;
  isDarkMode: boolean;
}

export default function ControlPanel({
  onRestartClick,
  onThemeChange,
  isDarkMode,
  isMusicOn,
  onMusicTurn,
}: ControlPanelType) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      newGameButton: {
        padding: '3px',
        fontWeight: 600,
        borderRadius: '4px',
        marginLeft: '20px',
        marginRight: '20px',
        color: 'white',
        cursor: 'pointer',
      },
      link: {
        padding: '20px',
        color: isDarkMode
          ? theme.palette.primary.dark
          : theme.palette.secondary.dark,
      },
    }),
  );

  const classes = useStyles();

  const musicIcon = isMusicOn ? <MusicNoteIcon /> : <MusicOffIcon />;
  return (
    <div>
      <Switch
        color={'secondary'}
        checked={isDarkMode}
        onChange={onThemeChange}
      />
      <IconButton
        aria-label="delete"
        color="primary"
        className={classes.newGameButton}
        onClick={onRestartClick}
      >
        <AutorenewIcon />
      </IconButton>
      <ToggleButton
        color={'primary'}
        value="check"
        selected={isMusicOn}
        onChange={onMusicTurn}
      >
        {musicIcon}
      </ToggleButton>
      <Link
        href={'https://github.com/vladstepway/tenten'}
        target={'_blank'}
        rel={"noreferrer"}
        className={classes.link}
      >
        <GitHubIcon />
      </Link>
    </div>
  );
}

import SimpleBarReact from 'simplebar-react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';
import { useRef, useEffect } from 'react';
import Color from 'color';

const PlayList = ({
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  theme
}) => {
  const simpleBarRef = useRef();

  useEffect(() => {
    if (simpleBarRef.current) {
      const scrollElement = simpleBarRef.current.getScrollElement();
      const listItem = scrollElement.querySelector(`[data-index="${trackIndex}"]`);
      if (listItem) {
        scrollElement.scrollTop = listItem.offsetTop;
      }
    }
  }, [trackIndex]);

  function setTrackByList(index) {
    setTrackIndex(index);
    setCurrentTrack(tracks[index]);
  }

  const endColor = theme.palette.primary.main;
  const startColor = Color(endColor).lighten(0.5).hex();

  return (
    <>
      <style>
        {`
          .simplebar-track.simplebar-vertical {
            background: linear-gradient(${startColor}, ${endColor});
          }
        `}
      </style>

      <div style={{ width: '240px' }}>
        <SimpleBarReact className="my-simplebar-style" style={{ maxHeight: '420px' }} ref={simpleBarRef}>
          <List>
            {tracks.map((track, index) => (
              <ListItem button key={index} onClick={() => setTrackByList(index)}
                className="listItem"
                style={{ backgroundColor: trackIndex === index ? 'rgb(35, 35, 35)' : 'transparent' }}
                data-index={index}
              >
                <ListItemAvatar>
                  <Avatar src={track.thumbnail} alt={track.title} />
                </ListItemAvatar>
                <ListItemText
                  primary={track.title}
                  secondary={track.author}
                  secondaryTypographyProps={{ color: 'primary' }}
                />
              </ListItem>
            ))}
          </List>
        </SimpleBarReact>
      </div>
    </>
  );
}

export default PlayList;

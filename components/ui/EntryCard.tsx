import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { UIContext } from '../../context/ui/UIContext';
import { Entry } from '../../interfaces';

import moment from 'moment';
import 'moment/locale/es';  // Esto es opcional y ajustará la localización a español


interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);
  
    const onDragStart = (event: DragEvent) => {
      event.dataTransfer.setData('text', entry._id);
      startDragging();
    };
  
    const onDragEnd = () => {
      endDragging();
    };
  
    // Calcula la diferencia de tiempo
    const timeDifference = () => {
      const createdAt = moment(entry.createdAt);
      const now = moment();
      const duration = moment.duration(now.diff(createdAt));
      
      // Puedes personalizar la presentación del tiempo según tus necesidades
      if (duration.asMinutes() < 1) {
        return 'hace unos segundos';
      } else if (duration.asHours() < 1) {
        return `hace ${Math.round(duration.asMinutes())} minutos`;
      } else if (duration.asDays() < 1) {
        return `hace ${Math.round(duration.asHours())} horas`;
      } else {
        return `hace ${Math.round(duration.asDays())} días`;
      }
    };
  
    return (
      <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
          </CardContent>
  
          <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
            {/* Mostrar el tiempo real */}
            <Typography variant='body2'>{timeDifference()}</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  };
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';

type Props = {
  title: string;
  avatar: any;
  email: string;
  createdDate: any;
  status: boolean;
};

export default function CustomCard({
  title,
  avatar,
  email,
  createdDate,
  status,
}: Props) {
  return (
    <Card
      sx={{ maxWidth: 300, maxHeight: '100%' }}
      className="border-0 shadow-lg"
    >
      <CardActionArea>
        {avatar ? (
          <Avatar
            className="avatar m-2 flex flex-row items-center"
            sx={{
              bgcolor: '#1D1D1D',
              width: 50,
              height: 50,
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          >
            {avatar}
          </Avatar>
        ) : (
          <Avatar
            className="avatar m-2 flex flex-row items-center"
            sx={{
              bgcolor: '#1D1D1D',
              width: 50,
              height: 50,
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <div className="avatar flex flex-row items-center">
              <div className="flex flex-col items-start justify-start">
                <span className="text-sm font-semibold">{title}</span>
                <span className="text-xs font-normal text-secondary">
                  {dayjs(createdDate).isValid()
                    ? dayjs(createdDate)?.format('MMMM DD, YYYY')
                    : '--'}
                </span>
              </div>
            </div>
          </Typography>
          <div>
            <p className="text-sm font-bold text-secondary">Email</p>
            <span className="text-sm font-normal text-secondary">{email}</span>
          </div>
          <div>
            {status ? (
              <span className="badge badge-success">ACTIVE</span>
            ) : (
              <span className="badge badge-danger">INACTIVE</span>
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

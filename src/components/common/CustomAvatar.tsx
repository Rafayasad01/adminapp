import React from 'react';
import Avatar from '@mui/material/Avatar';

type Props = {
  backgroundColor?: string;
  firstName: string;
  lastName: string;
  classname?: string;
};

function CustomAvatar({
  firstName,
  lastName,
  backgroundColor,
  classname,
}: Props) {
  return (
    <Avatar
      className={`avatar flex flex-row items-center ${classname && classname}`}
      sx={{
        bgcolor: backgroundColor || '#1D1D1D',
        width: 35,
        height: 35,
        textTransform: 'uppercase',
        fontSize: '14px',
        marginRight: '10px',
      }}
    >
      {firstName?.charAt(0)}
      {lastName?.charAt(0)}
    </Avatar>
  );
}

export default CustomAvatar;

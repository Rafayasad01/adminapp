import Avatar from '@mui/material/Avatar';
import cn from '../../utils/class-names';

type CustomAvatarProps = {
  backgroundColor?: string;
  firstName: string;
  lastName: string;
  className?: string;
};

function CustomAvatar({
  firstName,
  lastName,
  backgroundColor,
  className,
}: CustomAvatarProps) {
  return (
    <Avatar
      className={cn(`avatar flex flex-row items-center`, className)}
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

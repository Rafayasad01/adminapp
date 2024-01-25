import Avatar from '@mui/material/Avatar';
import StarBadgeGreen from '../icons/StarBadgeGreen';
import StarBadgeRed from '../icons/StarBadgeRed';

type Props = {
  avatarIcon: any;
  title?: string;
  subTitle?: string;
  details?: any;
  center?: boolean;
  customWidth?: string;
  customHeight?: string;
  badgeText?: any;
  firstname?: string;
  lastname?: string;
  isactive?: boolean;
};

function CustomAvatarWithName({
  isactive,
  details,
  firstname,
  lastname,
  avatarIcon,
  title,
  subTitle,
  center,
  badgeText,
}: Props) {
  const { email, role } = details;
  return (
    <div className={`${center && 'text-center'}`}>
      <div className={`flex ${center && 'justify-center'} my-2`}>
        {avatarIcon ? (
          <Avatar
            className=""
            sx={{
              bgcolor: '#1D1D1D',
              width: 45,
              height: 45,
            }}
            alt="avatar"
            src={avatarIcon}
          />
        ) : (
          <Avatar
            className="avatar flex flex-row items-center"
            sx={{
              bgcolor: '#1D1D1D',
              width: 45,
              height: 45,
              textTransform: 'uppercase',
              fontSize: '16px',
            }}
          >
            {firstname?.charAt(0)}
            {lastname?.charAt(0)}
          </Avatar>
        )}
      </div>
      <div className="flex items-center justify-center">
        <p className="pr-1 text-sm font-semibold capitalize text-secondary">
          {title}
        </p>
        <div className="">
          {isactive ? <StarBadgeGreen /> : <StarBadgeRed />}
        </div>
      </div>
      {subTitle && (
        <p className="text-xs font-normal capitalize text-[#6A6A6A]">
          {subTitle}
        </p>
      )}
      {details && (
        <div className="text-center">
          <p className="text-sm font-medium lowercase text-[#6A6A6A]">{role}</p>
          <p className="text-sm font-medium lowercase text-[#6A6A6A]">
            {email}
          </p>
        </div>
      )}
      {badgeText && (
        <div className="mt-1 flex items-center justify-center font-open-sans text-sm font-normal text-[#6A6A6A]">
          <span className="badge badge-primary">{badgeText}</span>
        </div>
      )}
    </div>
  );
}

export default CustomAvatarWithName;

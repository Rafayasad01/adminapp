import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import assets from '../../assets';

type Props = {
  link: string;
};

function CustomImageCard({ link }: Props) {
  const handleText = (text: string) => {
    return navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <img
        style={{ maxHeight: '300px', width: 'auto', margin: 'auto' }}
        className="w-full"
        src={link}
        alt="Sunset in the mountains"
      />
      <div className="" style={{ paddingTop: '4%' }}>
        <div style={{ fontWeight: 500, fontSize: '24px' }}>
          <p>Link</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '12px' }}>{link}</span>
          <IconButton
            className="icon-btn mr-3.5 p-0"
            onClick={() => handleText(link)}
          >
            <ContentCopyIcon />
          </IconButton>
        </div>
        {/* <p onClick={handleText} style={{ fontSize: "14px" }}>
                    https://i.ibb.co/NCnSh4g/fb.png
                </p> */}
      </div>
    </div>
  );
}

export default CustomImageCard;

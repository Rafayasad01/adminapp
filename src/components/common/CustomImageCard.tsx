import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

type Props = {
  link: string;
  header: string;
};

function CustomImageCard({ link, header }: Props) {
  const handleText = (text: string) => {
    return navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div style={{ width: '100%', height: '200px' }}>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <p style={{ fontWeight: 500, fontSize: '24px' }}>{header}</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
          }}
        >
          <img
            style={{ maxHeight: '150px', width: 'auto', margin: 'auto' }}
            className="w-full"
            src={link}
            alt=""
          />
        </div>
      </div>
      <div className="" style={{ paddingTop: '1%' }}>
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
      </div>
    </div>
  );
}

export default CustomImageCard;

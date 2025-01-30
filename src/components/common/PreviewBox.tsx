import Dialog from '@mui/material/Dialog';

const ImagePreview = ({
  open,
  setOpen,
  src,
}: {
  open: boolean;
  setOpen: any;
  src: string;
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen({ state: !open })}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content">
        <div className="flex items-center justify-center">
          <a href={src} rel="noopener noreferrer">
            <img
              alt="preview"
              src={src}
              className="min-w-[40%] max-w-[100%] object-contain"
            />
          </a>
        </div>
      </div>
    </Dialog>
  );
};

export default ImagePreview;

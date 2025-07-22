import Dialog from '@mui/material/Dialog';
import { useEffect, useRef } from 'react';

const ImagePreview = ({
  open,
  setOpen,
  src,
}: {
  open: boolean;
  setOpen: any;
  src: string;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (open && imageRef.current) {
      const img = imageRef.current;

      // Delay fullscreen to ensure DOM is mounted
      setTimeout(() => {
        if (img.requestFullscreen) {
          img.requestFullscreen().catch(() => {});
        } else if ((img as any).webkitRequestFullscreen) {
          (img as any).webkitRequestFullscreen();
        } else if ((img as any).msRequestFullscreen) {
          (img as any).msRequestFullscreen();
        }
      }, 300);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen({ state: false, source: '' })}
      PaperProps={{
        className: 'Dialog',
        style: {
          minWidth: '1345px',
          minHeight: '645px',
        },
      }}
    >
      <div className="Content">
        <div className="flex items-center justify-center">
          <img
            ref={imageRef}
            alt="preview"
            src={src}
            className="min-w-[100%] max-w-[100%] cursor-pointer object-cover"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ImagePreview;

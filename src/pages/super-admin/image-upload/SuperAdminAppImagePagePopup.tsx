import React from 'react';
import Dialog from '@mui/material/Dialog';
import CustomImageCard from '../../../components/common/CustomImageCard';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  link: string;
};

function SuperAdminAppImagePagePopup({
  openDialog,
  setOpenDialog,
  link,
}: Props) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        className: 'p-4',
      }}
    >
      <div className="Content">
        <CustomImageCard header="Image Details" link={link} />
      </div>
      {/* <div className="Content Main-Content">
                <span className="Heading">{heading}</span>
                <div className="Content-Table" style={{ overflowY: 'auto' }}>
                    <table className="table-border table-auto">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list &&
                                list.map((item: any, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.image}</td>
                                            <td>{item.link}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <div style={{ paddingBottom: '10px' }} />
            </div> */}
    </Dialog>
  );
}

export default SuperAdminAppImagePagePopup;

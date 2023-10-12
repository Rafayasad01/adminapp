import React from 'react';
import Dialog from '@mui/material/Dialog';

type Props = {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  list: any;
};

function SuperAdminPermissionPagePopup({
  openDialog,
  setOpenDialog,
  heading,
  list,
}: Props) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      PaperProps={{
        className: 'Dialog width90p',
        style: {
          maxWidth: '100%',
          minHeight: '50px',
          maxHeight: 'calc(100vh - 80px)',
          height: 'auto',
        },
      }}
    >
      <div className="Content Main-Content">
        <span className="Heading">{heading}</span>
        <div className="Content-Table" style={{ overflowY: 'auto' }}>
          <table className="table-border table-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
                <th>Sequence</th>
                <th>Type</th>
                <th>Show On Menu</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.desc}</td>
                      <td>{item.action}</td>
                      <td>{item.permissionSequence}</td>
                      <td>{item.permissionType}</td>
                      <td>
                        {item.showOnMenu ? (
                          <span className="badge badge-success">ON</span>
                        ) : (
                          <span className="badge badge-danger">OFF</span>
                        )}
                      </td>
                      <td>
                        {item.isActive ? (
                          <span className="badge badge-success">ENABLED</span>
                        ) : (
                          <span className="badge badge-danger">DISABLED</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ paddingBottom: '10px' }} />
      </div>
    </Dialog>
  );
}

export default SuperAdminPermissionPagePopup;

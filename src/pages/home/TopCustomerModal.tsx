import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import assets from '../../assets';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

function TopCustomerModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal w-30">
        <div className="modal-header">
          <div className="header-heading-box">
            <span className="modal-heading">Top Customers</span>
          </div>
          <div className="header-close-btn">
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>
        <hr className="divider horizontal" style={{ margin: '0.625rem 0' }} />
        <div className="modal-body">
          <div className="custom-box">
            <table className="avatar-table mt-3 w-full table-auto">
              <thead>
                <tr>
                  <th>Customers</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="avatar">
                      <img src={assets.images.avatarUser2} alt="" /> Megan Chang
                    </span>
                  </td>
                  <td>$500.00</td>
                </tr>
                <tr>
                  <td>
                    <span className="avatar">
                      <img src={assets.images.avatarUser2} alt="" /> Megan Chang
                    </span>
                  </td>
                  <td>$500.00</td>
                </tr>
                <tr>
                  <td>
                    <span className="avatar">
                      <img src={assets.images.avatarUser2} alt="" /> Megan Chang
                    </span>
                  </td>
                  <td>$500.00</td>
                </tr>
                <tr>
                  <td>
                    <span className="avatar">
                      <img src={assets.images.avatarUser2} alt="" /> Megan Chang
                    </span>
                  </td>
                  <td>$500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TopCustomerModal;

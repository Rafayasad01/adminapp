import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

function TodayOrderModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal w-50">
        <div className="modal-header">
          <div className="header-heading-box">
            <span className="modal-heading">Today’s Orders</span>
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
            <table className="mt-3 w-full table-auto">
              <thead>
                <tr className="even:text-left">
                  <th>Order Number</th>
                  <th>Name</th>
                  <th>Pick Date & Time</th>
                  <th>Drop Date & Time</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-primary">Order Placed</span>
                  </td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-success">Order Pickup</span>
                  </td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-purple">Out for Delivery</span>
                  </td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-primary">Order Placed</span>
                  </td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-success">Order Pickup</span>
                  </td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>22:16 , 09-01-2020</td>
                  <td>22:16 , 09-01-2020</td>
                  <td className="text-sm font-semibold">$50.00</td>
                  <td>
                    <span className="badge badge-purple">Out for Delivery</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TodayOrderModal;

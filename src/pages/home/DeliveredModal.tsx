import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

import assets from '../../assets';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

function DeliveredModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal w-60">
        <div className="modal-header">
          <div className="header-heading-box">
            <img src={assets.images.iconDeliveredToday} alt="" />
            <span className="modal-heading">Delivered Today</span>
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
                  <th>Driver</th>
                  <th>Drop Date & Time</th>
                  <th>Address</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
                <tr className="odd:bg-light-gray">
                  <td className="text-sm font-semibold">123456789</td>
                  <td>Andy Johnson</td>
                  <td>10 : 00 PM, 2 Jan, 2023</td>
                  <td>2100 W Cleveland Ave, Madera, CA 93637, United States</td>
                  <td className="text-sm font-semibold">$50.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeliveredModal;

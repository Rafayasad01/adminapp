import React from 'react';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import ChatIcon from '../../components/icons/ChatIcon';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import '../../assets/css/PopupStyle.css';
import assets from '../../assets/index';
import SendIcon from '../../components/icons/SendIcon';

type Props = {
  openChatPopup: boolean;
  setOpenChatPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
function ComplainsChatPopup({ openChatPopup, setOpenChatPopup }: Props) {
  const handleClose = () => setOpenChatPopup(false);
  return (
    <Dialog
      open={openChatPopup}
      onClose={handleClose}
      PaperProps={{
        className: 'Dialog',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className="Content Chat">
        <div className="ChatHeader">
          <IconButton className="BackBtn">
            <BackArrowIcon />
          </IconButton>
          <div className="HeaderInfoBox">
            <img
              className="HeaderLogo"
              src={assets.tempImages.avatarUrLaundry}
              alt=""
            />
            <div className="HeaderInfo">
              <div className="HeaderDetails">
                <span className="HeaderHeading">URLAUNDRY</span>
                <span className="HeaderCurrentTxt">Typing...</span>
              </div>
              <span className="HeaderStatusCircle GreenColor">&nbsp;</span>
            </div>
          </div>
          <ChatIcon />
        </div>
        <hr className="divider horizontal" style={{ margin: '1rem 0' }} />
        <div className="ChatContent">
          <div className="DateStyle">Yesterday, 23 Feb, 2023</div>
          <div className="ChatLeftBox">
            <img
              className="ChatLogo"
              src={assets.tempImages.avatarUrLaundry}
              alt=""
            />
            <div className="ChatDetails">
              <span className="ChatTxt">
                The storage is full we haven’t the space for add more clients
                kindly please exceed my limit 20 percent now.
              </span>
              <span className="ChatTime">10:27 PM</span>
            </div>
          </div>
          <div className="ChatRightBox">
            <div className="ChatDetails">
              <span className="ChatTxt">
                Yes we will do that you have to wait until it’s done okay ?
              </span>
              <span className="ChatTime">10:29 PM</span>
            </div>
          </div>
          {/* <div className="ChatLeftBox">
            <img
              className="ChatLogo"
              src={assets.tempImages.avatarUrLaundry}
              alt=""
            />
            <div className="ChatDetails">
              <span className="ChatTxt">
                How much time or day it will take ???
              </span>
              <span className="ChatTime">11:27 PM</span>
            </div>
          </div> */}
        </div>
        <div className="ChatFooter">
          <div className="ChatTextarea">
            <FormControl className="FormControl" variant="standard">
              <TextField
                className="FormTextarea NoBorder"
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue=""
                placeholder="Write Here"
              />
            </FormControl>
          </div>
          <hr className="divider horizontal" style={{ margin: '0.25rem 0' }} />
          <div className="ChatBtnBox">
            <div className="ChatBtnLeftBox">
              <IconButton
                sx={{
                  background: '#C9C9C9',
                  borderRadius: '50%',
                  padding: '8px',
                  marginRight: '5px',
                }}
              >
                <AddOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  background: '#C9C9C9',
                  borderRadius: '50%',
                  padding: '8px',
                }}
              >
                <LocalSeeOutlinedIcon />
              </IconButton>
            </div>
            <div className="ChatBtnRightBox">
              <hr
                className="divider vertical"
                style={{ margin: '0.25rem 0' }}
              />
              <IconButton>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ComplainsChatPopup;

import { useState } from 'react';
import OTPInput from 'react18-otp-input';
import Button from '@mui/material/Button';
import assets from '../../../assets';
import styles from '../../../assets/css/AuthPage.module.css';

function OtpVerificationPage() {
  const [OTP, setOTP] = useState('');
  return (
    <div className={styles.bg}>
      <div className={styles.centerBox}>
        <img className={styles.logo} src={assets.images.logoBlack} alt="" />
        <div className={styles.midBox}>
          <div className="form-group mb-8">
            <div className={styles.txtBox}>
              <div className={styles.txt}>An 4 digit code has been sent to</div>
              <div className={styles.txt}>Vincent-bo@gmail.com</div>
            </div>
          </div>
          <div className="form-group">
            <div className={styles.verificationBox}>
              <OTPInput
                containerStyle="flex items-center gap-4"
                inputStyle={{
                  width: '3.5rem',
                  aspectRatio: '1/1',
                  borderRadius: '0.75rem',
                  outlineStyle: 'solid',
                  outlineWidth: '2px',
                  outlineColor: '#e5e5e5',
                  fontFamily: 'Open Sans',
                  fontSize: '1.25rem',
                  lineHeight: '1.75rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                }}
                focusStyle={{ outlineColor: '#18181b' }}
                numInputs={4}
                onChange={(value: string) => setOTP(value)}
                separator={<span> </span>}
                isInputNum
                shouldAutoFocus
                value={OTP}
              />
            </div>
          </div>
        </div>

        <div className={`form-group ${styles.submitBtn}`}>
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerificationPage;

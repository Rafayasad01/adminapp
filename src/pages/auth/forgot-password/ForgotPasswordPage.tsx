import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import assets from '../../../assets';
import styles from '../../../assets/css/AuthPage.module.css';

function ForgotPasswordPage() {
  return (
    <div className={styles.bg}>
      <div className={styles.centerBox}>
        <img className={styles.logo} src={assets.images.logoBlack} alt="" />
        <div className={styles.midBox}>
          <div className="form-group mb-8">
            <div className={styles.txtBox}>
              <div className={styles.txt}>Enter registered email</div>
              <div className={styles.txt}>to receive password reset link</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="font-sans">
              Email
            </label>
            <FormControl className="m-1 w-full" variant="standard">
              <Input
                className="after:border-b-neutral-900"
                id="email"
                type="email"
                disableUnderline
              />
            </FormControl>
          </div>
        </div>
        <div className={`form-group ${styles.submitBtn}`}>
          <Button variant="contained">Get Code</Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

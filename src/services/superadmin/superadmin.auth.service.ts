import network from '../../utils/network';
import { SuperadminUserLogin } from '../../interfaces/superadmin/auth.interface';
import { useAppDispatch } from '../../redux/redux-hooks';
import { login } from '../../redux/features/authStateSlice';
import {setToken} from "../../utils/constants"

const loginService = (userData:SuperadminUserLogin) => {
    
    const user:any = network.post('login', userData);
    if(user.data.success){
        setToken(user.data.data.token);
        const dispatch = useAppDispatch();
        dispatch(login(user.data.data));
    }
    
    return user;
}

export default {
    loginService
}
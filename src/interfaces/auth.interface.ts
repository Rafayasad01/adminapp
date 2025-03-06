export interface UserLogin {
  identifier: string;
  password: string;
}

export interface NewPassword {
  password: string;
  confirmPassword: string;
}

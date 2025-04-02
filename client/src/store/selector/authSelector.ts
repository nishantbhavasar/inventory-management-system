import { RootState } from "../store";

const getIsLogin = (state: RootState) => state.auth.isLogin;

export { getIsLogin };

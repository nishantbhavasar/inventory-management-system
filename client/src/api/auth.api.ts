import API from "./apiHelper";

export default class AuthApi {
  public API_ROUTES: { login: string; register: string };
  public api: API;
  constructor() {
    this.api = new API();
    console.log({ api: new API() });
    this.API_ROUTES = {
      login: "/api/auth/login",
      register: "/api/auth/register",
    };
  }

  public login = async (data: any) => {
    try {
      const response = await this.api.post(this.API_ROUTES.login, { data });
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        // @ts-ignore
        message: (error?.message ?? "Something Went Wrong") as string,
        data: null,
        success: false,
      };
    }
  };

  public register = async (data: any) => {
    try {
      const response = await this.api.post(this.API_ROUTES.register, { data });
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      return {
        // @ts-ignore
        message: (error?.message ?? "Something Went Wrong") as string,
        data: null,
        success: false,
      };
    }
  };
}

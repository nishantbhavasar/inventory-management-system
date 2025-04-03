import API from "./apiHelper";

export default class CategoryApi {
  public api: API;
  API_ROUTES: {
    GET_ALL_CATEGORIES: string;
    CREATE_CATEGORY: string;
    DELETE_CATEGORY: (id: number) => string;
  };
  constructor() {
    this.api = new API();
    this.API_ROUTES = {
      GET_ALL_CATEGORIES: "/api/categories",
      CREATE_CATEGORY: "/api/categories/create",
      DELETE_CATEGORY: (id: number) => `/api/categories/${id}`,
    };
  }

  public getAllCategories = async () => {
    try {
      const response = await this.api.get(this.API_ROUTES.GET_ALL_CATEGORIES);
      if (response.success) {
        return response;
      } else {
        return {
          message: (response?.message ?? "Something Went Wrong") as string,
          data: null,
          success: false,
        };
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

  public createCategory = async (data: any) => {
    try {
      const response = await this.api.post(this.API_ROUTES.CREATE_CATEGORY, {
        data,
      });
      if (response.success) {
        return response;
      } else {
        return {
          message: (response?.message ?? "Something Went Wrong") as string,
          data: null,
          success: false,
        };
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

  public deleteCategory = async (id: number) => {
    try {
      const response = await this.api.delete(
        this.API_ROUTES.DELETE_CATEGORY(id)
      );
      if (response.success) {
        return response;
      } else {
        return {
          message: (response?.message ?? "Something Went Wrong") as string,
          data: null,
          success: false,
        };
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

import API from "./apiHelper";

export default class InventoryApi {
  public api: API;
  API_ROUTES: {
    GET_ALL_INVENTORIES: string;
    GET_INVENTORY: (id: number) => string;
    CREATE_INVENTORY: string;
    UPDATE_INVENTORY: (id: number) => string;
    DELETE_INVENTORY: (id: number) => string;
  };
  constructor() {
    this.api = new API();
    this.API_ROUTES = {
      GET_ALL_INVENTORIES: "/api/inventories",
      GET_INVENTORY: (id: number) => `/api/inventories/${id}`,
      CREATE_INVENTORY: "/api/inventories/create",
      UPDATE_INVENTORY: (id: number) => `/api/inventories/${id}`,
      DELETE_INVENTORY: (id: number) => `/api/inventories/${id}`,
    };
  }

  public getAllInventories = async (filter: any) => {
    try {
      const response = await this.api.post(
        this.API_ROUTES.GET_ALL_INVENTORIES,
        { data: filter }
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

  public getInventory = async (id: number) => {
    try {
      const response = await this.api.get(this.API_ROUTES.GET_INVENTORY(id));
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

  public createInventory = async (data: any) => {
    try {
      const response = await this.api.post(this.API_ROUTES.CREATE_INVENTORY, {
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

  public updateInventory = async (id: number, data: any) => {
    try {
      const response = await this.api.put(
        this.API_ROUTES.UPDATE_INVENTORY(id),
        { data }
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

  public deleteInventory = async (id: number) => {
    try {
      const response = await this.api.delete(
        this.API_ROUTES.DELETE_INVENTORY(id)
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

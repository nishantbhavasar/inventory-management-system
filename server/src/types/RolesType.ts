export default interface RolesAttribute {
  id?: number;
  role?: string;
}

export interface PermissionsAttribute {
    id?:number;
    permission?:string;
}

export interface RolePermissionAttribute {
  role_id?:number;
  permission_id?:number;
}
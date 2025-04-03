import { Request, Response, NextFunction } from "express";
import RolePermission from "../db/models/role_permission.model";
import Permission from "../db/models//permissions.model";

export const checkPermission = (requiredPermission: string) => {
    return async (req: any, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = req?.user;

            if (!user || !user.role_id) {
                next({
                    message: "Access denied",
                    status: 403,
                })
                return;
            }

            const rolePermissions = await RolePermission.findAll({
                where: { role_id: user.role_id },
                include: [{ model: Permission }],
            });

            const permissions = rolePermissions.map((rp) => rp.Permission?.dataValues?.permission);

            if (!permissions.includes(requiredPermission)) {
                next({
                    message: "You do not have permission to access this route",
                    status: 403,
                })
                return;
            }

            next();
        } catch (error) {
            console.error("Error in RBAC middleware:", error);
            next({
                message: (error as any).message,
                status: 500,
            })
        }
    };
};

export const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // e.g., 10MB in bytes
export const PERMISSIONS = {
    INVENTORY: {
      READ: "READ:INVENTORY",
      CREATE: "CREATE:INVENTORY",
      UPDATE: "UPDATE:INVENTORY",
      DELETE: "DELETE:INVENTORY",
    },
  } as const;
  
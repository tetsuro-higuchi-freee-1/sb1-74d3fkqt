export type UserRole = 'sales' | 'product_manager' | 'product_owner';

export interface Permission {
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canEditPublicStatus: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}

export const rolePermissions: Record<UserRole, Permission> = {
  sales: {
    canView: true,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canEditPublicStatus: false
  },
  product_manager: {
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canEditPublicStatus: false
  },
  product_owner: {
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canEditPublicStatus: true
  }
};
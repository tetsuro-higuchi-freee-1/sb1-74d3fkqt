export interface ProductMaster {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductMasterFormData {
  name: string;
  description: string;
}
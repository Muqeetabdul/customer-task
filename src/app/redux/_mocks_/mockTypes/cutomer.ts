export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  gender: string;
  status: number;
  dateOfBbirth: string;
  ipAddress: string;
  type: number;
  _userId?: number;
  _createdDate?: string;
  _updatedDate?: string;
}

export interface CustomerFilter {
  // filter?: {
  //   lastName?: string;
  //   firstName?: string;
  //   email?: string;
  //   ipAddress?: string;
  // };
  // sortOrder: "asc" | "desc";
  // sortField: "id" | "email" | "firstName" | "lastName";
  // pageNumber: number;
  // pageSize: 10 | 20 | 30 | 40;
  limit?: number;
  page?: number;
  totalPages?: number;
  totalResults?: number;
}

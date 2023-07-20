import { Model, ObjectId } from "mongoose";

interface CustomerDocument {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  userName?: string;
  status: string;     
  gender: string;   
  dateOfBirth: string;    
  ipAddress: string;
  type: string;
  _userId?: number;
  _createdDate?: string;
  _updatedDate?: string;
}

interface CustomerModel extends Model<CustomerDocument> {
  isEmailTaken(email: string, excludeUserId?: ObjectId): boolean;
  toJSON(schema: any): void;
  paginate(filter: any, options: any): any;
}

export { CustomerModel, CustomerDocument };

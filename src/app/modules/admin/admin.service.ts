/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import config from '../../../config';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateAdminId } from './admin.util';




const getAllAdmins = async () => {
  const result = await Admin.find({});
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};


const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const result = await Admin.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};



const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};


const createAdmin = async (admin: IAdmin) => {
  if (!admin.password) {
    admin.password = config.default_user_pass as string;
  }
  const id = await generateAdminId();
  admin.id = id;
  admin.role = "admin"

  const createdAdmin = await Admin.create(admin);
  const { password, ...result } = createdAdmin.toObject();
  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  createAdmin,
};

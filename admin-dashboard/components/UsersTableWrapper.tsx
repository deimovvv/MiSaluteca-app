"use client";

import BasicLayoutAdmin from "../layout/BasicLayoutAdmin";
import UsersTable from "./UsersTable";
import { UsersResponse } from "../server-actions/get-users";

interface UsersTableWrapperProps {
  initialData: UsersResponse;
  usersPerPage?: number;
}

const UsersTableWrapper = ({
  initialData,
  usersPerPage = 20,
}: UsersTableWrapperProps) => {
  return (
    <BasicLayoutAdmin>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="display-6 mb-3">Gestión de Usuarios</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <UsersTable initialData={initialData} usersPerPage={usersPerPage} />
          </div>
        </div>
      </div>
    </BasicLayoutAdmin>
  );
};

export default UsersTableWrapper;

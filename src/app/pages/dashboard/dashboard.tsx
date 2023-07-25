import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Dropdown, Table } from "react-bootstrap";
import * as authActions from "../../redux/auth/authActions";
import * as customerActions from "../../redux/cutomer/customerActions";
import CustomerModal from "../../components/shared/Modals/CustomerModal";
import DeleteCustomer from "../../components/shared/Modals/DeleteModal";
import SelectInput from "../../components/form/Select";
import "./dashboard.scss";

const Dashboard = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { customers } = useSelector((state: any) => state.customer);
  const { totalPages } = useSelector((state: any) => state.customer);
  const { totalResults } = useSelector((state: any) => state.customer);

  const [selectedRows, setSelectedRows] = useState(3);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(3);
  const firstIndex = (page - 1) * recordsPerPage;
  const lastIndex = page * recordsPerPage;
  const Customers_List = customers?.slice(firstIndex, lastIndex);

  const [search, setSearch] = useState<string | undefined>("");
  const [type, setType] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const [show_Customer_Modal, setShow_Customer_Modal] = useState(false);
  const [show_Delete_Modal, setShow_Delete_Modal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>(0);

  const [customerForUpdate, setCustomerForUpdate] = useState<any>();

  let rows: any[] = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  //To change no of rows of Customers according to selected rows
  useEffect(() => {
    setrecordsPerPage(selectedRows);
  }, [selectedRows]);

  //To show only (one record per page) & (total no of pages) in mobile view
  useEffect(() => {
    if (window.screen.width <= 600) {
      setrecordsPerPage(1);
    }
  }, []);

  //To handle Add/Update Customers logics
  const handleCustomer = (data: any) => {
    // Update Customer
    if (data.id) {
      dispatch(customerActions.customerUpdate(data));
      setShow_Customer_Modal(false);
    } else {
      //adding new customer
      dispatch(customerActions.customerAdd(data));
      setShow_Customer_Modal(false);
    }
  };

  const logout = () => {
    dispatch(authActions.logout());
  };

  // ** Customer Modal => call
  const newCustomer = (id: any) => {
    if (id === undefined) {
      setShow_Customer_Modal((current) => !current);
      setCustomerForUpdate(undefined);
    } else {
      let customerForEdit: any = Customers_List?.find(
        (item: any) => item.id === id
      );
      if (customerForEdit) {
        setCustomerForUpdate({ ...customerForEdit });
        setShow_Customer_Modal(true);
      }
    }
  };

  // ** Delete Modal => Open & set ID
  const handleDelete = (id: any) => {
    setShow_Delete_Modal((current) => !current);
    setDeleteId(id);
  };

  // ** DELETE API
  const handleDeleteSubmit = () => {
    if (deleteId) {
      dispatch(customerActions.customerDelete(deleteId));
      setShow_Delete_Modal(false);
      setDeleteId(undefined);
    }
  };

  // ** To get and filter customers
  useEffect(() => {
    const queryParams = {
      type: type,
      status: status,
      search: search,
      pageNumber: page,
      pageSize: selectedRows,
    };
    dispatch(customerActions.getCustomers(queryParams));
  }, [type, status, search, selectedRows, page]);

  const getRowNumber = (indexOnPage: number) => {
    return (page - 1) * recordsPerPage + indexOnPage + 1;
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-header">
            <p>Assignment</p>
          </div>
          <div className="sidebar-nav">
            <ul>
              <li>Dashboard</li>
            </ul>
          </div>
        </div>
        {/* ------- Sidebar END ------- */}
        <div className="customer-section">
          <div className="customer-topbar">
            <div className="customer-topbar-content">
              <p>
                <span>Hi,</span> {user?.name}
              </p>
              <button onClick={() => logout()}>S</button>
            </div>
          </div>
          {/* ---- Customer topbar END ---- */}
          <div className="customer-content">
            <div className="customer-content-header">
              <p>Customers list</p>
              <button onClick={() => newCustomer(undefined)}>
                New Customer
              </button>
            </div>
            {/* ---- Customer Content Header END ---- */}
            <div className="customer-content-filter">
              <div className="filter-by-status">
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-style"
                    id="dropdown-basic"
                  >
                    {status === undefined && "All"}
                    {status === "Suspended" && "Suspended"}
                    {status === "Pending" && "Pending"}
                    {status === "Active" && "Active"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStatus(undefined)}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus("Suspended")}>
                      Suspended
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus("Pending")}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus("Active")}>
                      Active
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>
                  <span>Filter</span> by Status
                </p>
              </div>
              <div className="filter-by-type">
                {/* <SelectInput register={() => { }} options={types} style={{width: '170px', height: '45px'}} /> */}
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-style"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {type === undefined && "All"}
                    {type === "Business" && "Business"}
                    {type === "Indiviual" && "Indiviual"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setType(undefined)}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setType("Business")}>
                      Business
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setType("Indiviual")}>
                      Indiviual
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>
                  <span>Filter</span> by Type
                </p>
              </div>
              <div className="filter-search">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                ></input>
                <p>
                  <span>Search</span> in all fields
                </p>
              </div>
            </div>
            {/* ---- customer-content-filter END ---- */}
            <div className="customer-content-table">
              <div className="table-responsive">
                <Table hover className="table">
                  <thead>
                    <tr>
                      <th>
                        <input type={"checkbox"}></input>
                      </th>
                      <th style={{ color: "#3a9bfe" }}>ID</th>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>EMAIL</th>
                      <th>GENDER</th>
                      <th>STATUS</th>
                      <th>TYPE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Customers_List?.map((data: any, index: any) => (
                      <tr key={index}>
                        <td>
                          <input type={"checkbox"}></input>
                        </td>
                        <td aria-label="ID">{getRowNumber(index)}</td>
                        <td aria-label="First Name">{data?.firstName}</td>
                        <td aria-label="Last Name">{data?.lastName}</td>
                        <td aria-label="Email">{data?.email}</td>
                        <td aria-label="Gender">{data?.gender}</td>
                        <td aria-label="Status">
                          {data?.status === "Suspended" && (
                            <button className="status-suspended">
                              Suspended
                            </button>
                          )}
                          {data?.status === "Pending" && (
                            <button className="status-pending">Pending</button>
                          )}
                          {data?.status === "Active" && (
                            <button className="status-active">Active</button>
                          )}
                        </td>
                        <td aria-label="Type">
                          {data?.type === "Indiviual" && "Indiviual"}
                          {data?.type === "Business" && "Business"}
                        </td>
                        <td aria-label="Actions">
                          <div className="icon">
                            <div className="icon-style">
                              <BiEdit
                                onClick={() => newCustomer(data.id)}
                                style={{
                                  color: "#3699fe",
                                  width: "25px",
                                  height: "25px",
                                }}
                              />
                            </div>
                            <div className="icon-style">
                              <MdDeleteOutline
                                onClick={() => handleDelete(data.id)}
                                style={{
                                  color: "#f55465",
                                  width: "25px",
                                  height: "25px",
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            {/* --- customer-content-table END ---- */}
            <div className="customer-content-footer">
              <div className="pagination">
                <PaginationControl
                  page={page}
                  total={totalPages}
                  limit={1}
                  changePage={(newPage: any) => setPage(newPage)}
                  ellipsis={3}
                />
              </div>
              <div className="showing-rows">
                <SelectInput
                  options={rows}
                  register={() => {}}
                  onChange={(e: any) => setSelectedRows(e.target.value)}
                  style={{
                    backgroundColor: "#f4f6f9",
                    width: "85px",
                    border: "none",
                  }}
                  value={selectedRows}
                  defaultValue={3}
                />
                <p>
                  Showing rows {selectedRows} to 5 of {totalResults}
                </p>
              </div>
            </div>
            {/* ---- customer-content-footer END ---- */}
          </div>
        </div>
        {/* ---- Customer Section END ---- */}
      </div>
      {/* -------- Container END ------- */}
      {/* To Call Modal - To add new customer */}
      {show_Customer_Modal && (
        <CustomerModal
          show={show_Customer_Modal} //to show new customer modal
          onHide={() => setShow_Customer_Modal(false)} //for close button on modal
          customerforupdate={customerForUpdate}
          handlecustomer={handleCustomer}
        />
      )}
      {/* To call Delete Modal */}
      {show_Delete_Modal && (
        <DeleteCustomer
          show={show_Delete_Modal} //to show delete modal
          deleteid={deleteId} //customer ID that is to be deleted
          onHide={() => setShow_Delete_Modal(false)} //for close button
          handleSubmit={handleDeleteSubmit}
        />
      )}
    </>
  );
};

export default Dashboard;

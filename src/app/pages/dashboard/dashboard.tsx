import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
//Update ICON
import { BiEdit } from "react-icons/bi";
//Delete ICON
import { MdDeleteOutline } from "react-icons/md";
//Pagination
import { PaginationControl } from "react-bootstrap-pagination-control";
//Customers Array
import { customers } from "../../redux/_mocks_/mockData/customerTableMock";
//Customer TYPEs
import { Customer } from "../../redux/_mocks_/mockTypes/cutomer";
import * as authActions from "../../redux/auth/authActions";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
//Modal to ADD/UPDATE Customers
import CustomerModal from "../../components/shared/Modals/CustomerModal";
//Modal to DELETE Customers
import DeleteCustomer from "../../components/shared/Modals/DeleteModal";
import axios from "axios";
import "./dashboard.scss";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  <Toaster />;
  const dispatch: AppDispatch = useDispatch();
  //to show no of rows in dashboard footer
  const total_Rows = customers.length;
  //Selected Rows
  const [selectedRows, setSelectedRows] = useState(3);
  //States for pagination
  //* Start
  const [page, setPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(1);
  const firstIndex = (page - 1) * recordsPerPage;
  const lastIndex = page * recordsPerPage;
  const total_No_Of_Pages = Math.ceil(customers.length / recordsPerPage);
  const [totalPages, setTotalPages] = useState(total_No_Of_Pages);
  //* END
  //States for search criteria
  const [search, setSearch] = useState("");
  const [type, setType] = useState<number | undefined>();
  const [status, setStatus] = useState<number | undefined>();
  //after all search criteria fullfiled, filtered customers array return
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>();
  //Customers to show on each page
  const selected_customer = filteredCustomers?.slice(firstIndex, lastIndex);
  //to call Customer Modal
  const [isShow, setIsShow] = useState(false);
  //Store loggedIn user value
  const { user } = useSelector((state: any) => state.auth);
  //to call Delete Modal
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | undefined>(0);
  //to re-render filtered customers array whenever any customer updated/Added/Deleted
  //*Start
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [customerForUpdate, setCustomerForUpdate] = useState<any>();
  //*END
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
    if (customerForUpdate) {
      axios
        .put(`api/customers/${customerForUpdate.id}`, {
          ...customerForUpdate,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBbirth: data.dateOfBbirth,
          ipAddress: data.ipAddress,
          gender: data.gender,
          type: data.type,
        })
        .then((response) => {
          console.log(response);
          toast.success("Customer Updated Successfuly");
        })
        .catch((error) => {
          console.log("Customer Not Updated $$$$$$$$$$");
          if (error.response) {
            console.log(
              "Server responded with status code:",
              error.response.status
            );
            console.log("Response data:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error creating request:", error.message);
          }
        });
      setIsShow(false);
      setIsUpdate(true);
    } else {
      //adding new customer
      axios
        .post("api/customers", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBbirth: data.dateOfBbirth,
          ipAddress: data.ipAddress,
          gender: data.gender,
          type: data.type,
        })
        .then((response) => {
          console.log(response);
          console.log("Customer Added ==============");
          toast.success("Customer Added Successfuly");
        })
        .catch((error) => {
          console.log(error.response.request, error.response.status)
          toast.error("Customer Not Added")
        });
      setIsShow(false);
      setIsAdded(true);
    }
  };
  //logout
  const logout = () => {
    dispatch(authActions.logout());
  };
  //to call modal for new customer and modal title
  const newCustomer = (id: any) => {
    if (id === undefined) {
      setIsShow((current) => !current);
      setCustomerForUpdate(undefined);
    } else {
      let customerForEdit = selected_customer?.find(
        (item: any) => item.id === id
      );
      console.log(customerForEdit);
      if (customerForEdit) {
        setCustomerForUpdate({ ...customerForEdit });
        setIsShow(true);
      }
    }
  };
  //call delete modal and set delete id
  const handleDelete = (id: any) => {
    setShowDelete((current) => !current);
    setDeleteId(id);
  };
  //DELETE API
  const handleDeleteSubmit = () => {
    if (deleteId) {
      axios
        .delete(`api/customers/${deleteId}`)
        .then((response) => {
          console.log("DELETED");
          setShowDelete(false);
          toast.error("Customer Deleted");
          setDeleteId(undefined);
          setIsDeleted(true);
        })
        .catch((error) => {
          setShowDelete(false);
          toast.error("Unable To Deleted");
        });
    }
  };
  //* API to filter (type & status) & (search) customers
  useEffect(() => {
    console.log("FILTERED CUSTOMERS .............;;;;");
    axios
      .post("api/customers/find", {
        queryParams: {
          filter: {
            firstName: search,
            lastName: search,
            email: search,
            ipAddress: search,
            status: status,
            type: type,
          },
          pageNumber: page,
          pageSize: recordsPerPage,
        },
      })
      .then((response) => {
        const data = response.data.entities;
        setFilteredCustomers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, type, status, isUpdate, isDeleted, isAdded, customers.length]);
  //*Search API END

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
                <span>Hi,</span> {user?.username}
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
                    {status === 1 && "Suspended"}
                    {status === 2 && "Pending"}
                    {status === 0 && "Active"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStatus(undefined)}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus(1)}>
                      Suspended
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus(2)}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus(0)}>
                      Active
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>
                  <span>Filter</span> by Status
                </p>
              </div>
              <div className="filter-by-type">
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-style"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {type === undefined && "All"}
                    {type === 1 && "Business"}
                    {type === 0 && "Indiviual"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setType(undefined)}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setType(1)}>
                      Business
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setType(0)}>
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
                    {selected_customer?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <input type={"checkbox"}></input>
                        </td>
                        <td aria-label="ID">{data?.id}</td>
                        <td aria-label="First Name">{data?.firstName}</td>
                        <td aria-label="Last Name">{data?.lastName}</td>
                        <td aria-label="Email">{data?.email}</td>
                        <td aria-label="Gender">{data?.gender}</td>
                        <td aria-label="Status">
                          {data?.status ? (
                            <button className="status-suspended">
                              Suspended
                            </button>
                          ) : (
                            <button className="status-active">Active</button>
                          )}
                        </td>
                        <td aria-label="Type">
                          {data?.type == 0 ? "Indiviual" : "Business"}
                        </td>
                        <td aria-label="Actions">
                          <div className="icon">
                            <div className="icon-style">
                              <BiEdit
                                onClick={
                                  () => newCustomer(data.id)
                                  // handleUpdate(
                                  //   data.id,
                                  //   data.firstName,
                                  //   data.lastName
                                  // )
                                }
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
                  ellipsis={4}
                />
              </div>
              <div className="showing-rows">
                <select
                  onChange={(e: any) => setSelectedRows(e.target.value)}
                  value={selectedRows}
                  className="form-select"
                  style={{
                    backgroundColor: "#f4f6f9",
                    width: "85px",
                    border: "none",
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <p>
                  Showing rows {selectedRows} to 5 of {total_Rows}
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
      {isShow && (
        <CustomerModal
          show={isShow} //to show new customer modal
          onHide={() => setIsShow(false)} //for close button on modal
          setIsAdded={() => setIsAdded(true)}
          isAdded={isAdded}
          customerForUpdate={customerForUpdate}
          handleCustomer={handleCustomer}
        />
      )}
      {/* To call Delete Modal */}
      {showDelete && (
        <DeleteCustomer
          show={showDelete} //to show delete modal
          deleteid={deleteId} //customer ID that is to be deleted
          onHide={() => setShowDelete(false)} //for close button
          handleSubmit={handleDeleteSubmit}
          isDeleted={isDeleted}
          setIsDeleted={() => setIsDeleted((current) => !current)}
        />
      )}
    </>
  );
};

export default Dashboard;

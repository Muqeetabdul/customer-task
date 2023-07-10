import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import * as authActions from "../../redux/auth/authActions";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { PaginationControl } from "react-bootstrap-pagination-control";
import CustomerModal from "../../components/shared/CustomerModal/CustomerModal";
import DeleteCustomer from "../../components/shared/DeleteCustomer";
import { customers } from "../../redux/_mocks_/mockData/customerTableMock";
import axios from "axios";
import { Customer } from "../../redux/_mocks_/mockTypes/cutomer";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const [customersList, setCustomersList] = useState(customers);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(3);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<number | undefined>();
  const [status, setStatus] = useState<number | undefined>();
  const [totalPages, setTotalPages] = useState(8);
  const firstIndex = (page - 1) * recordsPerPage;
  const lastIndex = page * recordsPerPage;
  const rows = firstIndex * lastIndex;
  const selected_customer = filteredCustomers.slice(firstIndex, lastIndex);
  const [isShow, setIsShow] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalButton, setModalButton] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | undefined>(0);
  const [updateId, setUpdateId] = useState<number | undefined>(0);
  const [showPopUp, setShowPopUp] = useState(false);

  //To show only (one record per page) & (total no of pages) in mobile view
  useEffect(() => {
    if (window.screen.width <= 600) {
      setrecordsPerPage(1);
      setTotalPages(5);
    }
  }, []);
  // API to filter (type & status) & search customers
  useEffect(() => {
    axios
      .post("api/customers/find", {
        queryParams: {
          filter: {
            firstName: search,
            lastName: search,
            email: search,
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
  }, [search, type, status, customersList]);
  //Search API END

  //logout
  const logout = () => {
    dispatch(authActions.logout());
  };
  //to call modal for new customer and modal title
  const newCustomer = () => {
    setIsShow((current) => !current);
    setModalTitle("New Customer");
    setModalButton("Save");
  };
  //call delete modal and set delete id
  const handleDelete = (id: any) => {
    setShowDelete((current) => !current);
    setDeleteId(id);
  };
  //Updata modal call and set customer name and id in modal title
  const handleUpdate = (id: number, fname: string, lname: string) => {
    setShowUpdate((current) => !current);
    setModalTitle(`Update Customer "${fname} ${lname}"`);
    setModalButton("Update");
    setUpdateId(id);
  };
  //to change page in pagination
  const changePage = (newPage: any) => {
    setPage(newPage);
  };
  //to set values of status to pass to filter
  const handleStatus = (status: any) => {
    if (status == "All") {
      setStatus(undefined);
    } else if (status == "Suspended") {
      setStatus(1);
    } else if (status == "Active") {
      setStatus(0);
    } else if (status == "Pending") {
      setStatus(2);
    }
  };
  //to set values of type to pass to filter
  const handleType = (type: any) => {
    if (type == "All") {
      setType(undefined);
    } else if (type == "Business") {
      setType(1);
    } else if (type == "Indiviual") {
      setType(0);
    }
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
                <span>Hi,</span> Sean
              </p>
              <button onClick={() => logout()}>S</button>
            </div>
          </div>
          {/* ---- Customer topbar END ---- */}
          <div className="customer-content">
            <div className="customer-content-header">
              <p>Customers list</p>
              <button onClick={() => newCustomer()}>New Customer</button>
            </div>
            {/* ---- Customer Content Header END ---- */}
            <div className="customer-content-filter">
              <div className="filter-by-status">
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-style"
                    id="dropdown-basic"
                  >
                    All
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatus("All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatus("Suspended")}>
                      Suspended
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatus("Pending")}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatus("Active")}>
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
                    All
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleType("All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleType("Business")}>
                      Business
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleType("Indiviual")}>
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
                                onClick={() =>
                                  handleUpdate(
                                    data.id,
                                    data.firstName,
                                    data.lastName
                                  )
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
                  changePage={changePage}
                  ellipsis={4}
                />
              </div>
              <div className="showing-rows">
                <select
                  defaultValue={"1"}
                  className="form-select"
                  style={{
                    backgroundColor: "#f4f6f9",
                    width: "85px",
                    border: "none",
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <p>Showing rows 1 to 3 of {rows}</p>
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
          setshow={setIsShow} //to close modal after adding new customer
          modaltitle={modalTitle} //to show modal title "New Customer"
          onHide={() => setIsShow(false)} //for close button on modal
          modalbutton={modalButton} //to show save in modal button
        />
      )}
      {/* To call Delete Modal */}
      {showDelete && (
        <DeleteCustomer
          show={showDelete} //to show delete modal
          setShowDelete={setShowDelete} //to close delete modal after deletion
          deleteid={deleteId} //customer ID that is to be deleted
          onHide={() => setShowDelete(false)} //for close button
        />
      )}
      {/* To call Update Modal */}
      {showUpdate && (
        <CustomerModal
          show={showUpdate} //to show modal
          onHide={() => setShowUpdate(false)} //for close button modal
          modaltitle={modalTitle} //modal title "update customer"
          modalbutton={modalButton} //to show "update" in button
          updateid={updateId} //customer ID to update
        />
      )}
    </>
  );
};

export default Dashboard;

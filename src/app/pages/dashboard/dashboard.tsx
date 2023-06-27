import React, { useState } from "react";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import * as authActions from "../../redux/auth/authActions";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { current } from "@reduxjs/toolkit";
import CustomerModal from "../../components/shared/CustomerModal/CustomerModal";
import DeleteCustomer from "../../components/shared/DeleteCustomer";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const logout = () => {
    dispatch(authActions.logout());
  };
  const newCustomer = () => {
    setIsShow((current) => !current);
  };
  const handleDelete = () => {
    setShowDelete((current) => !current);
  };
  const handleUpdate = () => {
    setShowUpdate((current) => !current);
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
        <div className="customer-section">
          <div className="customer-topbar">
            <div className="customer-topbar-content">
              <p>
                <span>Hi,</span> Sean
              </p>
              <button onClick={() => logout()}>S</button>
            </div>
          </div>
          <div className="customer-content">
            <div className="customer-content-header">
              <p>Customers list</p>
              <button onClick={() => newCustomer()}>New Customer</button>
            </div>
            <div className="customer-content-filter">
              <div className="filter-by-status">
                <Dropdown>
                  <Dropdown.Toggle
                    className="dropdown-style"
                    variant="success"
                    id="dropdown-basic"
                  >
                    All
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Suspended</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Pending</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Active</Dropdown.Item>
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
                    <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Business</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Indiviual</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>
                  <span>Filter</span> by Type
                </p>
              </div>
              <div className="filter-search">
                <input placeholder="Search"></input>
                <p>
                  <span>Search</span> in all fields
                </p>
              </div>
            </div>
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
                    <tr>
                      <td>
                        <input type={"checkbox"}></input>
                      </td>
                      <td>1</td>
                      <td>Sonni</td>
                      <td>Gabotti</td>
                      <td>sgabotti@wsj.com</td>
                      <td>Female</td>
                      <td>
                        <button className="status-suspended">Suspended</button>
                      </td>
                      <td>Indiviual</td>
                      <td>
                        <div className="icon">
                          <div className="icon-style">
                            <BiEdit
                              onClick={handleUpdate}
                              style={{
                                color: "#3699fe",
                                width: "25px",
                                height: "25px",
                              }}
                            />
                          </div>
                          <div className="icon-style">
                            <MdDeleteOutline
                              onClick={handleDelete}
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
                    <tr>
                      <td>
                        <input type="checkbox"></input>
                      </td>
                      <td>2</td>
                      <td>Abie</td>
                      <td>Cowperthwaite</td>
                      <td>acowperthwaitel@storify.com</td>
                      <td>Male</td>
                      <td>
                        <button className="status-active">Active</button>
                      </td>
                      <td>Indiviual</td>
                      <td>
                        <div className="icon">
                          <div className="icon-style">
                            <BiEdit
                              style={{
                                color: "#3699fe",
                                width: "25px",
                                height: "25px",
                              }}
                            />
                          </div>
                          <div className="icon-style">
                            <MdDeleteOutline
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
                    <tr>
                      <td>
                        <input type="checkbox"></input>
                      </td>
                      <td>3</td>
                      <td>Melody</td>
                      <td>Stodd</td>
                      <td>mstodd2@twitpic.com</td>
                      <td>Female</td>
                      <td>
                        <button className="status-suspended">Suspended</button>
                      </td>
                      <td>Indiviual</td>
                      <td>
                        <div className="icon">
                          <div className="icon-style">
                            <BiEdit
                              style={{
                                color: "#3699fe",
                                width: "25px",
                                height: "25px",
                              }}
                            />
                          </div>
                          <div className="icon-style">
                            <MdDeleteOutline
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
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="customer-content-footer">
              <div className="pagination">
                <PaginationControl
                  page={page}
                  between={4}
                  total={250}
                  limit={20}
                  changePage={(page) => {
                    setPage(page);
                    console.log(page);
                  }}
                  ellipsis={1}
                />
              </div>
              <div className="showing-rows">
                <select
                  className="form-select"
                  style={{
                    backgroundColor: "#f4f6f9",
                    width: "85px",
                    border: "none",
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option selected>3</option>
                </select>
                <p>Showing rows 1 to 3 of 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShow && (
        <CustomerModal show={isShow} onHide={() => setIsShow(false)} />
      )}
      {showDelete && (
        <DeleteCustomer show={showDelete} onHide={() => setShowDelete(false)} />
      )}
      {showUpdate && (
        <CustomerModal show={showUpdate} onHide={() => setShowUpdate(false)} />
      )}
    </>
  );
};

export default Dashboard;

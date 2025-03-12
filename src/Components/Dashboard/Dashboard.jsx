import React, { useState } from "react";
import "./Dashboard.css"; // Ensure this file is in the same folder
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser, faEdit, faTrash, faPlus, } from "@fortawesome/free-solid-svg-icons"; // 
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  // Managing sections to show
  const [activeSection, setActiveSection] = useState(null); // To track active section
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // To show/hide the 'Add User' form
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: ""
  }); // To store new user input

  // Function to add a new user
  const addUser = () => {
    if (newUser.firstName.trim() !== "" && newUser.lastName.trim() !== "") {
      // Get the new ID by auto incrementing the last user's ID
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

      setUsers([
        ...users, 
        {
          id: newId,  // Assign the new ID
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          address: newUser.address,
          phoneNumber: newUser.phoneNumber
        }
      ]);
      setNewUser({ firstName: "", lastName: "", address: "", phoneNumber: "" }); // Clear the input fields
      setShowAddUserForm(false); // Hide the form after adding
    }
  };

  // Determine the title based on the active section
  const getTitle = () => {
    if (activeSection === "hr") {
      return "Manage Employees";
    } else if (activeSection === "leave") {
      return "Manage Leave Requests";
    } else if (activeSection === "recruitment") {
      return "Manage Recruitment";
    } else if (activeSection === "reports") {
      return "Generate Reports";
    } else {
      return "HR Officer"; // Default title
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveSection("hr")}>Manage Employees</li>
          <li onClick={() => setActiveSection("leave")}>Manage Leave Requests</li>
          <li onClick={() => setActiveSection("recruitment")}>Manage Recruitment</li>
          <li onClick={() => setActiveSection("reports")}>Generate Reports</li>
          <li onClick={() => setActiveSection(null)}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h1>{getTitle()}</h1> {/* Dynamic title based on the active section */}
          <button onClick={() => setActiveSection("profile")}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>

        {/* Manage Profile (Appears when 'Personal Info' is clicked) */}
        {activeSection === "profile" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="profile-container"
          >
            <div className="profile-card">
              <h2>Your Profile Information</h2>
              <p>Update your personal information here</p>
              <input type="text" placeholder="Name" />
              <input type="password" placeholder="Password" />
              <button>Submit Changes</button>
            </div>
          </motion.div>
        )}

        {/* Manage HR Table (Appears when 'Manage Users' is clicked) */}
        {activeSection === "hr" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="table-container"
          >

            {/* Add User Button */}
            <button className="add-user-btn" onClick={() => setShowAddUserForm(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add User
            </button>

            {/* Add User Form */}
            {showAddUserForm && (
              <div className="add-user-form">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                />
                <button onClick={addUser}>Add</button> 
                <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
              </div>
            )}

            {/* Users Table */}
            <table>
              <thead>
                <tr>
                  <th>ID</th> {/* Added ID column */}
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td> {/* Display ID */}
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td className="actions">
                      <FontAwesomeIcon icon={faEdit} className="edit" title="Edit" />
                      <FontAwesomeIcon icon={faTrash} className="delete" title="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Manage Leave Requests Table */}
        {activeSection === "leave" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="table-container"
          >
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Days Off</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Michael Brown</td>
                  <td>Software Engineer</td>
                  <td>5</td>
                  <td className="actions">
                  <FontAwesomeIcon icon={faCheck} style={{color: "#63E6BE",}} />
                    <i className="fas fa-times reject" title="Reject"></i>
                  </td>
                </tr>
                <tr>
                  <td>Susan Wilson</td>
                  <td>Project Manager</td>
                  <td>3</td>
                  <td className="actions">
                    <i className="fas fa-check approve" title="Approve"></i>
                    <i className="fas fa-times reject" title="Reject"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
        {activeSection ==="reports" &&(
          <motion.div>
         <div className="uploadfile">
      <label htmlFor="file" className="custum-file-upload">
        <div className="icon">
          <svg viewBox="0 0 24 24" fill xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill /> </g></svg>
        </div>
        <div className="text">
          <span>Click to upload file</span>
        </div>
        <input id="file" type="file" />
      </label>
    </div>
            </motion.div>
        )}
      </div>
    </div>
  );
}

# Case - Role Based Portal (Backend)

<table>
  <tbody>
    <tr>
      <td>
        Requested
      </td>
      <td>
        <h3>Case Details:</h3>
        <p>We want you to develop a role based customer portal.</p>
        <ul>
          <li>
            <p>Features:</p>
            <ul>
              <li>A web-based application that can list client projects, dates, meeting notes, contracts, payments, and balances.</li>
              <li>User login and role-based access control.</li>
              <li>Dashboard for visualizing data.</li>
            </ul>
          </li>
          <li>
            <p>Technical Requirements:</p>
            <ul>
              <li>Although React or Vue.js is the priority for the frontend, there is no framework restriction.</li>
              <li>SQL or NoSQL database must be used.</li>
              <li>Basic security measures (e.g. data encryption, XSS protection) should be included.</li>
            </ul>
          </li>
        </ul>
        <h3>Explanation:</h3>
        <ul>
          <li>
            <p>Admin:</p>
            <ul>
              <li>Meetings and Updates: Admin keeps track of updates such as internal meetings, payments, project deliverables, contracts and payments.</li>
              <li>Logs into the portal with the Admin role.</li>
              <li>Opens a form by clicking the 'add' button on the Dashboard.</li>
              <li>In this form, select the type of post (e.g. payment update, project delivery, etc.) and the relevant company.</li>
              <li>If necessary, it shares this information as a post on the portal by attaching the relevant documents.</li>
            </ul>
          </li>
          <li>
            <p>Customer:</p>
            <ul>
              <li>The customer's login information is created by the admin.</li>
              <li>The customer logs into the portal with the provided user information.</li>
              <li>Can view entries assigned to him/her (e.g. updates, documents, etc. related to him/her).</li>
            </ul>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        Result
      </td>
      <td>
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result1.png" alt="Result 1">
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result2.png" alt="Result 2">
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result3.png" alt="Result 3">
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result4.png" alt="Result 4">
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result5.png" alt="Result 5">
        <img src="https://github.com/saintyusuf/case-roleBasedPortalFrontend/blob/main/case-details/result6.png" alt="Result 6">
      </td>
    </tr>
  </tbody>
</table>

## About

This is a case study to measure full stack coding skills. This is the backend part of the project. The frontend part can be found [here](https://github.com/saintyusuf/case-roleBasedPortal-frontend).

## Stack

JS, Node.js, Express, JWT, MongoDB

## Installation

Setup MongoDB Locally\
[Official Documentation](https://www.mongodb.com/docs/manual/administration/install-community/)

Clone the repository
```bash 
git clone https://github.com/saintyusuf/case-roleBasedPortal-backend.git
```

Change directory
```bash 
cd case-roleBasedPortal-backend
```

Install dependencies
```bash
npm install
```

Run the project
```bash
npm run start
```

import React from "react";
import AdminAccordian from "../components/accordian/AdminAccordian";
import Auth from "../utils/auth";

function Admin() {

  return (
    <main>
      <h1>Admin Page</h1>
      <section>
        <AdminAccordian/>
      </section>
    </main>
  );
}

export default Admin;

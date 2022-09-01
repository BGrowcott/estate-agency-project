import { useQuery } from "@apollo/client";
import React from "react";
import ModalUpdateUser from "../components/modals/ModalUpdateUser";
import { SHOW_MODAL_UPDATE_USER } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";

function UserPage() {
  const { loading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || "";
  const [state, dispatch] = useStoreContext();

  function toggleEditModal() {
    dispatch({ type: SHOW_MODAL_UPDATE_USER });
  }

  return (
    <main className="container-lg">
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="row">
            <section className="col-xs-12 col-md-6">
              <h2>My Information</h2>
              <div>
                <p>Title: {user.title}</p>
                <p>Name: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>WeChat: {user.weChat}</p>
                <p>Date of Birth: {user.dob}</p>
                <p>Passport Number: {user.passportNumber}</p>
                <p>School: {user.school}</p>
                <p>Area of Study: {user.specialty}</p>
                <p>Emergency Contact Name: {user.emergencyContactName}</p>
                <p>Emergency Contact Number: {user.emergencyContactNumber}</p>
                <p>Emergency Contact Address: {user.emergencyContactAddress}</p>
                <p>Other Information: {user.otherInformation}</p>
              </div>
              <button onClick={toggleEditModal} className="btn btn-primary">
                Edit Details
              </button>
            </section>
            <section className="col-xs-12 col-md-6">
              <h2 className="h5">Saved Properties</h2>
              {user
                ? user.properties.map((property) => {
                    return (
                      <div key={property._id}>
                        <h3 className="h6">{property.title}</h3>
                        <p>{property.address}</p>
                        <Link to={`/property/${property._id}`}>View Property</Link>
                      </div>
                    );
                  })
                : null}
            </section>
          </div>
          <ModalUpdateUser user={user} />
        </>
      )}
    </main>
  );
}

export default UserPage;

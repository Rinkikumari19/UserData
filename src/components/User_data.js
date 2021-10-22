import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default function User_data() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`).then((response) => {
      setUserData(response.data.data);
    });
  }, [page]);

  const prevPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <h1>USER DATA</h1>
      <div className="data">
        <div className="btn">
          <Button variant="contained" color="primary" onClick={prevPage}    disabled={page === 1 ? true : false}>
            Prev Page
          </Button>
        </div>
        <div>
          <table className="heading">
            <tr>
              {["Profile Photo", "First Name", "Last Name", "Id", "Email"].map(
                (head) => (
                  <th className="head">
                    <h2>{head}</h2>
                  </th>
                )
              )}
            </tr>

            {userData.length > 1 ? userData.map(({avatar, first_name, last_name, id, email}) => {
              return (
                <tr key={id}>
                  <td>
                    <img src={avatar} />
                  </td>
                  <td>
                    <h3>{first_name}</h3>
                  </td>
                  <td>
                    <h3>{last_name}</h3>
                  </td>
                  <td>
                    <h3>{id}</h3>
                  </td>
                  <td>
                    <h3>{email}</h3>
                  </td>
                </tr>
              );
              
            }):<p>No data found</p>}
           </table>
        </div>

        <div className="btn">
          <Button
            variant="contained"
            disabled={ userData.length < 1 ? true : false}
            color="primary"
            onClick={nextPage}
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import MapWrap from "../components/MapWrap";
import DelivererOrdersTable from "../components/DelivererOrdersTable";
import APIHandler from "./../api/handler";
import { useAuth } from "./../auth/UseAuth";

const Dashboard = props => {
  const [validatedOrders, setValidatedOrders] = useState([]);
  const [zipCodes, setZipcodes] = useState([]);
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    APIHandler.get("/validated-orders")
      .then(res => {
        setValidatedOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const setZipcodeState = arrondissements => {
    setZipcodes(arrondissements);
  };

  const filterOrders = validatedOrders => {
    if (zipCodes.length === 0) {
      return validatedOrders;
    } else {
      return validatedOrders.filter(order => zipCodes.includes(order.zipcode));
    }
  };

  const updateOrder = input => {
    let updatedData = { status: "IN DELIVERY", deliverer: currentUser._id };
    APIHandler.patch("/edit-order/" + input, updatedData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  if (!currentUser) return null;

  return (
    <div className="container" id="deliverer-container">
      <h3 id="deliverer-welcome" className="text-center mx-auto">Welcome {currentUser.firstname}</h3>
      <p id="deliverer-text" className="text-center mx-auto">Select your delivery zone</p>
      <div>
        <MapWrap clbk={setZipcodeState} />
        <DelivererOrdersTable
          validatedOrders={filterOrders(validatedOrders)}
          handleClick={updateOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;

import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./useAuth";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { auth } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [orderBy, setOrderBy] = useState([]);

  const getCustomers = async () => {
    if (auth)
      fetch("http://localhost:3333/api/customer", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log(data);
            setCustomers(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const getCustomerById = async (id) => {
    if (auth)
      fetch("http://localhost:3333/api/customer/" + id, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log(data);
            setCustomer(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const getCustomersOrderBy = async (data) => {
    if (auth)
      fetch(
        "http://localhost:3333/api/customer/query?" +
          new URLSearchParams(data).toString(),
        {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            console.log(data);
            setOrderBy(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const value = useMemo(
    () => ({
      customer,
      customers,
      orderBy,
      getCustomers,
      getCustomerById,
      getCustomersOrderBy,
    }),

    [customer, customers, orderBy, auth]
  );

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(CustomerContext);
};

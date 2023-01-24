import { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./useAuth";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { auth } = useAuth();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState([]);
  const [summary, setSummary] = useState([]);

  const getOrders = async () => {
    if (auth)
      fetch("http://localhost:3333/api/order", {
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
            setOrders(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const getOrderById = async (id) => {
    if (auth)
      fetch("http://localhost:3333/api/order/" + id, {
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
            setOrder(data.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const getOrdersOrderBy = async (data) => {
    if (auth)
      fetch(
        "http://localhost:3333/api/order/query?" +
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

  const getSummaryReport = async (data) => {
    if (auth)
      fetch("http://localhost:3333/api/order/summaryReport", {
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
            setSummary([data.data]);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };

  const value = useMemo(
    () => ({
      order,
      orders,
      orderBy,
      summary,
      getOrders,
      getOrderById,
      getOrdersOrderBy,
      getSummaryReport,
    }),

    [order, orders, orderBy, summary, auth]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};

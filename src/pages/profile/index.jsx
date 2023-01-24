import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCustomer } from "../../hooks/useCustomer";
import { useOrder } from "../../hooks/useOrder";
import styles from "./index.module.css";

const Profile = () => {
  const { getUser } = useAuth();
  const {
    getCustomers,
    getCustomerById,
    customers,
    customer,
    orderBy: customerOrderBy,
    getCustomersOrderBy,
  } = useCustomer();
  const {
    getOrders,
    getOrderById,
    orders,
    order,
    orderBy: ordersOrderBy,
    getOrdersOrderBy,
    getSummaryReport,
    summary,
  } = useOrder();
  const [table, setTable] = useState("customers");
  const [id, setId] = useState(1);
  const [orderBy, setOrderBy] = useState({
    table: "customers",
    column: "id",
    arrange: "ASC",
    amount: 0,
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (table === "customers") {
      setOrderBy({
        table: "customers",
        column: "id",
        arrange: "ASC",
        amount: 0,
      });
    } else {
      setOrderBy({
        table: "orders",
        column: "order_id",
        arrange: "ASC",
        amount: 0,
      });
    }
  }, [table]);

  return (
    <div className={styles.container}>
      <h1>Profile...</h1>
      <section id="select">
        <h2>SQL SELECT</h2>
        <div>
          <p
            onClick={() => {
              setTable("customers");
            }}
          >
            customers
          </p>
          <p
            onClick={() => {
              setTable("orders");
            }}
          >
            orders
          </p>
        </div>
        <h3>SELECT * FROM {table}</h3>
        <button
          type="button"
          onClick={() => {
            if (table === "customers") {
              getCustomers();
            } else if (table === "orders") {
              getOrders();
            }
          }}
        >
          SEND
        </button>
        {table === "customers" ? (
          <ul>
            {customers.map((e, i) => (
              <li key={i} onClick={() => setId(e.id)}>
                {e.name} - {e.address}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {orders.map((e, i) => (
              <li key={i} onClick={() => setId(e.order_id)}>
                {e.order_id} - {e.amount}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section id="where">
        <h2>SQL WHERE</h2>
        <h3>
          SELECT {table === "customers" ? "id, name, age, address" : "*"} FROM{" "}
          {table} WHERE {table === "customers" ? "id" : "order_id"} = {id}
        </h3>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <button
          type="button"
          onClick={() => {
            if (table === "customers") {
              getCustomerById(id);
            } else if (table === "orders") {
              getOrderById(id);
            }
          }}
        >
          SEND
        </button>
        {table === "customers" && customer ? (
          <p>
            {customer?.name} <small>{customer?.age}</small> -{" "}
            {customer?.address}
          </p>
        ) : table === "orders" && order ? (
          <p>
            {order?.order_id} {order?.amount} - {order?.date}
          </p>
        ) : null}
      </section>
      <section id="order-by">
        <h2>SQL ORDER BY</h2>
        <div>
          <p
            onClick={() => {
              setOrderBy({ ...orderBy, arrange: "ASC" });
            }}
          >
            ASC
          </p>
          <p
            onClick={() => {
              setOrderBy({ ...orderBy, arrange: "DESC" });
            }}
          >
            DESC
          </p>
        </div>
        {orderBy.table === "orders" && (
          <>
            <p
              onClick={() => {
                setOrderBy({ ...orderBy, amount: 0 });
              }}
            >
              0
            </p>
            <p
              onClick={() => {
                setOrderBy({ ...orderBy, amount: 2000 });
              }}
            >
              2000
            </p>
            <p
              onClick={() => {
                setOrderBy({ ...orderBy, amount: 5000 });
              }}
            >
              5000
            </p>
          </>
        )}
        <h3>
          SELECT * FROM {orderBy.table}
          {orderBy.table === "orders" && orderBy.amount > 0
            ? ` WHERE amount > ${orderBy.amount} `
            : ` `}
          ORDER BY {orderBy.column} {orderBy.arrange}
        </h3>
        <button
          type="button"
          onClick={() => {
            if (orderBy.table === "customers") {
              getCustomersOrderBy({
                table: orderBy.table,
                column: orderBy.column,
                orderBy: orderBy.arrange,
              });
            } else if (orderBy.table === "orders") {
              getOrdersOrderBy({
                table: orderBy.table,
                column: orderBy.column,
                orderBy: orderBy.arrange,
                amount: orderBy.amount,
              });
            }
          }}
        >
          SEND
        </button>
        {orderBy.table === "customers" ? (
          <ul>
            {customerOrderBy.map((e, i) => (
              <li key={i} onClick={() => setId(e.id)}>
                {e.id} : {e.name} - {e.address}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {ordersOrderBy.map((e, i) => (
              <li key={i} onClick={() => setId(e.id)}>
                {e.order_id} : {e.customer_id} - {e.amount}
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* <section id="update">
        <p>SQL UPDATE</p>
        <p>
          UPDATE {table} SET = {table === "customers" ? "salary" : "amount"}{" "}
          WHERE {table === "customers" ? "id" : "order_id"} = {id}
        </p>
        <div>...</div>
      </section>
      <section id="delete">
        <p>SQL DELETE</p>
        <p>
          DELETE FROM {table} WHERE {table === "customers" ? "id" : "order_id"}{" "}
          = {id}
        </p>
        <div>...</div>
      </section> */}
      <section id="left-join">
        <h2>SQL LEFT JOIN</h2>
        <h3>
          SELECT orders.order_id, customers.name, orders.amount, orders.date
          FROM customers LEFT JOIN orders ON customers.id = orders.customer_id
        </h3>
        <button
          type="button"
          onClick={() => {
            getSummaryReport();
          }}
          disabled
        >
          SEND
        </button>
        <ul>
          {summary.map((e, i) => (
            <li key={i}>
              {e.order_id} | {e.name} | {e.amount} | {e.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Profile;

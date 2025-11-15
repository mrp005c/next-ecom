"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.css";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import OrderItem from "@/components/modules/OrderItem";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  /* loadMessages
  and other handler */
  const loadOrders = async () => {
    // setIsloading(loadLoayout);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const data = await fetch(`/api/orders`, requestOptions);
      const res = await data.json();
      if (res.success) {
        setOrders(res.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsloading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // filter the orders
  useEffect(() => {
    const u = async () => {
      if (orders && orders.length > 0) {
        setPendingOrders(orders.filter((e) => e.status === "pending"));
        setConfirmedOrders(orders.filter((e) => e.status === "confirmed"));
        setDeliveredOrders(orders.filter((e) => e.status === "delivered"));
      }
    };
    u();
  }, [orders]);

  return (
    <div>
      <div className="">
        <Tabs defaultValue="pending">
          <TabsList className={"flex-center flex-wrap"}>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <div className="p-3 space-y-3 flex-center flex-col">
              {pendingOrders &&
                pendingOrders.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="confirmed">
            <div className="p-3 space-y-3 flex-center flex-col">
              {confirmedOrders &&
                confirmedOrders.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="delivered">
            <div className="p-3 space-y-3 flex-center flex-col">
              {deliveredOrders &&
                deliveredOrders.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="p-3 space-y-3 flex-center flex-col">
              {orders &&
                orders.map((item) => <OrderItem key={item._id} item={item} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

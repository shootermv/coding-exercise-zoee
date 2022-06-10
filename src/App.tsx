import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import dataStream from "./data";
import millify from "millify";
import {  Row, Col, Typography, Card, Layout } from "antd";
const { Content, Header, Footer } = Layout;
const {Text} = Typography
function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const subscription = dataStream.subscribe((data: any) => {
      console.log("---", data);
      setItems(data);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Layout>
      <Header>Header</Header>
      <Content style={{padding: '30px'}}>
        <Card></Card>
        <Card>
          <Row>
            <Col span={6}><Text>Asset</Text></Col>
            <Col span={6}><Text>Type</Text></Col>
            <Col span={6}><Text>Market</Text></Col>
            <Col span={6}><Text>Price</Text></Col>
          </Row>

          <Row>
            <Col span={24}>
              {items.map((item: any) => {
                return (
                  <Row key={item.id}>
                    <Col span={6}>{item.assetName}</Col>
                    <Col span={6}>{item.type}</Col>
                    <Col span={6}>
                      {item.type === "Stock" ? item.market : ""}
                    </Col>
                    <Col span={6}>{`${millify(item.price)}`}</Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Card>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;

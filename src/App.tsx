import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import { FixedSizeList as List } from 'react-window';
import dataStream from "./data";
import millify from "millify";
import { Row, Col, Typography, Card, Layout, Input, Select } from "antd";
const { Content, Header, Footer } = Layout;
const { Text } = Typography;
function App() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState<any>({
    name: "",
    byType: "All",
  });
  const filteredItems = useMemo(() => {
    return items.filter((itm: any) => {
      return (filters.byType === 'All' || itm.type === filters.byType) && itm.assetName.includes(filters.name);
    });
  }, [filters, items]);
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
      <Content style={{ padding: "30px" }}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Input
                placeholder="search crypto"
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
            </Col>
            <Col span={12}>
              <Select defaultValue="All"  onChange={v=>setFilters({...filters, byType: v})}>
                {["All", "Stock", "Currency"].map((_type) => (
                  <Select.Option key={_type}>{_type}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col span={6}>
              <Text>Asset</Text>
            </Col>
            <Col span={6}>
              <Text>Type</Text>
            </Col>
            <Col span={6}>
              <Text>Market</Text>
            </Col>
            <Col span={6}>
              <Text>Price</Text>
            </Col>
          </Row>

          <Row>
            <Col span={24}>

             <List
                itemData={filteredItems}
                itemCount={filteredItems.length}
                itemSize={20}
                height={300}
                width={1200}
              >
                {({data, index, style }: {data: any, index: number, style: any }) => {
                  return (
       
                    <Row style={style}>
                      <Col span={6}>{data[index].assetName}</Col>
                      <Col span={6}>{data[index].type}</Col>
                      <Col span={6}>
                        {data[index].type === "Stock" ? data[index].market : ""}
                      </Col>
                      <Col span={6}>{`${millify(data[index].price)}`}</Col>
                    </Row>
                  );
                }}
              </List>
            </Col>
          </Row>
        </Card>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;

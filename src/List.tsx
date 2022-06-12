import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { FixedSizeList as List } from "react-window";
import dataStream$ from "./data";
import millify from "millify";
import { Row, Col, Typography, Card, Input, Select } from "antd";
import AutoSizer from "react-virtualized-auto-sizer";
import { scan, take, toArray } from "rxjs";

const { Text } = Typography;
const getFilters = () => {
  const raw: any = window?.localStorage.getItem('filters')
  const parsed = JSON.parse(raw) || {
    name: "",
    byType: "All",
  }
  return parsed
}
export default function DataList() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState<any>(getFilters());
  const filteredItems = useMemo(() => {
    return items.filter((itm: any) => {
      return (
        (filters.byType === "All" || itm.type === filters.byType) &&
        itm.assetName.includes(filters.name)
      );
    });
  }, [filters, items]);
  useEffect(() => {
    let counter = 0;
    let _data:any = []
    const subscription = dataStream$
    .subscribe((dataItem: any) => {      
        counter++;
        if (counter === 400) {
           setItems(_data);
           counter = 0;
           _data = [] 
        } else {
           _data.push(dataItem)
        }
   
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
     <>
        <Card>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Input
                value={filters.name}
                placeholder="search crypto"
                onChange={(e) => {
                  const newFilters = { ...filters, name: e.target.value.toUpperCase() }
                  setFilters(newFilters)
                  localStorage.setItem('filters', JSON.stringify(newFilters))
                }}
              />
            </Col>
            <Col span={12}>
              <Select
                value={filters.byType}
                defaultValue="All"
                onChange={(value) => {
                  const newFilters = { ...filters, byType: value }
                  setFilters(newFilters)
                  localStorage.setItem('filters', JSON.stringify(newFilters))
                }}
              >
                {["All", "Stock", "Currency"].map((_type) => (
                  <Select.Option key={_type}>{_type}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row style={{marginRight: '21px'}}>
            <Col span={6}>
              <Text strong>Asset</Text>
            </Col>
            <Col span={6}>
              <Text strong>Type</Text>
            </Col>
            <Col span={6}>
              <Text strong>Market</Text>
            </Col>
            <Col span={6}>
              <Text strong>Price</Text>
            </Col>
          </Row>

          <Row>
            <Col span={24} style={{minHeight: '360px'}}>
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    itemData={filteredItems}
                    itemCount={filteredItems.length}
                    itemSize={40}
                    height={350}
                    width={width}
                  >
                    {({
                      data,
                      index,
                      style,
                    }: {
                      data: any;
                      index: number;
                      style: any;
                    }) => {
                      return (
                        <Row style={style}>
                          <Col span={6}>{data[index].assetName}</Col>
                          <Col span={6}>{data[index].type}</Col>
                          <Col span={6}>
                            {data[index].type === "Stock"
                              ? data[index].market
                              : ""}
                          </Col>
                          <Col span={6}>{`${millify(data[index].price)}`}</Col>
                        </Row>
                      );
                    }}
                  </List>
                )}
              </AutoSizer>
            </Col>
          </Row>
        </Card>
    </>
  );
}
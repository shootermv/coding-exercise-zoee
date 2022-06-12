import "./App.css";
import DataList from "./List"
import { Layout } from "antd";

const { Content, Header, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content style={{ padding: "30px" }}>
        <DataList/>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;

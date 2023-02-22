import React from "react";
import * as Styled from "./styles";
import { Table } from "antd";

interface Props {
  columns: any;
  data: any[];
  title?: string;
}

const TableDefault: React.FC<Props> = ({ columns, data, title }) => {
  return (
    <>
      <Styled.Cointainer>
        <h1>{title}</h1>
        <Styled.Table>
          <Table columns={columns} dataSource={data} />
        </Styled.Table>
      </Styled.Cointainer>
    </>
  );
};

export default TableDefault;

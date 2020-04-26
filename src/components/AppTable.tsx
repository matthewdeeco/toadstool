import { Table } from 'antd';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const AppTable = styled(Table)`
  .ant-table {
    font-size: 12px;
    overflow-x: auto;
  }

  .ant-table,
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-thead th.ant-table-column-has-sorters:hover,
  td.ant-table-column-sort {
    color: unset;
    background: unset;
  }
  .ant-table-cell-fix-left,
  .ant-table-cell-fix-right {
    background: #282c34 !important;
  }
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 0.5rem 0.25rem;
  }
  ${breakpoint('desktop')`
    .ant-table {
      font-size: 1rem;
    }
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 0.5rem 1rem;
    }
  `}
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export default AppTable;

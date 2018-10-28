import React from 'react';
import * as moment from 'moment';

const numberClassNames = {
  '+': 'text-primary',
  '-': 'text-danger',
};

const TransactionItem = (item) => (
  <tr key={item._id}>
    <td>{ moment(item.date).format('DD/MM/YYYY') }</td>
    <td>{ item.description }</td>
    <td>{ item.group }</td>
    <td>
      <strong className={numberClassNames[item.operation]}>
        {`${item.operation} ${item.value}`}
      </strong>
    </td>
  </tr>
);

const emptyTransactionsRow = <tr>
  <td colSpan="4"><i>No transactions found</i></td>
</tr>;

export const TransactionList = ({ transactions }) => (
  <table className="table">
    <thead>
      <tr>
        <td colSpan="3" className="text-right align-middle">
          <strong>Total spent</strong>
        </td>
        <td>
          <span className="total-number text-danger">
            {200}
          </span>
        </td>
      </tr>
      <tr>
        <th width="100">Date</th>
        <th>To</th>
        <th>Group</th>
        <th width="200">Value</th>
      </tr>
    </thead>
    <tbody>
      { transactions && transactions.length
          ? transactions.map(TransactionItem)
          : emptyTransactionsRow }
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="3" className="text-right align-middle">
          <strong>Total received</strong>
        </td>
        <td>
          <span className="total-number text-info">
              { 100 }
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan="3" className="text-right align-middle">
          <strong>Total spent</strong>
        </td>
        <td>
          <span className="total-number text-danger">
              { 200 }
          </span>
        </td>
      </tr>
    </tfoot>
  </table>
);
import React, { useState, useEffect } from 'react';
import ReactBootstrapTable from 'react-bootstrap-table-next';
import Button from '@material-ui/core/Button';

const ErrorMessage = props => {
  if(props.error) {
    return <div className="alert alert-danger" role="alert">
      It looks like something went wrong!
    </div>
  } else {
    return null
  }
}

const SpinnerLoading = () => {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

const UpdateButton = props => {
  return (
    <div className="mb-3">
      <Button
        onClick={props.onClick}
        className="update-button"
      >Update List</Button>
    </div>
    
  )
}

const BootstrapTable = (props) => {
  //Formatters
  //We give format to the dates
  const dateFormatter = (cell, row)=> {
    const dateObject = new Date(cell)
    const month = (dateObject.getMonth() + 1) < 10 ? '0'+(dateObject.getMonth() + 1) : dateObject.getMonth() + 1
    const day = dateObject.getDate() < 10 ? '0' + dateObject.getDate() : dateObject.getDate()
    let hours = (dateObject.getHours() + 1) < 13 ? dateObject.getHours() + 1 : dateObject.getHours() - 11
    hours = hours < 10 ? '0'+hours : hours
    const minutes = dateObject.getMinutes() < 10 ? '0'+dateObject.getMinutes() : dateObject.getMinutes()
    const ampm = dateObject.getHours() < 12 ? 'am' : 'pm'
    let complete =
      month +
      '/' +
      day +
      '/' +
      dateObject.getFullYear() +
      ' - ' +
      hours +
      ':' +
      minutes +
      ' ' +
      ampm
    return complete
  }

  const deleteButton = (cell, row, rowIndex, formatExtraData)=>{
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          className="delete-button"
          onClick={()=>formatExtraData.onDelete(row.id)}
        >
          X
        </Button>
      </div>
    )
  }

 
  const columns = [{
    dataField: 'date',
    text: 'Date',
    sort: true,
    formatter: dateFormatter
  }, {
    dataField: 'description',
    text: 'Description',
    sort: true,
    headerClasses: 'description-column'
  }, {
    dataField: 'amount',
    text: 'Amount',
    sort: true,
    style: (cell, row, rowIndex, colIndex) => {
      if (row.amount < 0) {
        return {
          color: '#DF262D',
          fontWeight: '600'
        };
      }
      return {
        color: '#3F9439',
        fontWeight: '600'
      };
    }
  }, {
    dataField: '',
    text: 'Delete',
    sort: false,
    formatter: deleteButton,
    formatExtraData: { onDelete: props.onDelete },
    align: 'center',
    headerAlign: 'center',
    headerClasses: 'delete-column'
  }, {
    dataField: 'id',
    text: 'id',
    sort: true,
    hidden: true
  }];

  const defaultSorted = [{
    dataField: 'date',
    order: 'desc'
  }];

  return (
    <>
      <UpdateButton onClick={props.onUpdate} />
      { props.loading ? (
        <SpinnerLoading />
      ) : (
        <ReactBootstrapTable
          bootstrap4
          keyField="id"
          data={ props.data }
          columns={ columns }
          defaultSorted={ defaultSorted }
        />
      )}
    </>
  )
}

const List = props => {
  return (
    <div className="list">
      <ErrorMessage error={props.error} />
      <BootstrapTable 
        data={props.data}
        loading={props.loading}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
       />
    </div>
  )
}

export default List;
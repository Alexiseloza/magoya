import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import List from './List.jsx';
import Swal from 'sweetalert2';


const ListHeader = () => {
  const router = useRouter()
  return (
    <div className="list-header d-flex align-items-center justify-content-between">
      <span className="title">Transactions</span>
      <Button 
        variant="contained"
        color="primary"
        className="add-button"
        onClick={()=>router.push('/add')}
        >
        + ADD
      </Button>
    </div>
  )
}


const useTransactionsApi = () => {
  const [data, setData] = useState([])
  const [updateData, setUpdateData] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() =>{
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      const options = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      }
      try{
        const response = await fetch('/api/transactions', options)
        const result = await response.json()

        
        if(result.error){
          setIsError(true)
        } else {
          setData(result)
        }
      } catch {
        setIsError(true)
      }
        
      setIsLoading(false)
    }
    fetchData()
  },[
    updateData 
  ])

  return [{ data, isLoading, isError, updateData }, setUpdateData]
}

const App = () => {
 
  const [{ data, isLoading, isError, updateData }, doUpdateData ] = useTransactionsApi()

  
  const onDelete = id => {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
     
      if (result.value) {
        const deleteTransaction = async () => {
          const options = {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
          }
          try{
            const response = await fetch(`/api/transactions/${id}`, options)
            
            
            if(response.ok){
              Swal.fire(
                'Deleted!',
                'Your transaction has been deleted.',
                'success'
              ).then(()=>{
                
                doUpdateData(!updateData)
              })
            } else {
              
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: result.error,
              })
            }
          } catch {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Server Error when deleting',
            })
          }
        }
        deleteTransaction()
      }
    })
  }

  return (
    <div className="app">
      <ListHeader />
      <List
        data={data}
        loading={isLoading}
        error={isError}
        onUpdate={()=>doUpdateData(!updateData)}
        onDelete={onDelete}
      />
    </div>
  )
}

export default App;
import React, { useEffect, useState ,useCallback} from 'react';
import './manage.component.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../../api/tables";
import {useNavigate} from 'react-router-dom';


export default function Manage() {  
  const navigate = useNavigate();



  const [lists,setLists]=useState("");

  const deleteHandler=async (id)=>{
    window.confirm("Delete ?");
    await api.delete(`/tables/${id}`);
    const newList = lists.filter((list)=>{
      return list.id !==id;
    });
    setLists(newList);
  }

  // const editHandler=async(id)=>{
  //   useCallback(() => navigate('/sample', {replace: true}), [navigate])

  //   await api.put(`/tables/${id}`,lists);

  // }
  const handleOnClick = useCallback((id) => navigate(`/manage/${id}`, {replace: true}), [navigate]);
  const res = async()=>{
   await api.get("/tables").then((response)=>{
      console.log(response.data);
      setLists(response.data)
    });
  }
  
useEffect(()=>{
//  deleteHandler()
 res()
},[])

  return (
    <>
    <h2 style={{fontWeight:400, textAlign:'center'}}>Manage Table</h2>
    <TableContainer component={Paper} className='manage-table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Layout</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Capacity</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Image</TableCell>
            <TableCell >Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {lists &&
                    lists.map((list) => (
            <TableRow
              key='key'
            >
              <TableCell component="th" scope="row">
                {list.layout}
              </TableCell>
              <TableCell >{list.name}</TableCell>
              <TableCell >{list.capacity}</TableCell>
              <TableCell >{JSON.stringify(list.status)}</TableCell>
              <TableCell >ee</TableCell>
              <TableCell >
               
                 <button onClick={()=>handleOnClick(list.id)}  style={{backgroundColor:'white',border:'none'}} > <EditIcon sx={{color: 'gray',fontSize:22,cursor:'pointer'}} />
                  </button>
                  <span style={{fontSize:24}}>
                    ||
                  </span>
                  <button onClick={()=>deleteHandler(list.id)} style={{backgroundColor:'white',border:'none'}}>
                    <DeleteIcon sx={{color:'red',fontSize:22,cursor:'pointer'}}/>
                  </button>
                </TableCell>
            </TableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}


import React, { useState, useEffect } from 'react'
import {useSelector} from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './ManageUser.css'

//function
import { list, changeRole, remove } from '../../../functions/user'

const ManageUser = () => {
  const [data, setData] = useState([])
  const { user } = useSelector((state)=>({...state}))

  useEffect(()=>{
    loadData(user.user.token)
  },[])

  const loadData = async(authtoken)=>{
    await list(authtoken).then((res)=>{
      setData(res.data)
    }).catch(err=>console.log(err))
  }

  const role = ['admin','user']

  const handleChangeRole = async(id,e)=>{
    console.log(id, e.target.value)
    const value = {
      id : id,
      role: e.target.value
    }

    await changeRole(user.user.token,value).then((res)=>{
      loadData(user.user.token)
    }).catch(err=>console.log(err))
  }

  const handleDelete = async(id) => {
    await remove(user.user.token, id).then((res) => {
      loadData(user.user.token);
    }).catch(err => console.log(err));
  };


  return (
    <div className='manage-user-container'>
      <div className='manage-user'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell> {/* Add a column for action */}
              </TableRow>
            </TableHead>
            <TableBody>
            {
              data && data.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Select onChange={(e)=>handleChangeRole(item._id,e)} defaultValue={item.role} style={{width:'100px'}}>
                      {role.map((roleItem) => (
                        <MenuItem key={roleItem} value={roleItem}>{roleItem}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(item._id)} // Pass the user ID to the delete function
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
};

export default ManageUser

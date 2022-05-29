import { TextField } from '@mui/material';
import React,{useEffect, useState} from 'react';
import './edit.component.css';
import {MenuItem, FormControlLabel,Checkbox} from '@mui/material';
import api from "../../api/tables";
import { useParams} from 'react-router-dom';


function Edit() {
  const params = useParams();
  const {id} = params
  console.log(id);

    const [layout, setLayout] = useState("");
    const [name, setName] =useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus]=useState(true);
    const [image, setImage]=useState("");
    const [msg,setMsg]=useState("");

    const editHandler = async(e) =>{
      e.preventDefault();
      if (
          layout===""||
          name === "" ||
          capacity === "" ||
          status === ""||
          image===""
        ) {
          setMsg("Fill all the fields");
        }else{
      const request ={
          layout,
          name,
          capacity,
          status,
    
      }
      console.log("first")
      const config = {
          "Content-type":"application/json"
      }
      const response = await api.put(`/tables/${id}`,request,config)
     console.log(response);
     if (response.status===200){
         alert('Edited');
         window.location.href="http://localhost:3000/manage";

     }
  }
  }
    const layouts = [
        {
          value: "Layout1",
          label: "Layout1"
        },
        {
          value: "Layout2",
          label: "Layout2"
        },
        {
          value: "Layout3",
          label: "Layout3"
        }
      ];
      
  const handleChange = (event) => {
    setLayout(event.target.value);
  };
  function reset(){
    document.getElementById('createform').reset();
  }
  
  const res = async()=>{
    await api.get(`/tables/${id}`).then((response)=>{
      setLayout(response.data.layout);
      setName(response.data.name);
      setCapacity(response.data.capacity);
      setStatus(response.data.status)
         console.log(response.data);
         
       });
     }

     useEffect(()=>{
       res()
      },[ ])
  return (
    <div className='edit'>
    <h2 style={{fontWeight:400}}>Edit Table</h2>
        <form id='Editform'>
    {msg && <div className="errormsg">{msg} </div>}

         <TextField
         style={{ width: "700px", margin: "7px" }}
            id="select name"
            select
            label="Select Label"
            value={layout}
            onChange={handleChange}
            helperText="Please select your layout"
          >
            {layouts.map((layout) => (
              <MenuItem key={layout.value} value={layout.value}>
                {layout.label}
              </MenuItem>
            ))}
          </TextField><br />

        <TextField
            style={{ width: "700px", margin: "7px" }}
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            variant="outlined"
          /> <br/>

           <TextField
            style={{ width: "700px", margin: "7px" }}
            type="text"
            value={capacity}
            onChange={(e)=>setCapacity(e.target.value)}
            variant="outlined"
          /> <br />

            <FormControlLabel 
            control={<Checkbox defaultChecked />} 
            value={status}
            label="Status"
            onChange={(e)=>setStatus(e.target.checked)}
            style={{marginLeft:'8px'}}
            /> 
            <br />

          <TextField
          style={{ width: "700px", margin: "9px 7px" }}
          type="file"
         value={image}
        //  src={URL.EditObjectURL(image)}
        onChange={(e)=>setImage(e.target.value)}
          variant="outlined"
          /> <br/>

        
        </form>
        <button className='edit-button' onClick={editHandler} >Edit Table</button>
        <button className='cancel-button' onClick={reset}>Cancel</button>
    </div>
  )
}

export default Edit;
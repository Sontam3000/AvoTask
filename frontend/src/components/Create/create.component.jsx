import { TextField } from '@mui/material';
import React,{useState} from 'react';
import './create.component.css';
import {MenuItem, FormControlLabel,Checkbox} from '@mui/material';
import api from "../../api/tables";


function Create() {
    const [layout, setLayout] = useState("");
    const [name, setName] =useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus]=useState(true);
    const [image, setImage]=useState("");
    // const [uploading, setUploading] = useState(false);
  //   const [file, setFile] = useState();
  // const [fname, setfName] = useState();
    const [msg,setMsg]=useState("");

    // const uploadFileHandler = async (e) => {
    //   const file = e.target.files[0];
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   setUploading(true);
  
    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     };
    //     const { data } = await api.post('/tables/upload', formData, config);
    //     setImage(data);
    //     setUploading(false);
    //   } catch (error) {
    //     console.error(error);
    //     setUploading(false);
    //   }
    // };
    // const upload =async()=>{
    //   const data = new FormData();
    //   console.log(data);
    //   data.append('name',fname);
    //   data.append('file',file);
    //   console.log(data);
      
    //   await api.post('/tables/imageupload',data).catch(err=>console.log(err));
     
    // }
        const submitHandler = async(e) =>{
            // upload()
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
                status
              
          
            }
            const config = {
                "Content-type":"application/json"
            }
            const response = await api.post("/tables",request,config)
           console.log(response);
           if (response.statusText==="Created"){
               alert('Created');
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

  

  return (
    <div className='create'>
    <h2 style={{fontWeight:400}}>Create Table</h2>
        <form id='createform'>
    {msg && <div className="errormsg">{msg} </div>}
         <TextField
         style={{ width: "700px", margin: "7px" }}
            id="select name"
            select
            label="Select Layouts"
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
            label="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            variant="outlined"
          /> <br/>

           <TextField
            style={{ width: "700px", margin: "7px" }}
            type="text"
            label="Capacity"
            value={capacity}
            onChange={(e)=>setCapacity(e.target.value)}
            variant="outlined"
          /> <br />

            <FormControlLabel 
            control={<Checkbox defaultChecked />} 
            label="Status" 
            value={status}
            onChange={(e)=>setStatus(e.target.checked)}
            style={{marginLeft:'8px'}}
            /> 
            <br />

          <TextField
          style={{ width: "700px", margin: "9px 7px" }}
          type="file"
         value={image}
        //  src={URL.createObjectURL(image)}
        onChange={(e) => setImage(e.target.image)}
          variant="outlined"
          /> <br/>

        
        </form>
        <button className='create-button' onClick={submitHandler}>Create Table</button>
        <button className='cancel-button' onClick={(e)=>window.location.reload()}>Cancel</button>
    </div>
  )
}

export default Create
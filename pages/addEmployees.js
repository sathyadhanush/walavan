import {Table,TextInput,Button,SelectField, Pane, majorScale,TagInput} from 'evergreen-ui'
import React, { useState,useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Url } from "../constants/Global";
import moment from 'moment';
import { useRouter } from "next/router";

 function Employee() {
   const [roles ,setRoles] = useState([]);
    const [values, setValues] = useState([]);
    const router = useRouter();

    const [addemployees, setEmployees] = useState({
        LastName: '',
        FirstName: '',
        DOB: '',
        uuid:'',
        emp_role_id:'',
        email_id:'',
        created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
    });
    const handleClick = async (e) =>  {
      e.preventDefault();
      let data = await axios.post(
        `http://localhost:3000/api/employees`,
        addemployees
      );
      if (data.data) router.push("/Employees");
      setEmployees({
        LastName: "",
        FirstName: "",
       uuid:'',
        DOB: "",
        emp_role_id:"",
        email_id:"",
        created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
      });
    };
    const taghandleClick = (e) =>  {
        console.log(e);
            setValues(e)
            console.log(e.length);  
            
            
    } 
    useEffect(function(){
      axios
      .get(Url +"/api/employeerole")
      .then((response) => setRoles(response.data))
     
     },[]);
     
    return(
        <>
 
      <br/>
      <Table.TextCell >Add Employee</Table.TextCell>
      <Pane display="flex" alignItems="center" marginX={majorScale(10)}>
      <Table maxWidth={500} width="100%">
  <Table.Body height={540}>
      <Table.Row>
        <Table.TextCell>Employee Type</Table.TextCell>
        <Table.TextCell>  <SelectField
        label="A controlled text input field"
        required
        name="emp_role_id"
        
        description="This is a description."
        value={addemployees.emp_role_id}
        onChange={e => setEmployees({ ...addemployees, emp_role_id: e.target.value }) }
      >
       {roles.map((role) =>(
                <option key={role.id} value={role.id}>
                    {role.name}
                    
                </option>
            ))}
                    
          
        
      </SelectField></Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
        First name
        </Table.TextCell>
        <Table.TextCell>
        <TextInput name="text-input-fname" placeholder="Firstname.." 
        onChange={(e) => setEmployees({ ...addemployees, FirstName: e.target.value })}
        value={addemployees.FirstName}
        />
        </Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
        Last name
        </Table.TextCell>
        <Table.TextCell>
        <TextInput name="text-input-lname" placeholder="Lastname.." 
       onChange={(e) => setEmployees({ ...addemployees, LastName: e.target.value })}
        value={addemployees.LastName}
        />
        </Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
        DOB
        </Table.TextCell>
        <Table.TextCell>
        <TextInput name="text-input-DOB" placeholder="DOB.." 
        type="date"
        width="165px"
        onChange={(e) => setEmployees({ ...addemployees, DOB: e.target.value})}
        value={addemployees.DOB}
        InputLabelProps={{
          shrink: true,
        }}
        />
        </Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
       uuid
        </Table.TextCell>
        <Table.TextCell>
        <TextInput name="text-input-uuid" placeholder="uuid.." 
        onChange={(e) => setEmployees({ ...addemployees, uuid: e.target.value })}
        value={addemployees.uuid}
        />
        </Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
        E-mail
        </Table.TextCell>
        <Table.TextCell>
        <TextInput name="text-input-email" placeholder="Emailid.."
        onChange={(e) => setEmployees({ ...addemployees, email_id:e.target.value})}
        value={addemployees.email_id}
        />
        </Table.TextCell>
        </Table.Row>
        <Table.Row>
        <Table.TextCell>
        Answer
        </Table.TextCell>
        <Table.TextCell>
        <TagInput
      tagProps={(value) => {
        if (!value.includes('@@')) return { color: 'Blue' }
        return {color: 'Red'}
      }}
      inputProps={{ placeholder: 'Add email...' }}
      values={values}
      onChange={taghandleClick}
    />
        </Table.TextCell>
      </Table.Row>
      <Table.Row>
        <Table.TextCell>
          Submit the Employee
       </Table.TextCell>
        <Table.TextCell>
            <Button marginRight={16} appearance="primary" onClick={handleClick}>
        Submit
      </Button> 
      </Table.TextCell> 
      </Table.Row>
  </Table.Body>
</Table>
</Pane>

      </>
      
      )
  }
  export default Employee;
  
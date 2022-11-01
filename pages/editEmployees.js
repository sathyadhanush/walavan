import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/AddEmployee.module.css";
import Layout from '../components/Layout';
import {Url } from "../constants/Global"
import moment from 'moment';
import {TextInput,SelectField,TagInput} from 'evergreen-ui';

function EditEmployees({ employeesUpdateData }) {
  console.log("employeesid", employeesUpdateData);
  const router = useRouter();
  const [values, setValues] = useState([]);
  const [roles ,setRoles] = useState([]);
  const [addEmployees, setEmployees] = useState({
    LastName: "",
    FirstName: "",
    uuid: "",
    DOB: "",
    emp_role_id:"",
    email_id:"",
    created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
  });
  useEffect(() => {
    setEmployees(employeesUpdateData[0]);
  }, [employeesUpdateData]);
  const handleClick = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      Url +`/api/employees/${employeesUpdateData[0].id}`,
      addEmployees
    );
    if (data.data) router.push("/Employees");
    setEmployees({
      LastName: "",
      FirstName: "",
      uuid: "",
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
  return (
    <>
    <Layout>
    <label className={styles.label}>EMPLOYEES</label>
      <div className={styles.addform}>
        <h1 className={styles.h1}>EDIT EMPLOYEES</h1>
        <form >
        <div>
          <TextInput name="text-input-fname" placeholder="Firstname.." 
        onChange={(e) => setEmployees({ ...addEmployees, FirstName: e.target.value })}
        value={addEmployees.FirstName}
              />
          </div>
          <br/>
          <div>
          <TextInput TextInput name="text-input-lname" placeholder="Lastname.." 
        onChange={(e) => setEmployees({ ...addEmployees, LastName: e.target.value })}
        value={addEmployees.LastName}
              />
          </div>
          <br/>
          <div>
          <TextInput name="text-input-uuid" placeholder="uuid.." 
        onChange={(e) => setEmployees({ ...addEmployees, uuid: e.target.value })}
        value={addEmployees.uuid}
                
              />
          </div>
          <br/>
          
        
          <br/>
          <div>
          <TextInput name="text-input-email" placeholder="Emailid.."
        onChange={(e) => setEmployees({ ...addEmployees, email_id:e.target.value})}
        value={addEmployees.email_id}
              />
          </div>
          <br/>
          <div style={{
      margin: 'auto',
      display: 'block',
      width: '500px'
    }}>
          <br/>
          <TextInput name="text-input-DOB" placeholder="DOB.." 
        type="date"
        onChange={(e) => setEmployees({ ...addEmployees, DOB: e.target.value})}
        value={addEmployees.DOB}
        InputLabelProps={{
          shrink: true,
        }}
              />
  
            </div>
            <div>
            <br/>
          </div>
          <br/>
          <div>
          <SelectField
        label="Select ther employee"
        required
        name="emp_role_id"
       width="500px"
        value={addEmployees.emp_role_id}
        onChange={e => setEmployees({ ...addEmployees, emp_role_id: e.target.value }) }
      >
       {roles.map((role) =>(
                <option key={role.id} value={role.id}>
                    {role.name}
                    
                </option>
            ))}
                    
          
        
      </SelectField>
          </div>
          <div>
            <button type="submit" className={styles.button}  onClick={handleClick}>
              Submit
            </button>
            <button className={styles.button}>
              <Link href={`/Employees`}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
      </Layout>
    </>
  );
}

export default EditEmployees;

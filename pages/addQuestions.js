import axios from "axios";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/UpdateEmployee.module.css";
import moment from 'moment';
import {Url } from "../constants/Global";

import {TextInput,Button,SelectField,TagInput} from 'evergreen-ui'
function AddQuestions() {
  const router = useRouter();
 
   const [types ,setTypes] = useState([]);
   
  const [addQuestions, setQuestions] = useState({
    name: "",
    image_url: "",
    question_type_id: "",
    is_delete:"0",
    is_active:"1",
    created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
    answers1:"",
    currectans:"",
  

 
 });
 let options = types.map(function (option) {
  return { value: option.id, label: option.name };
})
 
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(addQuestions);
    let data = await axios.post(
        Url +`/api/questions`,    
        addQuestions
    );
    
    if (data.data) router.push("/Questions");
    setQuestions({
      name: "",
      image_url: "",
      question_type_id: "",
      is_delete:"0",
      is_active:"1",
      created: moment().format( 'YYYY-MM-DD HH:mm:ss'),
    
      answers1:"",
      currectans:""
     
        });
  };



 
  useEffect(function(){
    axios
    .get(Url +"/api/question_type")
    .then((response) => setTypes(response.data))

   },[]);
  return (
    <>
   
      <div className={styles.addform}>
        <h1 className={styles.h1}>ENTER QUESTIONS</h1>
        <form >
          <div>
         
            <br/>
           
            <SelectField
        label="Select Questiom type"
        required
        name="question_type_id"
        value={addQuestions.question_type_id}
        onChange={e => setQuestions({ ...addQuestions, question_type_id: e.target.value }) }
      >
       {types.map((type) =>(
                <option key={type.id} value={type.id}>
                    {type.name}
                    
                </option>
            ))}
                    
          
        
      </SelectField>
        <label>Enter the Question</label> 
        <br/>   
      <TextInput name="text-input-name" placeholder="Name.." 
        onChange={(e) => setQuestions({ ...addQuestions, name: e.target.value })}
        value={addQuestions.name}
        />
            
            <br/>
            
              <h1 className={styles.h1}>ENTER ANSWERS</h1>

              
           </div>
           <TagInput
      inputProps={{ placeholder: 'Add Answers...' }}
      value={addQuestions.answers1}
    
      tagProps={{
        color: 'red',
      }}
      onChange={(e) => {
        setQuestions({...addQuestions, name: e.target.value})
      }}
    />
    <br/><br/>

<TagInput
      inputProps={{ placeholder: 'Add Answers...' }}
      value={addQuestions.currectans}
     
      tagProps={{
        color: 'red',
      }}
      onChange={(e) => {
        setQuestions({...addQuestions, name: e.target.value})
      }}
    />
   
         
          
          <div>
          <Button type="submit" className={styles.button} onClick={handleClick}>
              Submit
            </Button>
           
          </div>
          </form>

      </div>
    </>

  );
}

export default AddQuestions;
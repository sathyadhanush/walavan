import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, TextInput, Button, SelectField, Pane, majorScale, TagInput } from 'evergreen-ui'
import {Url } from "../constants/Global"
import Layout from '../components/Layout'

function EditQuestions({ questionsUpdateData }) {
  console.log("questionsid", questionsUpdateData);
 
  const router = useRouter();
  const [types ,setTypes] = useState([]);
  const [editQuestions, setEditQuestions] = useState({
    questions: "",
    q_type_id: "",
    created: "",
    currectanswer:"",
    ansoptions:[],
  });
  const [writenQuestions, setWritenQuestions] = useState({
    correctanswerdata: [],
    questionsData: [],
    answersData:[],
  });

  
  useEffect(() => {
    setEditQuestions(questionsUpdateData[0]);
  
  }, [questionsUpdateData]);

  const handleClick = async (e) => {
    e.preventDefault();
    let data = await axios.put(
      Url+`/api/questions/${questionsUpdateData[0].id}`,
      editQuestions
    );
 
    if (data.data) router.push("/Questions");
    setEditQuestions({
      questions: "",
      q_type_id: "",
      created: "",
      currectanswer:"",
      ansoptions:[],
        });
        
  };
  useEffect(function(){
    axios
    .get( Url+`/api/question_type`)
    .then((response) => setTypes(response.data))
   
   },[]);
  return (
    <>
    <Layout>
     <Pane display="flex" alignItems="center" marginX={majorScale(2)}>
       
       <Table>
         <Table.Head>Edit new Questions</Table.Head>
         <Table.Body height={540}>

           <Table.Row>
             <Table.TextCell>Employee Type</Table.TextCell>
             <Table.TextCell>
             <SelectField
                  required
                  width="100%"
                  defaultValue="Select"
                  name="q_type_id"
                  value={editQuestions.q_type_id}
                  onChange={e => setEditQuestions({ ...editQuestions,q_type_id: e.target.value })}
                >
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}

                    </option>
                  ))}
                </SelectField>

              </Table.TextCell>

            </Table.Row>
            <Table.Row>
              <Table.TextCell>Edit the Questions ?</Table.TextCell>
              <Table.TextCell>
                <TextInput name="text-input-Questions" placeholder="What ?.." width="100%"
                  onChange={(e) => setEditQuestions({ ...editQuestions, questions: e.target.value })}
                  value={editQuestions.questions}
                />

              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell>Edit the Currect answer.</Table.TextCell>
              <Table.TextCell>

                <TextInput name="text-input-Currect-answer" placeholder="Enter Currect-answer.." width="100%"
                  onChange={(e) => setEditQuestions({ ...editQuestions, currectanswer: e.target.value })}
                  value={editQuestions.currectanswer}
                />  

              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell><Button marginRight={16} appearance="primary" onClick={handleClick} >
                Submit
              </Button> </Table.TextCell>
              <Table.TextCell><Button marginRight={16} appearance="primary">
                Cancel
              </Button>  </Table.TextCell>

            </Table.Row>

          </Table.Body>

        </Table>
      </Pane>
      </Layout>
    </>
  );
}

export default EditQuestions;
import axios from "axios";
import { Table, TextInput, Button, SelectField, Pane, majorScale, TagInput } from 'evergreen-ui'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from 'moment';
import { Url } from "../constants/Global";



function AddQuestions() {
  const [ansvalues, setAnsvalues] = useState([]);
  const [cansvalues, setCansvalues] = useState([]);
  const [types, setTypes] = useState([]);

  const router = useRouter();

  const [addQuestions, setQuestions] = useState({
    questions: "",
    q_type_id: "",
    created: moment().format('YYYY-MM-DD HH:mm:ss'),
    currectanswer: "",
    ansoptions: [],


  });
  let options = types.map(function (option) {
    return { value: option.id, label: option.name };
  })


  const handleClick = async(e) => {
    e.preventDefault();
    console.log('*************');

    console.log(addQuestions);
    let data = await axios.post(
      Url +`/api/questions`,    
      addQuestions
  );
  if (data.data) router.push("/Questions");
  setQuestions({
    questions: "",
    q_type_id: "",
    created: moment().format('YYYY-MM-DD HH:mm:ss'),
    currectanswer: "",
    ansoptions: [],
   
      });

  }
  const tagoptionshandleClick = (e) => {
  
    setAnsvalues(e)
    setQuestions({ ...addQuestions, ansoptions: e })
  }


  useEffect(function () {
    axios
      .get(Url + "/api/question_type")
      .then((response) => setTypes(response.data))

  }, []);
  return (
    <>
      <Pane display="flex" alignItems="center" marginX={majorScale(2)}>
       
        <Table>
          <Table.Head>Enter new Questions</Table.Head>
          <Table.Body height={540}>

            <Table.Row>
              <Table.TextCell>Employee Type</Table.TextCell>
              <Table.TextCell>
                <SelectField
                  required
                  width="100%"
                  defaultValue="Select"
                  name="q_type_id"
                  value={addQuestions.q_type_id}
                  onChange={e => setQuestions({ ...addQuestions, q_type_id: e.target.value })}
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
              <Table.TextCell>Enter the Questions ?</Table.TextCell>
              <Table.TextCell>
                <TextInput name="text-input-Questions" placeholder="What ?.." width="100%"
                  onChange={(e) => setQuestions({ ...addQuestions, questions: e.target.value })}
                  value={addQuestions.questions}
                />

              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell>Enter the Currect answer.</Table.TextCell>
              <Table.TextCell>

                <TextInput name="text-input-Currect-answer" placeholder="Enter Currect-answer.." width="100%"
                  onChange={(e) => setQuestions({ ...addQuestions, currectanswer: e.target.value })}
                  value={addQuestions.currectanswer}
                />

              </Table.TextCell>
            </Table.Row>
            <Table.Row>
              <Table.TextCell>Enter the Options answer.</Table.TextCell>
              <Table.TextCell>
                <TagInput width="100%"
                  tagProps={(value) => {
                    return { color: 'Blue' }
                  }}
                  inputProps={{ placeholder: 'Add optional answer...' }}
                  values={ansvalues}
                  onChange={tagoptionshandleClick}
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
    </>
  );
}




export default AddQuestions;
import { executeQuery } from "../../config/db";
import questionsValidation from "../../common/questionsValidator";
import answersValidation from "../../common/answersValidator";
import ErrorHandler from "../../common/errorHandler";

const getAllQuestions = async (req, res) => {
  
  console.log("req",req.query);
   try {
    
     let limit=req.query.limit
     let page=(req.query.page-1)*limit
     console.log(page);
     console.log("all the questions",limit,page);
     let questionsData = await executeQuery(`select * from questions order by id limit ${page},${limit}`);
    const _totalPages = await executeQuery(`select count(1) as count from questions `);
    // console.log(_totalPages);
    // const totalPages=JSON.stringify(_totalPages);
    // console.log(totalPages);
     var obj= JSON.parse(JSON.stringify(_totalPages));
     console.log( obj[0].count);
     res.send({"questionsData":questionsData, "totalPages": obj[0].count});

   } catch (err) {
     res.status(500).json(err);
   }
 };

 const getQuestionsById = async (req, res, next) => {

  let id = req.query.id;
  console.log("answers by id*****",req.query.id);
  try {
    console.log("questions by id");
   
    console.log("********")
    let questionsData = await executeQuery(
      `select name as questions,question_type_id as q_type_id , '' as currectanswer ,'' as ansoptions,${id} as id from questions where id=${id}`,
      []
    );
    console.log(questionsData);
    console.log("setEditQuestions*****",questionsData[0].questions);
    
   
    let correctanswerData = await executeQuery(
      `select answers as currectanswer  from answers where question_id=${id} and iscurrect=1`,
      []
    );
    let answersData = await executeQuery(
      `select answers as ansoptions  from answers where question_id=${id} and iscurrect=0`,
      []
    );
    questionsData[0].currectanswer=correctanswerData[0].currectanswer;
    console.log("answersData*****",answersData);
    console.log("answersData*****",answersData.length);
  let ansoptions = [];
    for (let idx in answersData) {
      ansoptions.push(answersData[idx].ansoptions);
      console.log(`${answersData[idx].ansoptions} has index ${idx}`);
  }
    
   

    questionsData[0].ansoptions=ansoptions;
   // questionsData.push(correctanswerData);
    // questionsData.push(answersData);
    
    console.log("ansoptions*********",ansoptions);
    console.log("questionsData*****",questionsData);
  
    if (questionsData.length > 0)
     res.status(200).json(questionsData);
    else {
      next(new ErrorHandler("no questions found with this id ${id}", 404));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteQuestionsById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let questionsData = await executeQuery(
      "delete from questions where id=?",
      [id]
    );
    res.status(200).json("Questions Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveQuestions = async (req, res) => {
  try {
    console.log("********************************post request1");
    const result = req.body;
    const result1 = req.body;
    console.log(result);
      console.log(result1);


    const { questions, q_type_id, created } = result;
    const { currectanswer,ansoptions } = result1;
   
    let { error } = questionsValidation(result);
    // let { error1 } = answersValidation(result1);
error=false;
    if (error) {
             console.log("post request2");
      res.status(400).json(error.details[0].message);

    } else {
      console.log("post request3");
      console.log("post request");
      let questionsData = await executeQuery(
        "insert into questions(name,image_url, question_type_id, is_delete, is_active, created) values(?,?,?,?,?,?)",
        [questions,"", q_type_id, 1, 1, created]
      );
      console.log("currectans");


  
        let correctanswerData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [currectanswer, questionsData.insertId, "1"]
        );
    
       
        var arrayLength = ansoptions.length;
        for (var i = 0; i < arrayLength; i++) {
            console.log(ansoptions[i]);
            //Do something
        
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [ansoptions[i], questionsData.insertId, "0"]
        );
        }
      

           console.log("**************currectans");


      // questionsData = await executeQuery(
      //   `select * from questions where id=${questionsData.insertId}`
      // );
console.log("question_id",questionsData.insertId)
      // res.status(201).json(questionsData);
  
      res.status(201).json(questionsData);
    }
  } catch (err) {
    console.log("post request4",err);
    res.status(400).json(err);
  }
};

const updateQuestions = async (req, res) => {
  console.log("********************************put request1");

  let id = req.query.id;
  console.log("id", req.query.id);
  const result = req.body;
  const result1 = req.body;
  const { questions, q_type_id, created} = req.body;
    const { currectanswer } =req.body;
    const { ansoptions } =req.body;
    console.log("req.body", req.body);
    console.log("current answer********",currectanswer);
    console.log(" answer********",ansoptions);

let { error } = questionsValidation(result);
    // let { error1 } = answersValidation(result1);

    if (error) {
      console.log("put request2");
res.status(400).json(error.details[0].message);

}
  try {

   
    let   questionsData = await executeQuery(
        `update questions set name=?,image_url=?, question_type_id=?, is_delete=?, is_active=?, created=? where id=${id}`,
        [questions,"", q_type_id, 1, 1, created]
      );
     
 console.log("currectans");
    
       let deleteanswer = await executeQuery(
        `delete from  answers  where question_id=${id}`
      
      );

      let correctanswerData1 = await executeQuery(
        "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
        [currectanswer, id, "1"]
      );
  
     
      var arrayLength = ansoptions.length;
      for (var i = 0; i < arrayLength; i++) {
          console.log(ansoptions[i]);
          //Do something
      
      let answersData1 = await executeQuery(
        "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
        [ansoptions[i], id, "0"]
      );
      }


      console.log("**************currectans");


      // res.status(200).json("question was updated successfullly");
    
   
    }
   catch (err) {
    console.log("put request4",err);
    res.status(400).json(err);
  }
};

export {
  getAllQuestions,
  getQuestionsById,
  deleteQuestionsById,
  saveQuestions,
  updateQuestions,
};
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
  console.log("answers by id",req.query.id);
  try {
    console.log("questions by id");
    let questionsData = await executeQuery(
      `select * from questions where id=${id}`,
      []
    );
    console.log("answers by id");
    let answersData = await executeQuery(
      `select * from answers where id=${id}`,
      []
    );
    if (questionsData.length > 0,answersData.length > 0) res.status(200).json(questionsData,answersData);
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


    const { name, image_url, question_type_id, is_delete, is_active, created } = result;
    const { answers1,currectans } = result1;
   
    let { error } = questionsValidation(result);
    let { error1 } = answersValidation(result1);

    if (error,error1) {
             console.log("post request2");
      res.status(400).json(error.details[0].message);

    } else {
      console.log("post request3");
      console.log("post request");
      let questionsData = await executeQuery(
        "insert into questions(name,image_url, question_type_id, is_delete, is_active, created) values(?,?,?,?,?,?)",
        [name,image_url, question_type_id, 1, 1, created]
      );
      console.log("currectans");


  
      if (currectans=="1")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "1"]
        );
    
      }
      else if  (currectans=="2")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
        );
     
      }
      else if (currectans=="3")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
        );
      
      }

      else if (currectans=="4")
      {
        let answersData1 = await executeQuery(
          "insert into answers(answers, question_id, iscurrect) values(?,?,?)",
          [answers1, questionsData.insertId, "0"]
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
  console.log("id", id);
  const result = req.body;
  const result1 = req.body;
  const { name, image_url, question_type_id, is_delete, is_active, created } = req.body;
    const { answers1,currectans } = req.body
  console.log("req.body", req.body);

let { error } = questionsValidation(result);
    let { error1 } = answersValidation(result1);

    if (error,error1) {
      console.log("put request2");
res.status(400).json(error.details[0].message);

}
  try {
    let questionsData = await executeQuery(
      "select * from questions where id=?",
      [id]
    );
    let answersData = await executeQuery(
      "select * from answers where id=?",
      [id]
    );
    
    if (questionsData.length > 0 & answersData.length > 0) {
      console.log("put request3", questionsData);
      console.log("putrequest", answersData);
      questionsData = await executeQuery(
        `update questions set name=?,question_type_id=?,is_delete=?,is_active=?,created=? where id=${id}`,
        [name, question_type_id, is_delete, is_active, created]
      );
     
 console.log("currectans");
      if (currectans=="1")
      {
       let answersData1 = await executeQuery(
        `update answers set answers=?,question_id=?,iscurrect=? where id=${id}`,
        [ answers1,currectans]
      );

      }
      else if  (currectans=="2")
      {
       let answersData1 = await executeQuery(
        `update answers set answers=?,question_id=?,iscurrect=? where id=${id}`,
        [  answers1,currectans]
      );

      }
      else if (currectans=="3")
      {
       let answersData1 = await executeQuery(
        `update answers set answers=?,question_id=?,iscurrect=? where id=${id}`,
        [ answers1,currectans]
      );
  
      }

      else if (currectans=="4")
      {
       let answersData1 = await executeQuery(
        `update answers set answers=?,question_id=?,iscurrect=? where id=${id}`,
        [  answers1,currectans]
      );
     
      }

      console.log("**************currectans");


      res.status(200).json(questionsData);
    
      res.status(400).json(`questions not found on this id=${id}`);
    }
  } catch (err) {
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
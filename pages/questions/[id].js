import EditQuestions from "../editQuestions";

function updateQuestions({ questions }) {
  console.log("questions,answers", questions);
  return <EditQuestions questionsUpdateData={questions}  />;

}

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/questions/${params.id}`);

  const questions = await res.json();
  console.log("questions=====", questions);
  return {
    props: { questions },
  };
}

export default updateQuestions;

// HELPER FUNCTIONS
const convertFormat = (queryResults) => {
  let finalObj = {
    product_id: queryResults[0].questions.product_id,
    results: [],
  };

  let uniqueQuestions = {};

  for (let i = 0; i < queryResults.length; i++) {
    let currentAnswerId = queryResults[i].answers.answer_id;
    if (uniqueQuestions[queryResults[i].questions.question_id] === undefined) {
      uniqueQuestions[queryResults[i].questions.question_id] = {
        question_id: queryResults[i].questions.question_id,
        question_body: queryResults[i].questions.question_body,
        question_date: queryResults[i].questions.question_date,
        asker_name: queryResults[i].questions.asker_name,
        question_helpfulness: queryResults[i].questions.helpfulness,
        reported: queryResults[i].questions.reported,
        answers: {},
      };
    } else {
      continue;
    }
  }

  let allAnswers = {};

  for (let i = 0; i < queryResults.length; i++) {
    if (allAnswers[queryResults[i].answers.question_id] === undefined) {
      allAnswers[queryResults[i].answers.question_id] = [
        {
          id: queryResults[i].answers.answer_id,
          body: queryResults[i].answers.answer_body,
          date: queryResults[i].answers.answer_date,
          answerer_name: queryResults[i].answers.answerer_name,
          helpfulness: queryResults[i].answers.helpfulness,
        },
      ];
    } else {
      allAnswers[queryResults[i].answers.question_id].push({
        id: queryResults[i].answers.answer_id,
        body: queryResults[i].answers.answer_body,
        date: queryResults[i].answers.answer_date,
        answerer_name: queryResults[i].answers.answerer_name,
        helpfulness: queryResults[i].answers.helpfulness,
      });
    }
  }

  for (let question in uniqueQuestions) {
    for (let i = 0; i < allAnswers[question].length; i++) {
      uniqueQuestions[question].answers[allAnswers[question][i].id] =
        allAnswers[question][i];
    }
  }

  finalObj.results = Object.values(uniqueQuestions);

  return finalObj;
};

module.exports = convertFormat;

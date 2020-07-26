// HELPER FUNCTIONS
const convertFormatQuestions = (queryResults, questionId) => {
  if (queryResults.length < 1) {
    return {
      product_id: questionId,
      results: [],
    };
  }

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

const convertFormatAnswers = (queryResults, questionId) => {
  if (queryResults.length < 1) {
    return {
      question: questionId,
      results: [],
    };
  }

  let finalObj = {
    question: queryResults[0].answers.question_id,
    results: [],
  };

  let allAnswers = {};

  for (let i = 0; i < queryResults.length; i++) {
    if (allAnswers[queryResults[i].answers.answer_id] === undefined) {
      allAnswers[queryResults[i].answers.answer_id] = {
        answer_id: queryResults[i].answers.answer_id,
        body: queryResults[i].answers.answer_body,
        date: queryResults[i].answers.answer_date,
        answerer_name: queryResults[i].answers.answerer_name,
        helpfulness: queryResults[i].answers.helpfulness,
        photos: [],
      };
    } else {
      continue;
    }
  }

  // console.log(allAnswers)

  let allPhotos = {};

  for (let i = 0; i < queryResults.length; i++) {
    if (
      queryResults[i].photos.photo_id !== null &&
      allPhotos[queryResults[i].photos.answer_id] === undefined
    ) {
      allPhotos[queryResults[i].photos.answer_id] = [
        {
          id: queryResults[i].photos.photo_id,
          url: queryResults[i].photos.photo_url,
        },
      ];
    } else if (
      queryResults[i].photos.photo_id !== null &&
      allPhotos[queryResults[i].photos.answer_id] !== undefined
    ) {
      allPhotos[queryResults[i].photos.answer_id].push({
        id: queryResults[i].photos.photo_id,
        url: queryResults[i].photos.photo_url,
      });
    } else {
      continue;
    }
  }

  // console.log(allPhotos);

  for (let answer in allAnswers) {
    for (let photo in allPhotos) {
      if (answer === photo) {
        allAnswers[answer].photos = allPhotos[photo];
      } else {
        continue;
      }
    }
  }

  finalObj.results = Object.values(allAnswers);

  return finalObj;
};

module.exports = {
  convertFormatQuestions: convertFormatQuestions,
  convertFormatAnswers: convertFormatAnswers,
};

import utils from './utils';
import SNSEvent from './sns';

const response = process.env.RESPONSE || 'config/responses.yml';
const images = process.env.IMAGES || 'config/images.yml';

export function handler(event, context, callback) {
  let submission;

  try {
    submission = SNSEvent(event).message;
  } catch (e) {
    console.log(e.message, e.name);
  }

  const reviewResponses = utils.loadYamlFile(response);

  const allowImage = {
    statusCode: 200,
    body: JSON.stringify(reviewResponses.approved),
  };

  const disallowImage = {
    statusCode: 200,
    body: JSON.stringify(reviewResponses.disapproved),
  };

  if (isAllowed(submission)) {
    callback(null, allowImage);
  } else {
    callback(null, disallowImage);
  }
};

function isAllowed(submission) {
  var len = submission.spec.containers;
  for (var i = 0; i < len; i++) {
    var image_repo = submission.spec.containers[i].split(':');
    if (submission.spec.containers[i] == 'asd') {
      return false
    }
  }
  return true;
}

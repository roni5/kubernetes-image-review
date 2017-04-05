class SNSEvent {
  constructor(event) {
    this.event = event;
  }

  containsValidMessage() {
    console.log('SNS | Validating the message');

    return this.event &&
           this.event.Records &&
           this.event.Records[0] &&
           this.event.Records[0].Sns &&
           this.event.Records[0].Sns.Message;
  }

  message() {
    console.log('SNS | Retrieving the message');

    if (this.containsValidMessage()) {
      return this.event.Records[0].Sns.Message;
    } else {
      throw new MessageParseException('Invalid SNS Message');
    }
  }
}

function MessageParseException(message) {
  this.name = 'MessageParseException';
  this.message = message || '';
}

MessageParseException.prototype = Error.prototype;

import config from '../../config';
import sgMail from '@sendgrid/mail';

const otherController = {
  sendToSupport(request, response) {
    const errors = {};
    // eslint-disable-next-line no-useless-escape
    if(/.+\@.+\..+/.test(request.body.email) === false) {
      errors.email = 'Please fill a valid email address !';
    }
    if(request.body.title.length === 0) {
      errors.title = 'Title is required !';  
    }
    if(request.body.text.length === 0) { 
      errors.text = 'Text is required !';    
    }
    if(Object.keys(errors).length > 0) {
      return response.status(401).json({
        errors
      }); 
    }
    sgMail.setApiKey(config.sendgridKey);
    const mailOptions = {
      to: config.supportEmail,
      from: request.body.email,
      subject: request.body.title,
      text: request.body.text,
    };
    sgMail.send(mailOptions);
    return response.status(201).json({
      message: 'Email has been sent successfully !'
    });
  }
};

export default otherController;

'use strict'

app.constant('CONTACT_INFO', {
  'DVO_NUM': '+63 82 224 7793',
  'EMAIL_ADDR': 'info@devpartners.co'
});
app.constant('CONST_SIGNUP', {
  'SIGN_UP_SUCCES_TITLE': 'Request confirmed',
  'SIGN_UP_SUCCES_MESSAGE': 'Welcome and thank you for building your team with us. Check your email to verify and confirm your account. A representative from our Sales team will contact you regarding your project proposal. Looking forward to working with you soon.',
  'VALIDATION_PASSWORD_PATTERN': /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
});
app.constant('CONST_TEAM', {
  'ROLE_IMGS': [
    'assets/images/signup/roles/role-1.png?v=1'
  ],
  'GET_TEAM_FAILED': 'Oops! Something went wrong while preparing your team.',
  'SAVE_TEAM_FAILED': 'We were unable to create your team(s). Please try again later or contact us so we could address this issue right away.',
  'TEAM_NAME': 'Team ',
  'DELETE_TEAM_CONFIRMATION_TITLE': 'Delete team?',
  'DELETE_TEAM_CONFIRMATION_MESSAGE': 'Are you sure you want to delete {0}?',
  'ADD_ROLE_LABEL': 'ADD ROLE',
  'CUSTOM_ROLE_RATE': 15,
  'HOURS_PER_DAY': 8,
  'HOURS_PER_DAY_PART_TIME': 4,
  'WORKING_DAYS_PER_MONTH': 23,
  'DEFAULT_TIMEFRAME_MONTHS': 3,
  'TEAM_INVALID': 'Please build your team.',
  'ESTIMATED_COST_TIP': 'Indicate the role and number of people you need and specify timeframe to generate an estimated cost of the resources you need for this project.'
});
app.constant('GET_STARTED_OPTIONS', {
  'REQUEST_QUOTE': 'request_quote',
  'SCHED_CALL': 'schedule_call'
});
app.constant('CONST_USER', {
  'UPDATE_USER_FAILED': 'Unable to update your profile. Please try again later or contact us so we could address this issue right away.',
  'UPDATE_AVATAR_FAILED': 'Unable to update your profile picture. Please try again later or contact us so we could address this issue right away.',
  'AVATAR_PATH': 'avatars/',
  'LOAD_USER_FAILED': 'Unable to load your profile.'
});
app.constant('CONST_AUTH', {
  'ERROR_LOGIN': 'Unable to login at the moment. Please try again later.',
  'SIGN_IN': 'LOGIN TO DEV PARTNERS',
  'FORGOT_PASSWORD_BTN_LABEL': 'Password Reset',
  'FORGOT_PASSWORD_BTN_LABEL_SUBMITTING': 'Password Reset',
  'FORGOT_PASSWORD_SUCCESS_MSG': 'Instructions to reset your password will be sent to your email.',
  'RESET_PASSWORD_BTN_LABEL': 'Reset Password',
  'RESETTING_PASSWORD_BTN_LABEL': 'Resetting Password',
  'RESET_PASSWORD_SUCCESS_MSG': 'You have successfully reset your password.',
  'RESET_PASSWORD_LINK_INVALID': 'The reset password link is invalid.',
  'EMAIL_VERIFICATION_FAILED': 'Sorry. We failed to verify your email at this time.',
  'EMAIL_VERIFICATION_LINK_INVALID': 'The verification link is invalid.',
  'LOGOUT_CONFIRMATION_TITLE': 'Logout?',
  'LOGOUT_CONFIRMATION_MESSAGE': 'Are you sure you want to logout?',
  'ERROR_LOGOUT': 'Unable to log user out.'
});
app.constant('CONST_AGENT', {
  'INVALID_QUOTE_URL_TITLE': 'Invalid Link',
  'INVALID_QUOTE_URL_MESSAGE': 'The link to edit the quote is invalid. Redirecting to Home Page.',
  'QUOTE_FINALIZED_MESSAGE': 'Quote finalized. The prospect will receive an email shortly.',
  'CREATE_ADMIN_FAILED': 'We were unable to save the new Admin. Please try again later or contact us.',
  'LOAD_ADMIN_FAILED': 'We were unable to load the user\'s info.',
  'DELETE_ADMIN_TITLE': 'Delete {0}?',
  'DELETE_ADMIN_MESSAGE': 'Are you sure you want to delete {0}?',
  'DELETE_ADMIN_FAILED': 'We were unable to delete the admin at the moment. Please try again later.',
  'UPDATE_ADMIN_FAILED': 'We were unable to update the admin at the moment. Please try again later.',
  'COMPLETE_PROFILE_FAILED': 'We were unable to complete your profile at the moment. Please try again later.',
  'COMPLETE_PROFILE_LINK_INVALID': 'The link to complete your profile is invalid.',
  'LOAD_PROFILE_TO_COMPLETE_FAILED': 'We were unable to load your profile at the moment. Please try again later.'
});
app.constant('CONST_BLOG', {
  'SAVE_BLOG_ENTRY_FAILED': 'We were unable to save this post at the moment. Please try again later.',
  'LOAD_BLOG_ENTRY_FAILED': 'We were unable to load the post. Please try again later.',
  'CHANGE_STATUS_FAILED': 'We were unable to update the status of the post. Please try again later.',
  'CHANGE_VISIBILITY_FAILED': 'We were unable to pin the post as featured. Please try again later.',
  'LOAD_ENTRIES_FAILED': 'We were unable to load the posts. Please try again later.',
  'LOAD_FEATURED_ENTRIES_FAILED': 'We were unable to load the featured posts. Please try again later.',
  'LOAD_RECOMMENDATIONS_FAILED': 'We were unable to load the recommended posts. Please try again later.',
  'UPLOAD_IMAGE_FAILED': 'We were unable to upload the image. Please try again later.',
  'UPLOAD_COVER_IMG_FAILED': 'We were unable to upload the cover image. Please try again later.',
  'LIKE_POST_FAILED': 'We were unable to save your like. Please try again later.',
  'UNLIKE_POST_FAILED': 'We were unable to unlike the post. Please try again later.',
  'REVERT_TO_PUBLISHED_CONFIRMATION': 'Are you sure you want to revert your draft to the published version of this post? Your draft will be overwritten.',
  'PUBLISH_CONFIRMATION': 'Are you sure you want to publish this post?',
  'ARCHIVE_CONFIRMATION': 'Are you sure you want to archive this post?',
  'RESTORE_CONFIRMATION': 'Are you sure you want to restore this post?',
  'ARCHIVING_FAILED': 'We were unable to archive this blog post at the moment. Please try again later.',
  'RESTORING_FAILED': 'We were unable to restore this blog post at the moment. Please try again later.',
  'BLOG_ENTRIES': [
    {
      'id': 'simple-historical-powerful-reasons-for-outsourcing',
      'title': "Simple, Historical and Powerful Reasons For Outsourcing",
      'coverImg': "https:/\/media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAq1AAAAJDU5NzRkYTg3LWIzMDctNGMwMC1hYmM3LWVlNjllMDQ0YWZmMw.jpg",
      'coverImgCaption': "Photo: Logistics Viewpoints",
      'datePublished': "2017-07-01T00:00:00+0000",
      'author': {
        'firstName': "Steve",
        'lastName': "Bustin",
        'position': "VP Sales, US. Dev Partners.co"
      },
      'content': "blogPost/entries/simple-historical-powerful-reasons-for-outsourcing.html"
    }, {
      'id': "outsourcing-security-more-than-just-hacking",
      'title': "Outsourcing Security, More Than Just Hacking",
      'coverImg': "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAzVAAAAJDZjMmVkNzZjLTQ3MWItNGIwZC1iMzUwLThkZjc3NDFkMTY4Mw.jpg",
      'coverImgCaption': "Photo: Russia-insider.com",
      'datePublished': "2017-07-10T00:00:00+0000",
      'author': {
        'firstName': "Steve",
        'lastName': "Bustin",
        'position': "VP Sales, US. Dev Partners.co"
      },
      'content': "blogPost/entries/outsourcing-security-more-than-just-hacking.html"
    }
  ]
});
app.constant('CONST_SUBSCRIPTION', {
  'SUBSCRIBE_FAILED': 'We were unable to register your email to our newsletter. Please try again later or contact us.',
  'REGISTERING': 'Registering you to our newsletter. Please wait.',
  'REGISTRATION_SUCCESS': 'Thank you for subscribing to our newsletter!',
  'UNSUBSCRIBE_SUCCESS': 'You have unsusbcribed to our newsletter.',
  'UNSUBSCRIBE_FAILED': 'We were unable to unsubscribe you from our newsletter. Please try again later or contact us.',
  'UNSUBSCRIBE_LINK_INVALID': 'The link to unsubscribe is invalid.',
  'SUBSCRIBE_LABEL': 'SUBSCRIBE',
  'SUBSCRIBED_LABEL': 'SUBSCRIBED!'
});
app.constant('CONST_MEDIA_LIB', {
  'UPLOAD_FAILED': 'We were unable to upload the image. Please try again later.',
  'GET_LIST_FAILED': 'We were unable to get the images. Please try again later.'
});
app.constant('CONST_REQUEST_QUOTE', {
  'REQUEST_SENT_TITLE': 'Request sent',
  'REQUEST_SENT_MESSAGE': 'Thank you for requesting a formal quote from our website. We will get back to you for more information on your requirements. Our Sales reps will offer you a proposal as soon as possible.'
});
app.constant('CONST_SCHED_CALL', {
  'CALL_SCHEDULED_TITLE': 'Appointment requested',
  'CALL_SCHEDULED_MESSAGE': 'Thank you for setting an appointment with us on {0} at {1}. Our Sales reps will contact you soon.'
});
app.constant('CONST_PROMO', {
  'SEND_PROMO_CODE_FAILED': 'Sorry. We were unable to send you the promo code at the moment. Please try again later.',
  'PROMO_CODE_SENT_TITLE': "Promo Code Sent",
  'PROMO_CODE_SENT': "We have just sent you the promo code. Please check your email for details. Thank you."
});
app.constant('CONST_COMMON', {
  'MONETARY_VALUE_PATTERN': /^\s*(?=.*[1-9])\d*(\.\d{0,2})*\s*$/,
  'CONTACT_US_TITLE': 'Contact Us',
  'VIDEO_TITLE': 'Thank you',
  'MESSAGE_SENT_TITLE': 'Message sent',
  'MESSAGE_SENT': 'Thank you for sending us your message or inquiry. For immediate assistance, please live chat or call our sales line or email our customer support.',
  'MESSAGE_FAILED': 'We were unable to send your message. Please try again later.',
  'SEND': 'Send',
  'SENDING': 'Sending',
  'RECAPTCHA_KEY': '6LdUux4UAAAAAMUIgUpHeyzhnMztxkpcG6XzBTGQ',
  'RESOLVE_CAPTCHA': 'Please resolve the captcha before submitting!',
  'GENERIC_ERROR_TITLE': 'Error',
  'GENERIC_SUCCESS_TITLE': 'Success',
  'GENERIC_INVALID_LINK_TITLE': 'Invalid Link',
  'GENERIC_ERROR_MESSAGE': 'Oops! Something went wrong.',
  'GENERIC_FORM_VALIDATION_MESSAGE': 'Please fill out and complete the form before proceeding.',
  'GET_CURRENCIES_FAILED': 'Unable to get the list of supported currencies.',
  'GET_COUNTRIES_FAILED': 'Unable to get the list of countries.',
  'GET_PROJECT_TYPES_FAILED': 'Unable to get the list of project types.',
  'GET_PROJECT_TEMPLATE_FAILED': 'Unable to load the project type.',
  'GET_TIMEFRAMES_FAILED': 'Unable to load the list of timeframes.',
  'LOAD_QUOTE_FAILED_TITLE': 'Quote failed to load',
  'LOAD_QUOTE_FAILED_MESSAGE': 'Unable to load the quote.',
  'INVALID_QUOTE_SUMMARY_URL': 'The link to view the summary is invalid.',
  'SAVE_PROJECT_FAILED': 'Unable to save the project.',
  'UPDATE_QUOTE_PROJECT_FAILED': 'Unable to save the changes to the quote.',
  'APPROVE_QUOTE_FAILED': 'Unable to approve the quote at the moment. Please try again later or contact us.',
  'APPROVE_QUOTE_SUCCESS': 'Quote approved. Thank you for choosing Dev Partners!',
  'NO_QUOTE_FOUND_ERROR': 'No quote was found. Please create a quote first.',
  'STATUS_SUCCESS': 'Success',
  'COMING_SOON_TITLE': 'Launching soon',
  'COMING_SOON_MESSAGE': 'Our developers are coding away to deliver this feature.',
  'ABOUT_US_TITLE': 'About Us'
});
app.constant('CONST_SERVICES', {
  'RECRUITMENT_TITLE': 'Human Resource',
  'SOFTWARE_DEVELOPMENT_TITLE': 'Software Development',
  'UI_UX_DESIGN_STRATEGY_TITLE': 'UI/UX Design & Strategy',
  'MANAGEMENT_TITLE': 'Agile Project Development',
  'PRODUCT_MANAGEMENT_TITLE': 'Product Management',
  'REMOTE_ADMIN_MANAGEMENT_TITLE': 'Remote Virtual Assistance'
});
app.constant('CONST_FORM', {
  'INVALID_INPUTS': 'Invalid inputs',
  'ADD_SUCCESS': 'Entry added.', 
  'DELETE_SUCCESS': 'Entry deleted.', 
  'UPDATE_SUCCESS': 'Entry updated.', 
});
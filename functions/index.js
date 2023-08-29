/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// initialize Stripe client
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const {amount} = data;
  try {
    // const customer = await stripe.customers.create();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // customer: customer.id,
      automatic_payment_methods: {enabled: true},
    });

    // console.log("hello from createPaymentIntent")

    // destructure desired values
    const {client_secret: clientSecret, id} = paymentIntent;

    return {
      id,
      clientSecret,
      amount,
      // customer: customer.id,
      message: 'Created',
    };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error);
  }
});

exports.cancelPaymentIntent = functions.https.onCall(async (data, context) => {
  const {id} = data;
  try {
    await stripe.paymentIntents.cancel(id);
    return {id, message: 'Canceled'};
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error);
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

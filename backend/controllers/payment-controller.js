const uuid4 = require("uuid4");
const request = require("request");

const User = require("../models/User");
const HttpError = require("../models/HttpError");

const headers = {
  Authorization: process.env.PRIVATE_API,
  Simulator: "EXTERNAL",
  "Content-Type": "application/json",
};

// Create Payment Request

const paymentRequest = async (req, callback) => {
  const url = "https://api.test.paysafe.com/paymenthub/v1/payments";

  const data = {
    merchantRefNum: uuid4(),
    amount: req.amount,
    currencyCode: "USD",
    paymentHandleToken: req.token,
    description: "Payment",
  };

  const requestOptions = {
    url: url,
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  };
  request(requestOptions, (err, res, body) => {
    return callback(JSON.parse(body).id);
  });
};

const postPayment = async (req, res, next) => {
  await paymentRequest(req.body, (id) => {
    res.send({ id: id });
  });
};

//Create Customer Pay Id

const customerPayId = async (req, callback) => {
  const url = "https://api.test.paysafe.com/paymenthub/v1/customers";
  const data = {
    merchantCustomerId: req.email + "id2",
    firstName: req.firstName,
    email: req.email,
    phone: req.phone,
  };
  const requestOptions = {
    url: url,
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  };

  request(requestOptions, (err, res, body) => {
    console.log(JSON.parse(body));
    return callback(JSON.parse(body).id);
  });
};

//Create Single Use Customer Token

const singleUseCustomerToken = async (customerId, callback) => {
  const url = "https://api.test.paysafe.com/paymenthub/v1/customers/";

  const data = {
    merchantRefNum: uuid4(),
    paymentTypes: ["CARD"],
  };

  const requestOptions = {
    url: url + customerId + "/singleusecustomertokens",
    headers: headers,
    body: JSON.stringify(data),
    method: "POST",
  };

  request(requestOptions, (err, res, body) => {
    //console.log(JSON.parse(body));
    return callback(JSON.parse(body).singleUseCustomerToken);
  });
};

const postCustomerToken = async (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        await customerPayId(req.body, function (customerId) {
          console.log(customerId);
          const newUser = {
            customerId: customerId,
            email: req.body.email,
          };
          User.create(newUser, async (err, newlyCreated) => {
            if (err) {
              console.log(err);
            } else {
              user = newlyCreated;
              await singleUseCustomerToken(user.customerId, function (result) {
                //console.log(result);
                res.send({ token: result });
              });
            }
          });
        });
      } else {
        console.log(user);
        await singleUseCustomerToken(user.customerId, function (result) {
          //console.log(result);
          res.send({ token: result });
        });
      }
    }
  });
};

exports.postPayment = postPayment;
exports.postCustomerToken = postCustomerToken;

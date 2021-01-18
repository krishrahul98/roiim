const checkout = (token, billingAddress, customer, merchantRefNum, amount) => {
  window.paysafe.checkout.setup(
    process.env.REACT_APP_PAYMENT_API,
    {
      currency: "USD",
      amount: parseInt(amount) * 100,
      singleUseCustomerToken: token,
      locale: "en_US",
      customer: customer,
      billingAddress: billingAddress,
      environment: "TEST",
      merchantRefNum: merchantRefNum,
      canEditAmount: false,
      merchantDescriptor: {
        dynamicDescriptor: "XYZ",
        phone: "1234567890",
      },
      paymentMethodDetails: {
        paysafecard: {
          consumerId: "1232323",
        },
      },
      payout: false,
      payoutConfig: {
        maximumAmount: 100000,
      },
    },
    function (instance, error, result) {
      if (result && result.paymentHandleToken) {
        console.log(result.paymentHandleToken);
        window.$.ajax({
          type: "POST",
          url: process.env.REACT_APP_URL + "/api/payment",
          contentType: "application/json",
          data: JSON.stringify({
            token: result.paymentHandleToken,
            amount: result.amount,
          }),
          success: (data) => {
            if (data.error == null) {
              console.log(data);
              instance.showSuccessScreen("Payment Id: " + data.id);
            } else {
              instance.showFailureScreen("Payment was declined.");
            }
          },
        });
      } else {
        console.error(error);
        alert(error);
        console.error(error);
      }
    },
    function (stage, expired) {
      switch (stage) {
        case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
        case "PAYMENT_HANDLE_CREATED": // Handle the scenario
        case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
        case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
        default: // Handle the scenario
      }
    }
  );
};

export default checkout;

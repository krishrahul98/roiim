const checkout = (billingAddress, customer, amount) => {
  window.paysafe.checkout.setup(
    process.env.REACT_APP_PAYMENT_API,
    {
      currency: "USD",
      amount: parseInt(amount) * 100,
      locale: "en_US",
      customer: customer,
      billingAddress: billingAddress,
      environment: "TEST",
      merchantRefNum: "1559900597607",
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
        // make AJAX call to Payments API
        instance.showSuccessScreen();
      } else {
        console.error(error);
        // Handle the error
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

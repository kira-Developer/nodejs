const { default: Stripe } = require("stripe");

Stripe.setPublishableKey('pk_test_51GzerxJlbcLnQaN1j2weR7uwV8kBGnmbypAjanyjpavAaIDpVVOe41igMdcZQkn4TphnKCxQew49fNsWTWhxUg7P00HoKVl5xl');

stripe.card.createToken({
    number : req.body.num ,
    exp_month : req.body.man,
    exp_year : req.body.yers,
    cvc : req.body.ccv
  });



document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  console.log("loading event listenr...");

  document.querySelectorAll('input').forEach(item => {
    item.addEventListener('blur', event => {
		calcTotals(event);
    })
  })

    let searchParams = new URLSearchParams(window.location.search);
    let opr = searchParams.get('offer_price') || searchParams.get('opr');

    console.log("found opr param: "+opr);
    // bump for pages

    if (opr) {
      opr = Number(opr);
      console.log("setting opr = "+opr);
      document.querySelector('#offer-price').value = opr;
    }

  calcTotals();

});

function calcTotals(event) {
    console.log("calc totals...");

    // ########################################################################
    // Runway
    let cash_bank = document.querySelector('#cash-bank').value;
    // document.querySelector('#first .cap-raise').innerHTML = to_currency(first_cap_raise);
    let monthly_burn = document.querySelector('#monthly-burn').value;

    let runway = cash_bank / monthly_burn;
    document.querySelector('#runway').value = runway.toFixed(1);

    // ########################################################################
    // MRR / ARR
    let mrr = document.querySelector('#mrr').value;
    document.querySelector('#arr').value = to_currency(mrr*12);

    // document.querySelector('#annual-gross-revenue').value = (total_income*12).toFixed(0);

    // ########################################################################
    // Burn Multiple
    let net_burn = document.querySelector('#net-burn').value;

    // document.querySelector('#sba-loan-payment').value = to_currency(payment);

    let net_new_arr = document.querySelector('#net-new-arr').value;
    // let equipment_loans = document.querySelector('#equipment-loans').value;
    // let seller_finance_payments = document.querySelector('#seller-finance-payments').value;

    let burn_multiple = net_burn / net_new_arr;
    document.querySelector('#burn-multiple').value = burn_multiple;

    selectMultiple(burn_multiple);

    // document.querySelector('#total-annual-exp').value = to_currency((total_exp*12).toFixed(0));

    // ########################################################################
    // Compound Growth rate
    let current_month_rev = document.querySelector('#current-month-revenue').value;

    let first_month_rev = document.querySelector('#first-month-revenue').value;
    let total_months = document.querySelector('#total-months').value;

    let cgr = ((current_month_rev/first_month_rev)**(1/total_months));
    cgr = cgr - 1;
    cgr = cgr * 100;
    // let cgr = ((current_month_rev-last_month_rev)/last_month_rev)*100;
    document.querySelector('#compound-growth-rate').value = cgr.toFixed(2);

    // ########################################################################
    // Churn Rate
    let starting_users = document.querySelector('#starting-users').value;

    let ending_users = document.querySelector('#ending-users').value;

    let cr = (starting_users-ending_users)/starting_users;
    // cr = cr - 1;
    cr = cr * 100;
    document.querySelector('#churn-rate').value = cr.toFixed(2);

    // ########################################################################
    // LTV / CAC Ratio
    let ltv = document.querySelector('#lifetime-value').value;

    let cac = document.querySelector('#customer-acq-cost').value;

    let ltv_cac_ratio = ltv/cac;
    // cr = cr - 1;
    // cr = cr * 100;
    document.querySelector('#ltv-cac-ratio').value = ltv_cac_ratio.toFixed(2);

    // ########################################################################
    // run rate
    let tot_monthly_rev = document.querySelector('#total-monthly-revenue').value;

    let rr = tot_monthly_rev / 12;
    document.querySelector('#run-rate').value = rr.toFixed(1);
}

function to_percent(num) {
	if (num) {
		return 	(num / 100);
	}

	return 0;

}

function to_currency(num) {
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	});
	return formatter.format(num);
}

// #############################################################################

function selectMultiple(mult) {

  document.querySelectorAll('.eff-burn').forEach(el => el.classList.remove('selected'))

  if (mult <= 1) {
    document.querySelector('#eff-amazing').classList.add("selected");
  } else if (mult > 1 && mult <= 1.5 ) {
    document.querySelector('#eff-great').classList.add("selected");
  } else if (mult > 1.5 && mult <= 2 ) {
    document.querySelector('#eff-good').classList.add("selected");
  } else if (mult > 2 && mult <= 3 ) {
    document.querySelector('#eff-suspect').classList.add("selected");
  } else if (mult > 3) {
    document.querySelector('#eff-bad').classList.add("selected");
  }

}

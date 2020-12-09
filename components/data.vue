<template>
	<div class="data-table">
		<div class="row">
			<div class="col-md-4 col-sm-6 col-12 ">
				<div id="first_month" class="datapoint-container"></div>
			</div>
			<div class="col-md-4 col-sm-6 col-12">
				<div id="nominal_profit" class="datapoint-container"></div>
			</div>
			<div class="col-md-4 col-sm-6 col-12">
				<div id="real_profit" class="datapoint-container"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 col-sm-6 col-12">
				<div id="number_of_months_to_pay_back_initial" class="datapoint-container"></div>
			</div>
			<div class="col-md-4 col-sm-6 col-12">
				<div id="eac" class="datapoint-container"></div>
			</div>
			<div class="col-md-4 col-sm-6 col-12">
				<div id="real_reinvested_profits" class="datapoint-container"></div>
			</div>
		</div>
	</div>
</template>

<style type="text/css">
	.data-table {
		width:90%;
		margin:auto;
	}
	.datapoint-container {
		border-radius: 25px;
		border: 2px solid #73AD21;
		display: none;
		padding:10px;
		text-align: center;
	}
	.datapoint-container > p {
		margin:2px;
	}
	.row{
		margin-bottom: 10px;
	}
</style>

<script>
export default {}
</script>
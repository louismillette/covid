<template>
	<div class="col-md-6 col-sm-12" style="height: 130px;">
		<p>
			<label for="amount" style="float: left;">{{ name }}: </label>
			<input type="text" style="border:none; max-width: 120px;" v-bind:id="'amount-' + id">
		</p>
		<div v-bind:id="'slider-range-' + id"></div>
		<component is="script">
			$("#slider-range-{{ id }}" ).slider({
					range: false,
					min: {{ min }},
					max: {{ max }},
					value: [ {{ defaultvalue }} ],
					slide: function( event, ui ) {
							$("#amount-{{ id }}" ).val(' {{ prefix }}' + ui.value + '{{ suffix }}');
					}
			});
			$("#amount-{{ id }}" ).val(' {{ prefix }}' + $("#slider-range-{{ id }}" ).slider( "value" ) + '{{ suffix }}' );
			window.components["{{ id }}"] = function () {
				amount = $('#amount-{{ id }}').val();
				return parseFloat(amount.replace('$', '').replace('%', '').replace(' ', '').replace(',', ''));
			}
		</component>
	</div>
</template>

<script>
export default {
	props: ["name", "id", "min", "max", "defaultvalue", "prefix", "suffix"]
}
</script>
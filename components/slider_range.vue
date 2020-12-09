<template>
	<div class="col-md-6 col-sm-12" style="height: 130px;">
		<p>
			<label for="amount" style="float: left;">{{ name }}</label>
			<input type="text" v-bind:id="'amount-' + id">
		</p>
		<div v-bind:id="'slider-range-' + id"></div>
		<component is="script">
			console.log('hello!');
			$("#slider-range-{{ id }}" ).slider({
					range: {{ range }},
					min: {{ min }},
					max: {{ max }},
					values: [ {{ defaultmin }}, {{ defaultmax }} ],
					slide: function( event, ui ) {
							$("#amount-{{ id }}" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
					}
			});
			$("#amount-{{ id }}" ).val(
					$("#slider-range-{{ id }}" ).slider( "values", 0 ) + " - " + $("#slider-range-{{ id }}" ).slider( "values", 1 ) 
			);	
		</component>
	</div>
</template>

<script>
export default {
	props: ["name", "id", "range", "min", "max", "defaultmin", "defaultmax"]
}
</script>
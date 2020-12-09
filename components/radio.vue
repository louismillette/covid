<template>
	<div class="col-md-4 col-sm-12" style="height: 130px;">
		<p>
			<label for="amount" style="float: left;">{{ name }}: </label>
			<input type="text" style="border:none; max-width: 120px;" v-bind:id="id">
		</p>
		<label v-for="option in options" :key="option.key" class="radio-inline">
			<input type="radio" name="optradio" :id='id + "_" + option.key'> {{ option.text }} </input >
		</label>
		<component is="script">
			window.components["{{ id }}"] = function () {
				var options = {{ options }};
				for (i=0, len = options.length; i < len; i++) {
					var option = options[i];
					if (document.getElementById("{{ id }}_" + option.key).checked) {
						return option.key.replace('$', '').replace('%', '').replace(' ', '').replace(',', '');
					}
				}
				return options[0].key.replace('$', '').replace('%', '').replace(' ', '').replace(',', '');
			}
		</component>
	</div>
</template>

<script>
export default {
	props: ["name", "id", "options"]
}
</script>
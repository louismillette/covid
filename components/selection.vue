<template>
  <div>
    <div class="calc-container">
        <div class="row" style="width:100%;margin:auto;">
            <form id="form" onsubmit="return HandleCalculator(event);">
                <slider name="Percent of Covid Tests That are Asymptomatic"
                      id="percent_tests_asymp"
                      min="1"
                      max="100"
                      defaultvalue="50"
                      suffix="%">
                </slider>
                <slider name="Percent of People With Symptoms Who Get a Test"
                      id="percent_sick_get_test"
                      min="1"
                      max="100"
                      defaultvalue="90"
                      suffix="%">
                </slider>
                  <div class="col-sm-12" style="margin-top:50px;">
                    <div class="submit-wrap">
                      <input id="submit" type="submit" value="P(covid|nosymptoms)?">
                    </div>
                  </div>
            </form>
        </div>
    </div>
    <div class="loading" style="text-align: center;"></div>
    <div id="graphcontainer"></div>
    <proof></proof>
  </div>
</template>

<script>
export default {}
</script>
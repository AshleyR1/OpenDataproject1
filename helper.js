function get(id){
  return document.getElementById(id);
}

//Discussion 5: Using concepts of modular programming, create a function that accepts the data, an id to the div to display the chart and the type of chart
function displayChart( data, id, type ){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type:type
    }
  });
}
//Display image uploaded by user
function display(event) {
  let input_image = document.getElementById("input_image");
  input_image.src = URL.createObjectURL(event.target.files[0]);
  document.getElementById("input_image_container").style.display = "block";
}


async function predict_class() {
  let input = document.getElementById("input_image");
  
  classes = [
    "Mackerel",
    "Pink Perch",
    "Pomphret Silver",
    "Prawns",
    "Sardine",
    "Seer",
    "Sole",
    "White Sardine",
  ];
  let step1 = tf.browser
    .fromPixels(input)
    .resizeNearestNeighbor([150, 150])
    .toFloat()
    .div(127.5)
    .sub(tf.scalar(1.0))
    .expandDims(0);

  //const model = await tf.loadLayersModel("model_4_edit.json");
  const model = await tf.loadLayersModel("https://newtonsmama.github.io/FishClassifier/model_4_edit.json");
  const pred = model.predict(step1).dataSync();
 
  console.log(pred);

  var max = pred[0];
  var maxIndex = 0;

  for (var i = 1; i < pred.length; i++) {
    if (pred[i] > max) {
      maxIndex = i;
      max = pred[i];
    }
  }

  let ans = classes[maxIndex];
 
  console.log("End of predict function");
  
  document.getElementsByClassName("output_screen")[0].style.display = "flex";

  let final=`${ans}`+"<br>";
  
  for (var j = 0; j < pred.length; j++) {
    final=final+`${classes[j]} - ${pred[j]}`+"<br>";
  }

  document.getElementById("output_text").innerHTML = final;

  
}
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");


function takeSnap()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);


classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/XeG77Gkf4/model.json', modelLoaded);


function modelLoaded() {
    console.log('Model Loaded!');
}


function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is " + prediction_1;
    speak_data_2 = "And The Second Prediction Is " + prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);

    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "cool")
        {
            document.getElementById("update_emoji_1").innerHTML = "&#129304;";
        }
        if(results[0].label == "thumps up")
        {
            document.getElementById("update_emoji_1").innerHTML = "&#128077;";
        }
        if(results[0].label == "ok")
        {
            document.getElementById("update_emoji_1").innerHTML = "&#128076;";
        }
        if(results[1].label == "cool")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#129304;";
        }
        if(results[1].label == "thumps up")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if(results[1].label == "ok")
        {
            document.getElementById("update_emoji_2").innerHTML = "&#128076;";
        }
    }
}
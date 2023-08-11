const protection = [
    "Accompanying you to an appointment with a doctor who hasn't been taking your symptoms seriously",
    "Standing up to an abusive family member/friend when they unfairly criticize you",
    "Helping you confront your landlord when they violate the terms of your lease",
    "protection"
];
const phys_care = [
    "Cleaning and putting a band-aid on your wound",
    "Giving you a hug when they can tell you're upset",
    "Putting your jacket on for you",
    "phys_care"
];
const words_aff = [
    "Giving you specific & genuine compliments about a piece of art you worked hard on",
    "Praising you for getting a raise at your job",
    "Congratulating you when you're able to do something that's difficult for you, no matter how small",
    "words_aff"
];
const acceptance = [
    "Saying 'It's ok!' and cleaning up the broken glass when you accidentally drop a cup",
    "Reacting calmly & considering your opinions when you express disagreement with them",
    "Saying 'No worries, we can get it tomorrow' when you forget something they asked you to get at the grocery store",
    "acceptance"
];
const comfort = [
    "Comforting you & encouraging you to get treatment when you display signs of mental illness",
    "Letting you cry when you're upset and doing their best to make you feel better, not just to get you to stop crying",
    "Encouraging you to vent about a situation that's upsetting you and fully listening to what you have to say",
    "comfort"
];
const care_needs = [
    "Packing you a lunch for work/school every day without you having to ask",
    "Consistently buying you your favorite food whenever they go to the grocery store",
    "Filling your car with gas when you mention offhandedly that it's almost out",
    "care_needs"
];
const indep = [
    "Trusting you to go on a trip with your friends",
    "Supporting you when you get your dream job, even though you'd have to move far away to take it",
    "Letting you drive their car without worrying",
    "indep"
];
const quality_time = [
    "Clearing their schedule to do one of your favorite activities together",
    "Planning a meal together every week/month",
    "Being down to go to a restaurant/museum/concert you suggest, even if they don't know much about it",
    "quality_time"
];

var scores = [];
scores.push({label: 'quality time', score: 0, desc:
            "Others foster quality time by making an intentional effort to do things with you, whether it's something you suggest or something you both like. They commit to finding time to hang out with you, take initiative in planning, and keep their promises to spend time with you."
            });
scores.push({label: 'independence', score: 0, desc: 
            "Others respect your independence by trusting that you'll be able to succeed at doing things alone without help. They don't warn you about the 'dangers' of your plans, demand that you reconsider, or pressure you to bring them along."
            });
scores.push({label: 'acts of service', score: 0, desc: 
            "Others carry out acts of service by completing parts of your daily routine/chores for you. They notice the details of your rountine, pay attention to problems you mention, or anticipate your future needs and address them without you asking."
            });
scores.push({label: 'emotional support', score: 0, desc: 
            "Others provide emotional support by comforting you and working to understand you when you're in emotional pain. They acknowledge that negative emotions are part of life, don't pressure you to be happy when you're not, and don't punish you for being sad or expressing symptoms of mental illness."
            });
scores.push({label: 'acceptance', score: 0, desc: 
            "Others express acceptance by acknowledging your minor mistakes/different opinions and reacting neutrally or with kindness instead of getting angry. They don't blow up at small errors or forgetfulness and try to solve the resulting problem instead of yelling at you."
            });
scores.push({label: 'words of affirmation', score: 0, desc: 
            "Others offer words of affirmation when they give you genuine, specific, and well-thought-out compliments or congratulations. This also includes noticing the details of your achievements as well as your 'small victories'."
            });
scores.push({label: 'touch', score: 0, desc: 
            "Others can use touch to provide support or express positive emotions. Someone might help you by physically addressing a problem, such as by putting a band-aid on a wound, putting your jacket on for you, or giving you a hug."
            });
scores.push({label: 'protection', score: 0, desc: 
            "Other provide protection by helping you address conflicts and taking action when you're treated unfairly. They might accompany you to speak with authority figures who don't take you seriously or help you stand up against mistreatemnt by family/landlords/bosses."
            });

function printButtons(category, question_num) {
    var nextrow = '';
    for (let i = 0; i < 5; i++) {
        var my_id = question_num + category[3] + i;
        var name = question_num + category[3];
        var test = "<td><input type='radio'" + 
             " id=" + my_id + " name=" + name + " value=" + my_id + "></td>";
        nextrow = nextrow + test;
    }
    nextrow = nextrow + "</tr>"
    return nextrow;
} 

function printRow(category, question_num, idx) {
    var question = "<tr><td>" + category[idx] + "</td>";
    let options = printButtons(category, question_num);
    var final = question + options;
    return final;
}

// the 5 options per question
function check_checked(id_name) {
    var greatest = 0;
    for (let j = 0; j < 5; j++) {
        if (document.getElementById(id_name + j).checked) {
            return j + 1;
        }
    }
    return -1;
}

function generateAnalysis(sorted_scores) {
    var name = "";
    var desc = "";
    var fulltxt = "";
    for (let i = 0; i < 8; i++) {
        name = "<div class='bubbles' id='bubble" + i + "'><h2 class='scores'>" + sorted_scores[i].label + ": " + sorted_scores[i].score + "</h2>";
        fulltxt += name;
        desc = "<p>" + sorted_scores[i].desc + "</p></div>";
        fulltxt += desc;

    }
    fulltxt = "<div id='explanations'>" + fulltxt + "</div>";
    document.getElementById("analysis").innerHTML = fulltxt;
}

function displayData(sorted_scores) {
   //var theChart = "<canvas id='myChart'></canvas>";
    var theMain = document.getElementById('main');
    theMain.style.display = "none";

    var mychartmine = document.getElementById("allResults");
    mychartmine.style.display = "block";

    var resultshead = document.getElementById("resultsHeading");

    resultshead.innerHTML = "<h1><i>✧ you are most emotionally bruised by " + sorted_scores[0].label  + "!</i></h1>";

    const ctx = document.getElementById('myChart');

    // extract scores
    let scores_list = scores.map(a => a.score);
    // extract labels
    let labels_list = scores.map(a => a.label);

    Chart.defaults.font.size = 10;
    Chart.defaults.font.family = "Mono, monospace";
    Chart.defaults.font.style = "italic";
    Chart.defaults.font.weight = '600';

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels_list,
            datasets: [{
               data: scores_list,
               backgroundColor: ['#7b74e3', '#a474e3', '#dd74e3', '#fa5cc5', '#e37499', '#e37477', '#e38374', '#e3af74'],
               borderColor: '#fffcf5',
               borderWidth: 3,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
          scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    color: "#29285e",
                    maxRotation: 45,
                    minRotation: 45,
                }
            },
            y: {
                grid: {
                    display: false,
                },
                border: {
                    display:false,
                },
                ticks: {
                    display: false,
                },
            },
              beginAtZero: true
            }
          }
      });
      
    generateAnalysis(sorted_scores);
}

// same order as type names
function score(scores) {
    var type_names = ["quality_time", "indep", "care_needs", "comfort", "acceptance", "words_aff", "phys_care", "protection"];
    var id_name = '';
    var greatest = 0;
    var greatest_idx = 0;
    // the 8 types
    for (let k = 0; k < 8; k++){
        // the 3 prompts for each type
        for (let i = 1; i < 4; i++) {
            id_name = i + type_names[k];
            let to_add = check_checked(id_name);
            if (to_add == -1) {
                alert("Fill everything out before submitting again.");
                return;
            } else {
                scores[k].score = scores[k].score + to_add;
            }
        }
   }
   var sorted_scores = scores.sort(({score:a}, {score:b}) => b-a);
   displayData(sorted_scores);
}


const question1 = document.getElementById("quiz");
var table = "<table class='center'><tr><th>✧ ✧ statement ✧ ✧</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>";
let q1 = printRow(quality_time, '1', 0);
let q2 = printRow(indep, '1', 0);
let q3 = printRow(care_needs, '1', 0);
let q4 = printRow(comfort, '1', 0);
let q5 = printRow(protection, '1', 0);
let q6 = printRow(phys_care, '1', 0);
let q7 = printRow(words_aff, '1', 0);
let q8 = printRow(acceptance, '1', 0);

let q9 = printRow(protection, '2', 1);
let q10 = printRow(quality_time, '2', 1);
let q11 = printRow(acceptance, '2', 1);
let q12 = printRow(words_aff, '2', 1);
let q13 = printRow(comfort, '2', 1);
let q14 = printRow(phys_care, '2', 1);
let q15 = printRow(indep, '2', 1);
let q16 = printRow(care_needs, '2', 1);

let q17 = printRow(acceptance, '3', 2);
let q18 = printRow(indep, '3', 2);
let q19 = printRow(quality_time, '3', 2);
let q20 = printRow(care_needs, '3', 2);
let q21 = printRow(words_aff, '3', 2);
let q22 = printRow(comfort, '3', 2);
let q23 = printRow(phys_care, '3', 2);
let q24 = printRow(protection, '3', 2);



var rest = "</table>";
//printthis += buttons;
question1.innerHTML = table + q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 +
                        q9 + q10 + q11 + q12 + q13 + q14 + q15 + q16 +
                        q17 + q18 + q19 + q20 + q21 + q22 + q23 + q24
                        + rest;

/*                       
const thecanv = document.getElementById("chartbox");
thecanv.style.display="none";*/

//var index = Math.floor(Math.random() * 3);
//var output = [];
//output.push('<td>' + quality_time[index] + '</td>');

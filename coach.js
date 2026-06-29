// =========================================
// AI COACH
// =========================================

const generateCoachBtn = document.getElementById("generateCoachBtn");

generateCoachBtn.addEventListener("click", async function () {

    generateCoachBtn.innerText = "Generating...";
    generateCoachBtn.disabled = true;

    try {

        const response = await fetch("http://localhost:3000/generate-coach", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prompt: `
Return ONLY valid JSON.

{
"plan":["","",""],
"avoidance":{
"task":"",
"count":"",
"reason":""
},
"reasoning":["","",""],
"confidence":80,
"risk":"",
"confidenceReason":""
}

Generate productivity advice for a student who is studying DBMS, DSA and working on a Hackathon.
`

            })

        });

        const data = await response.json();

        const coach = data.coach;

// ===============================
// Today's Plan
// ===============================

document.getElementById("coachPlan").innerHTML = "";

coach.plan.forEach(function (item) {

    const li = document.createElement("li");

    li.innerText = item;

    document.getElementById("coachPlan").appendChild(li);

});

// ===============================
// Avoidance
// ===============================

document.getElementById("avoidanceTask").innerText =
    coach.avoidance.task;

document.getElementById("avoidanceCount").innerText =
    "Missed - " + coach.avoidance.count + " Times";

document.getElementById("avoidanceReason").innerText =
    coach.avoidance.reason;

// ===============================
// AI Reasoning
// ===============================

document.getElementById("reasoningList").innerHTML = "";

coach.reasoning.forEach(function (reason) {

    const li = document.createElement("li");

    li.innerText = reason;

    document.getElementById("reasoningList").appendChild(li);

});

// ===============================
// Confidence
// ===============================

document.getElementById("confidenceValue").innerText =
    coach.confidence + "%";

document.getElementById("confidenceBar").style.width =
    coach.confidence + "%";

// ===============================
// Risk
// ===============================

const risk = document.getElementById("riskLevel");

risk.innerText = coach.risk;

risk.classList.remove(
    "ff-risk-alert-low",
    "ff-risk-alert-medium",
    "ff-risk-alert-high"
);

if (coach.risk === "Low") {
    risk.classList.add("ff-risk-alert-low");
}

if (coach.risk === "Medium") {
    risk.classList.add("ff-risk-alert-medium");
}

if (coach.risk === "High") {
    risk.classList.add("ff-risk-alert-high");
}

// ===============================
// Reason
// ===============================

document.getElementById("confidenceReason").innerText =
    coach.confidenceReason;

    } catch (error) {

        console.error(error);

    }

    generateCoachBtn.innerText = "Generate AI Analysis";
    generateCoachBtn.disabled = false;

});
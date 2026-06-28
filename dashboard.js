// =========================================
// DASHBOARD AI
// =========================================

console.log("Dashboard JS Loaded!");

const generatePlanBtn = document.getElementById("generatePlanBtn");

console.log(generatePlanBtn);

generatePlanBtn.addEventListener("click", async function () {

    console.log("Button clicked");

    try {

        const response = await fetch("http://localhost:3000/generate-plan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: "Create a productivity plan for today for a student with DBMS, DSA and Hackathon tasks."
            })
        });

        const data = await response.json();

        document.getElementById("aiInsightText").innerText = data.plan;

    } catch (error) {

        console.error(error);

    }

});
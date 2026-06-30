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
                prompt: `
Create today's study plan.

Tasks:
- DBMS
- DSA
- Hackathon

Rules:
- Exactly 5 bullet points.
- Under 8 words per bullet.
- One motivational sentence at the end.
- No paragraphs.
- No headings.
- Maximum 50 words.
`
            })
        });

        const data = await response.json();

        document.getElementById("aiInsightText").innerText = data.plan;

    } catch (error) {

        console.error(error);

    }

});
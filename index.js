const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
    const intent = req.body.queryResult.intent.displayName;
    let responseText = "I'm not sure how to help with that.";

    if (intent === "Set Medication Reminder") {
        const reminderTime = req.body.queryResult.parameters["time"]; // Adjust parameter name if needed
        if (reminderTime) {
            responseText = `Got it! I will remind you to take your medication at ${reminderTime}.`;
        } else {
            responseText = "What time should I set your reminder for?";
        }
    }

    res.json({ fulfillmentText: responseText });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

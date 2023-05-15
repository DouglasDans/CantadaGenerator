require('dotenv').config();

function fetchAPI(msg){
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer  ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: msg}],
            max_tokens: 100,
        })
    }
    try {
        console.log(options);
        return fetch('https://api.openai.com/v1/chat/completions', options)
            .then(response => response.json())
            .then(data => (data))
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchAPI
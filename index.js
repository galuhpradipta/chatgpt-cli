import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import readline from "readline"


config()
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

const model = "gpt-3.5-turbo"
const role = "user"

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async (line) => {
    const res = await openai.createChatCompletion({
            model: model,
            messages: [{ role: role, content: line }]
        })

    console.log(res.data.choices[0].message.content)
    userInterface.prompt()
})


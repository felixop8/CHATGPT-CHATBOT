import openai from "./config/open-ai.js"
import readlineSync from 'readline-sync'
import colors from 'colors'

const main = async () => {
    console.log(colors.bold.green('Welcome to the GPT-3 Chatbot!'))
    console.log(colors.bold.green('You can start chatting with the bot.'))

    const chatHistory = [] // Stores chat history

    while (true) {
        const input = readlineSync.question(colors.bold.yellow('You: '))
        try {
            // Constructs messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({role, content}))

            // Add latest user input
            messages.push({"role": "user", "content": input})

            // Call the API with user input
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages
            })

            // Get completion text/content and print it
            const completion = chatCompletion.choices[0].message.content

            if(input.toLocaleLowerCase() === 'exit') {
                console.log(colors.bold.green('AI: ') + completion)
                break
            }

            console.log(colors.green('AI: ') + completion)

            // Update history with latest user input and AI response
            chatHistory.push(["user", input], ["assistant", completion])

        } catch (error) {
            console.error(colors.red(error))
        }

    }
}

main()
/**
 * A chatbot program that uses the GPT-3 model to chat with users.
 * The program prompts the user for input and sends it to the GPT-3 model for processing.
 * The model generates a response based on the input and the chat history.
 * The chat history is stored and updated with each user input and model response.
 * The program continues to prompt the user for input until the user enters "exit".
 * The program uses the openai package to interact with the GPT-3 model.
 * The readline-sync package is used to read user input from the console.
 * The colors package is used to add color to the console output.
 */
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
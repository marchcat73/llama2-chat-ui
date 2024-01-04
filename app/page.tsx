"use client"
import {useState} from "react"

export default function Home() {
	const [resData, setResData] = useState<any>("")

	const [message, setMessage] = useState<any>(null)

	const sendMessage = async () => {
		const messages = [
			{
				content: "You are a helpful assistant.",
				role: "system"
			},
			{
				content: `${message}`,
				role: "user"
			}
		]
		const res = await fetch("http://localhost:3000/api/chat/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({messages})
		})

		const data = await res.json()

		if (data && data.choices) {
			console.log(data.choices)
			setResData(data.choices[0].message.content.toString())
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>{resData}</div>
			<form>
				<textarea
					className="textarea"
					rows={2}
					cols={8}
					// value=""
					// onBlur={(e) => setMessage(e.target.value)}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</form>
			<button
				onClick={() => sendMessage()}
				disabled={!message}
				className="sendButton"
			>
				Submit
			</button>
		</main>
	)
}

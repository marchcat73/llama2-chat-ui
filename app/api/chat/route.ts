export async function POST(req: Request) {
	let {messages} = await req.json()

	console.log(messages)

	const res = await fetch("http://192.168.1.117:8000/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({messages})
	})

	const data = await res.json()

	return Response.json(data)
}

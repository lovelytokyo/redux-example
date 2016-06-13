export default {
	increment: () => {
		console.log("action")
		return { type: 'INCREMENT' }
	}
}
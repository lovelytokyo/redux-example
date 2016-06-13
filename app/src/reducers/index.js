// 初期ステート設定
const initialState = {
	fuga: 0
}

export default function reducer(state = initialState, action) {
	console.log("reducer")
	console.log("state:",state)
	console.log("action:",action)
	switch(action.type) {
		case 'INCREMENT': {
			return { fuga: state.fuga + 1 }
		}
		default:
			return state
	}
}

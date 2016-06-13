# reduxサンプルカウンターアプリ

## 経緯
reduxとreactの流れを理解するため


### 初期描画時の流れ

1. endpoint [index.js]

	- reactにstoreが参照できるよう、Providerを使ってstoreを渡す
	- root要素に作成したApp(containers)を流し込む


    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import configureStore from './store/configureStore';
    import App from './containers/app';

    const store = configureStore();
    const rootEl = document.getElementById('root') // 流しこむ対象の要素

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootEl
    );
    ```

2. store [store/configureStore.js]

	- storeを作成する

    ```
    import { createStore } from 'redux';
    import reducer from '../reducers/index';

    export default function configureStore() {
        const store = createStore(reducer);
        return store;
    }
    ```

3. reducer [reducers/index.js]

    - stateとactionを受け取って、actionによって新しいstateを作成して返却する

    ```
    // 初期ステート設定
    const initialState = {
        fuga: 0
    }

    export default function reducer(state = initialState, action) {
        switch(action.type) {
            case 'INCREMENT': {
                return { fuga: state.fuga + 1 }
            }
            default:
                return state
        }
    }

    ```

4. container  [containers/app.js]

	- React componentsとReduxを繋ぐ
	- mapStateToProps [redux→react] storeのstateをreactで使えるようにpropsにmappingしてくれる
	- mapDispatchToProps [react→redux] reactのviewの中のactionが起きた祭に、reduxのどのactionをdispatchするかmappingする


    ```
    import React from 'react'
    import { connect } from 'react-redux'
    import App from '../components/app'
    import AppActions from '../actions/app'

    function mapStateToProps(state) {
    	return state
    }

    function mapDispatchToProps(dispatch) {
    	return {
    		handleClick: () => { dispatch(AppActions.increment()) }
    	}
    }

    //connectでReduxとReactコンポーネントを繋ぐ
    export default connect(
    	mapStateToProps,
    	mapDispatchToProps
    )(App)
    ```

5. component [components/app.js]
	- viewにrenderingする要素を返す
	- this.propsでredux側のstateが使える

    ```
    import React from 'react';

    export default class App extends React.Component {
        render() {
            return (
                <div>
                    <span>{this.props.fuga}</span><br/>
                    <button onClick={ () => this.props.handleClick() }>＊増加＊</button>
                </div>
            );
        }
    }
    ```

### actionが起きた時の流れ

1. viewで`*増加*`ボタンを押す

	- button onClickイベントでhandleClickが実行され、incrementアクションがreducerにdispatchされる

    ```
    function mapDispatchToProps(dispatch) {
        return {
            handleClick: () => { dispatch(AppActions.increment()) }
        }
    }
    ```

2. action [actions/app.js]

	- actionのtypeを返却する

    ```
    export default {
        increment: () => {
            return { type: 'INCREMENT' }
        }
    }
    ```

3. reducer [reducers/index.js]

	- actionのtypeを判別して、新しいstateを返却する

	```
	export default function reducer(state = initialState, action) {
		switch(action.type) {
			case 'INCREMENT': {
				return { fuga: state.fuga + 1 }
			}
			default:
				return state
		}
	}
	```

4. container [containters/app.js]

	- mapStateToPropsでreducerから受け取ったstateをreactで参照できるようにpropsにmappingする

	```
	import React from 'react'
	import { connect } from 'react-redux'
	import App from '../components/app'
	import AppActions from '../actions/app'

	function mapStateToProps(state) {
	    return state
	}

	function mapDispatchToProps(dispatch) {
	    return {
	        handleClick: () => { dispatch(AppActions.increment()) }
	    }
	}

	//connectでReduxとReactコンポーネントを繋ぐ
	export default connect(
	    mapStateToProps,
	    mapDispatchToProps
	)(App)
	```

5. components [components/app.js]

	- this.propsから表示に必要な要素を参照する

## 実行
 - browserifyでビルドする（`dist/bundle.js`生成）
 `browserify src/index.js -o dist/bundle.js -t babelify --presets`

 - `index.html`を開く

## 参考サイト
http://qiita.com/pentamania/items/859fe5f2f7e9cf12d6ca
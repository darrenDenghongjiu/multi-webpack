import React from "react";
import ReactDOM from "react-dom";
/*统一使用公共模块*/
class Customerhome extends React.Component{
	constructor(props) {
		super(props);
		
		
	}
	componentDidMount(){

	}
	render(){
		return (
				<div>
					都是法师打
				</div>
				);
	}
}
ReactDOM.render(<Customerhome />,document.getElementById('customerhome'));

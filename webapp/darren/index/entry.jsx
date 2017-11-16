import React from "react";
import ReactDOM from "react-dom";
import { Slider, Switch } from 'antd';

class Main extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {  
			header:[{title:'首页',href:'https://www.baidu.com/'},{title:'眸事资讯',href:'1'},{title:'帮助中心',href:'1'},{title:'服务商',href:'1'}],
		};
			//alert(123456);
		//this.init();
	}
	init(){
		
	}
	render(){
		return (
		<div className="name">
			觉得拉克风景撒旦看风景
		</div>
		);
	}
}

ReactDOM.render(<Main />,document.getElementById('main'));



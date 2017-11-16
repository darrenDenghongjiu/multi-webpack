import React from "react";
import ReactDOM from "react-dom";
/*目标人群模块*/

class Industry extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			startIndustry:[
				{name:'教育行业',nfiid:1},
				{name:'汽车行业',nfiid:2},
				{name:'金融行业',nfiid:3},
				{name:'互联网',nfiid:4},
				{name:'医美行业',nfiid:5},
				{name:'其他行业',nfiid:6}
			],
			startIndustryHtml:'',
			isLoad:false
			
		}
	
		
	}
	render(){
		return(
		<div className="getsource-box">
			士大夫就拉斯达克放假了
		</div>
		);
	}
}

ReactDOM.render(<Industry />,document.getElementById('content'));

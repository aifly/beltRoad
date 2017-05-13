import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			hours:-1,
			mins:-1,
			date:-1,
			month:-1,
			day:-1,
			showDialog:0,
			displayIndex:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			background:'url(./assets/images/bg.jpg) no-repeat center top / cover'
		}

		var className1 ={};
		var className2 = {};
		var className3 = {};
	 	
	 	if(this.state.displayIndex===1){

	 		switch(this.state.showDialog){
				case 0:
				className1 = 'show';
				className2 = 'bottom';
				className3 = '';
				break;
				case 1:
				className1 = 'bottom';
				className2 = '';
				className3 = 'show';
				break;
				case 2:
				className1 = '';
				className2 = 'show';
				className3 = 'bottom';
				break;

			}
	 	}
	 	if(this.state.displayIndex=== 0){
	 		className1 = 'show';
			className2 = '';
			className3 = '';
	 	}

		
		return (
			<div ref='zmiti-index-main-ui' className={'zmiti-index-main-ui '+ this.props.className} style={mainStyle}>
				<img onTouchTap={this.entryTalk.bind(this)} className={'zmiti-index-dialog '+className1} src='./assets/images/dialog.png'/>
				<img onTouchTap={this.entryTalk.bind(this)} className={'zmiti-index-dialog '+className2} src='./assets/images/dialog.png'/>
				<img onTouchTap={this.entryTalk.bind(this)} className={'zmiti-index-dialog '+className3} src='./assets/images/dialog.png'/>
				{
					this.state.hours!== -1 && <div className='zmiti-index-date'>
					<div className='zmiti-index-time'>{this.state.hours}<span>:</span>{this.state.mins}</div>
					<div className='zmiti-index-day'>{this.state.month}月{this.state.date}日 {this.state.day}</div>
				</div>
				}

				<div className='zmiti-swipe-C'>
					<img className='zmiti-index-info' src='./assets/images/info.png'/>
					<img className='zmiti-index-logo' src='./assets/images/logo.png'/>
					<span>向上滑动进入</span>
				</div>
			</div>
		);
	}


	fillDate(){

		let {obserable } = this.props;
        var s = this;
        
        var arr = ['日','一','二','三','四','五','六']
        var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = date.getDay();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var seconds = date.getSeconds();
            hours < 10 && (hours = '0'+hours);
            mins < 10 && (mins = '0'+mins);
            seconds < 10 && (seconds = '0'+seconds);
            
            this.setState({
            	month,
            	hours,
            	mins,
            	
            	date:day,
            	day:'星期'+arr[week]
            });
            var s = this;
            var iNow = 0;
           setTimeout(()=>{
	           	this.setState({
	           		displayIndex:0,
	           	})
	           	obserable.trigger({
					type:'playAudio'
				});
           },1000)

        this.t = setInterval(function(){


                date = new Date();
                hours = date.getHours();
                mins = date.getMinutes();
                seconds = date.getSeconds();
                hours<10 && (hours = '0'+hours);
                mins<10 && (mins = '0'+mins);
                seconds<10 && (seconds = '0'+seconds);

                s.hours = hours;
                s.mins = mins;

                if(seconds === '00'){
                	year = date.getFullYear();
                    month = date.getMonth()+1;
                    day = date.getDate();
                    s.setState({
                    	month,
		            	hours,
		            	mins,
		            	date:day,
		            	day:'星期'+arr[week]
                    });
                }
                if(mins === 0 && hours === 0 && seconds === 0){
                    year = date.getFullYear();
                    month = date.getMonth()+1;
                    day = date.getDate();
                    s.setState({
                    	month,
		            	hours,
		            	mins,
		            	date:day,
		            	day:'星期'+arr[week]
                    });
                }
                iNow++;
                setTimeout(()=>{
            		s.setState({
						showDialog:iNow%3,
						displayIndex:1
					},()=>{
						console.log(s.state.showDialog)
					});
            	},iNow%3*100)
                
				obserable.trigger({
					type:'playAudio'
				});

        },3000);

    }

    swipe(){
    	
    	$(this.refs['zmiti-index-main-ui']).on('touchstart',(e)=>{
    		var e = e.originalEvent.changedTouches[0];
    		var startY = e.pageY,
    			startX = e.pageX;
    		$(this.refs['zmiti-index-main-ui']).on('touchmove',(e)=>{
    			
    		}).on('touchend',e=>{
    			var e = e.originalEvent.changedTouches[0];
    			var endY = e.pageY,
    				endX = e.pageX;
    			if(startY - endY > 60 && startY - endY > Math.abs(startX - endX)){
    				this.entryTalk();
    			}
    			$(this.refs['zmiti-index-main-ui']).off('touchmove touchend');
    		});
    	});
    }

    entryTalk(){
    	let {obserable} = this.props;
    	clearInterval(this.t);
		obserable.trigger({
			type:'renderTalk'
		});
    }


	componentDidMount() {
		let {obserable} = this.props;
		var s = this;
		 this.swipe();
		
		this.fillDate();
	}
}
export default PubCom(ZmitiIndexApp);
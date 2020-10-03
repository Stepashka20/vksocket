import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import openSocket from 'socket.io-client';

import { FixedLayout } from '@vkontakte/vkui';
import coin_png from '../img/coinpic.png';
import './Persik.css';


class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  CLICKS: 0,
		};
	  }
	  
	render() {
	const socket = openSocket('https://185.255.133.199:9876');
	function sock1(){	
		console.log("CLICK")
		socket.emit('click');
	}
	
	socket.on('timer', click3 => {
		console.log("CLICKS = "+click3)
		this.setState({
			CLICKS: click3
		  });
	});
	const { id, go, fetchedUser} = this.props;
	return (
		
	<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group title="Navigation Example">
			<Div>
				{this.state.CLICKS}
			</Div>
			<Div>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
			<Div>
				<Button size="xl" level="2" onClick={sock1}>
					Клик
				</Button>
			</Div>
			<Div onClick={sock1}>Нажми сюда</Div>
			<FixedLayout vertical="bottom">
            <Div>
      		 <img src={coin_png} onClick={sock1} className='ClckBut' />
     		</Div>
            </FixedLayout>
		</Group>
	</Panel>
	)
	}
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;


import React, { Component } from 'react';
import Entry from '../components/Entry';
import Wrapper from "../components/Wrapper";
// import SideNav from '../components/SideNav';
// import './style.css';
import Modal from "../components/Modal"

import user from '../user.json';

class EntryPage extends Component {
    // Setting this.state.friends to the friends json array
    state = {

        user
    };

    render() {
        return (
            <Wrapper>
                {/* <Modal /> */}

                {/* {this.state.user.map((user) => user.journals[0].article.map((article) =>
					<SideNav
						id={article.article_id} title={article.title}
					/>)
				)
				} */}

                {/* <Entry /> */}
            </Wrapper>
        );
    }
}

export default EntryPage;
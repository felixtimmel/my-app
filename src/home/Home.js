import React from 'react'
import HomepageView from './HomeView'

export const clientId = '9ed79f4607364a54af932b81fa775a66';
export const redirectUri = 'http://localhost:3000/';

class Home extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <>
                <HomepageView />
            </>
        );
    }
}

export default Home
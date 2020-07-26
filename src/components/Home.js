import React, { useState } from 'react';
import { connect } from 'react-redux';

const Home = ({ activeUser }) => {
    console.log(activeUser);
    return (
        <div>
            
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return { activeUser: state.user.activeUser };
};
export default connect(mapStateToProps)(Home);
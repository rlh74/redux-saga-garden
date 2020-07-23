import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {
    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.props.dispatch({type: "FETCH_PLANT"})
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                <pre>{JSON.stringify(this.props.reduxState.plantList)}</pre>
                <ul>
                    {this.props.reduxState.plantList.map((plant, index)=>{
                        return <li key={index}>{plant.name}</li>
                    })}
                </ul>
                {/* <ul>
                    {this.props.reduxState.plantList.map((item, index)=>{
                        return <li key={index}>{item.name}
                        <button>Delete</button></li>})}
                </ul>   */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);

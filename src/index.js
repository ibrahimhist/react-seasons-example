import React from 'react';
import ReactDOM from 'react-dom';


import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };//this is state object 

    constructor(props) {
        super(props);//overide constuctor functions in Component class 
    }

    componentDidMount() {

        window.navigator.geolocation.getCurrentPosition(
            position => {
                //use setstate to update
                this.setState({ lat: position.coords.latitude });
            },
            err => {
                this.setState({ errorMessage: err.message });
            }
        );

        console.log('my component was rendered to the screen');
    }

    componentDidUpdate() {
        console.log('my component did rendered and updated!')
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>   Error: {this.state.errorMessage}  </div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>   <SeasonDisplay lat={this.state.lat} />  </div>
        }

        if (!this.state.errorMessage && !this.state.lat) {
            return <div>  <Spinner message="Please accept location request" /> </div>
        }
    }

    //React says we have to do define render
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )

    }
}
ReactDOM.render(<App />, document.querySelector('#root'));
import React, {Component, PropTypes} from 'react';
import Griddle from 'griddle-react';

class Map extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            'cities': []
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        let img = e.target,
            point = {
                x: e.offsetX,
                y: e.offsetY
            },
            latSize = img.height / 180,
            lonSize = img.width / 360,
            lat, lon,
            r = 1;

        if (!point.x) {
            point = {
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop
            };
        }

        lat = (point.y - (img.height / 2)) / -latSize;
        lon = (point.x - (img.width / 2)) / lonSize;

        console.log(lat, lon);
        var ws = `http://api.geonames.org/citiesJSON?formatted=true&north=${lat + r}&south=${lat - r}&east=${lon + r}&west=${lon - r}&lang=en&username=demo&style=full`;
        console.log(ws);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', ws);
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.setState({
                    cities: JSON.parse(xhr.responseText).geonames
                })
            } else {
                console.log('err');// ERROR
            }
            ;
        }
        xhr.send();

    }

    render() {
        return (
            <div className="map">
                <img className="map"
                     onClick={this.onClick}
                     src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Earthmap1000x500compac.jpg">
                </img>
                <Griddle results ={this.state.cities}/>
            </div>
        );
    }
}


// Map.defaultProps = {};
// Map.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default Map;

// import Map from './map';
// < GoogleMap />

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

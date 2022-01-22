import React, { Component } from 'react';
import ColorButton from '../button/button'
import {NavLink} from 'react-router-dom';


export default class Tabs extends Component {
  render() {
    return (<div>
        <div>
                <ColorButton color="inherit" component={NavLink} to={'/overview'}>Overview</ColorButton>
                <ColorButton color="inherit" component={NavLink} to={'/discussion'}>Discussion</ColorButton>

        </div>
    </div>);
  }
}

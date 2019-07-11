import React, { Component } from 'react'
import ReactJson from 'react-json-view'

class SimulatorContainer  extends Component {

    json = {
        "analyticsOnClickEvent" : "offers_find_store",
        "ctaUrl" : {
          "en" : "colorsnap://findastore",
          "es" : "colorsnap://findastore",
          "fr" : "colorsnap://findastore",
          "pt" : "colorsnap://findastore"
        },
        "tag" : 0,
        "title" : {
          "en" : "Find a Store",
          "es" : "es - Find a Store",
          "fr" : "fr - Find a Store",
          "pt" : "pt - Find a Store"
        },
        "type" : "ButtonModel"
      }

    render() {
        return (
            <div>
                <ReactJson src={this.json} />
                {this.props.children}
            </div>
        );
    }
}

export default SimulatorContainer;
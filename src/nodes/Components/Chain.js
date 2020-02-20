import React from "react";
import ReactDOM from "react-dom";
import Blockies from "react-blockies";

import { Input, FilledInput } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const INFURA_KEY = "32f4c2933abd4a74a383747ccf2d7003";

const availableChains = [
  { label: "Main Ethereum Chain", value: `https://mainnet.infura.io/v3/${INFURA_KEY}` },
  { label: "Ropsten Test Chain", value: `https://rinkeby.infura.io/v3/${INFURA_KEY}` },
  { label: "Kovan Test Chain", value: `https://kovan.infura.io/v3/${INFURA_KEY}` },
  { label: "Rinkeby Test Chain", value: `https://rinkeby.infura.io/v3/${INFURA_KEY}` },
  { label: "Goerli Test Chain", value: `https://goerli.infura.io/v3/${INFURA_KEY}` },
  { label: "xDai Chain", value: "https://dai.poa.network" },
  { label: "Test Chain", value: "https://rpc.eth.build:46234" },
  { label: "Sokol Test Chain (POA)", value: "https://sokol.poa.network" },
  { label: "Custom Chain", value: "CUSTOM" }
];

function Text() {
  this.addOutput("", "string");
  this.properties = {
    title: "Chain",
    selectedValue: availableChains[0].value,
    value: availableChains[0].value
  };
  this.size = [400, 100];
}

Text.title = "Chain";

Text.prototype.onConnectionsChange = function(args) {
  console.log("onConnectionsChange", args);
};

Text.prototype.onExecute = function() {
  this.setOutputData(0, this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value;
  }
  return this.properties.title;
};

Text.prototype.handle = function(e) {
  this.properties.selectedValue = e.target.value;
  if (this.properties.selectedValue === "CUSTOM") {
    this.properties.value = "https://rpc.eth.build:46234";
  } else {
    this.properties.value = e.target.value;
  }
  this.setOutputData(0, this.properties.value);
  this.onDrawBackground();
};

Text.prototype.handleCustom = function(e) {
  this.properties.value = e.target.value;
  this.properties.selectedValue = "CUSTOM";
  this.setOutputData(0, this.properties.value);
  this.onDrawBackground();
};

Text.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory(); ///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  } else {
    //console.log(this.properties);
    this.render(
      <div>
        <FormControl style={{ marginTop: 8, width: "100%", color: "#FFFFFF", fontSize: this.properties.fontSize }}>
          <Select
            id={"react-input-" + this.id}
            value={this.properties.selectedValue}
            onChange={Text.prototype.handle.bind(this)}
            style={{ textAlign: "left", width: "100%", color: "#FFFFFF", fontSize: this.properties.fontSize }}
          >
            {availableChains.map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          style={{ marginTop: 8, width: "100%", color: "#FFFFFF", fontSize: this.properties.fontSize }}
          id={"react-input-" + this.id}
          label="Name"
          placeholder={this.properties.placeholder}
          value={this.properties.value}
          onChange={Text.prototype.handleCustom.bind(this)}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
};

export default Text;

import React from "react";
import ProfileHover from "profile-hover";

function ThreeBoxProfile() {
  this.addInput("", 0);
  this.properties = { blockieSize: 50, placeholder: "", title: "Address" };
  this.size = [340, 80];
}

ThreeBoxProfile.title = "3Box Profile";

ThreeBoxProfile.prototype.getTitle = function() {
  if (this.flags.collapsed && this.value) {
    return this.value;
  }
  return "3Box Profile";
};

ThreeBoxProfile.prototype.onExecute = function() {
  let input = this.getInputData(0);
  if (this.inputs[0] && typeof input != "undefined" && this.value != input) {
    this.value = input;
  }
};

ThreeBoxProfile.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory(); ///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  } else if (this.value && typeof this.value.substr == "function") {
    this.render(
      <div style={{ marginTop: 10 }}>
        <ProfileHover address={this.value} showName={true} orientation="bottom" displayFull={true} />
      </div>
    );
  }
};

export default ThreeBoxProfile;

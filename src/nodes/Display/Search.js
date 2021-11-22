import React from "react";

function Search() {
  this.addInput("text", "string");
  this.addInput("search term", "string");
  this.addOutput("first occurence", "number");
  this.addOutput("last occurence", "number");

  this.properties = {
    title: "Search",
  };
}

Search.title = "Search";
Search.prototype.getTitle = function () {
  return this.properties.title;
};

Search.prototype.onExecute = function () {
  let text = this.getInputData(0);
  let search = this.getInputData(1);
  if (text && search) {
    this.firstOccurence = text.indexOf(search);
    this.secondOccurence = text.lastIndexOf(search);
  }
  try {
    this.setOutputData(0, this.firstOccurence);
    this.setOutputData(1, this.secondOccurence);
  } catch (e) {}
};

export default Search;

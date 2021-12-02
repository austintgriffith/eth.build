function Replace() {
  this.addInput("text", "string");
  this.addInput("search term", "string");
  this.addInput("replace with", "string");
  this.addOutput("text", "string");

  this.properties = {
    title: "Replace",
  };
}

Replace.title = "Replace";
Replace.prototype.getTitle = function () {
  return this.properties.title;
};

Replace.prototype.onExecute = function () {
  let text = this.getInputData(0);
  let search = this.getInputData(1);
  let replace = this.getInputData(2);
  if (text && search && replace) {
    this.newText = text.replace(search, replace);
  }
  try {
    this.setOutputData(0, this.newText);
  } catch (e) {}
};

export default Replace;

export default class Skill {
  constructor(name, selected) {
    this.name = name;
    this.selected = selected;
  }

  setSelected(selected) {
    this.selected = selected;
  }
}

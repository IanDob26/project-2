import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";
export class project2 extends DDDSuper(LitElement) {

  static get tag() {
    return "project-2";
  }

  constructor() {
    super();
    this.title = "";
    this.characterSettings = {
      seed: 1121111111,
    accessory: 1,
    base:1,
    face:1,
    faceitem: 3,
    hair: 1,
    pants:4,
    shirtskin: 4,
    hatColor: 1,
    }
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--project-2-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  <rpg-character
  seed="${this.characterSettings.seed}"
    accessory="${this.characterSettings.accessory}"
    base="${this.characterSettings.base}"
    face="${this.characterSettings.face}"
    faceitem="${this.characterSettings.faceitem}"
    hair="${this.characterSettings.hair}"
    pants="${this.characterSettings.pants}"
    shirtskin="${this.characterSettings.shirtskin}"
    hatColor="${this.characterSettings.hatColor}">
  </rpg-character> 
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(project2.tag, project2);
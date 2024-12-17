import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";

import "wired-elements";


export class project2 extends DDDSuper(LitElement) {


  static get tag() {
    return "project-2";
  }


  constructor() {
    super();
    this.title = "";
    this.characterSettings = {
    seed: "11211522",
    accessory: 0,
    base:0,
    face:0,
    faceitem: 0,
    hair: 0,
    pants:0,
    shirtskin: 0,
    hatColor: 0,
    fire: false,
    };
    this.updateSeed();
  }


  static get properties() {
    return {
      title: { type: String },
      accessories: { type: String, reflect: true }, //syncs property and attribute
      base: { type: String, reflect: true },
      leg: { type: String, reflect: true },
      face: { type: String, reflect: true },
      faceItem: { type: String, reflect: true },
      hair: { type: String, reflect: true },
      pants: { type: String, reflect: true },
      shirt: { type: String, reflect: true },
      skin: { type: String, reflect: true },
      hatColor: { type: String, reflect: true },
      hat: { type: String, reflect: true },
      
      characterSettings: { type: Object },
    };
  }


  async  copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
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
     
      .container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
      #controls {
          display: grid;
          justify-content: center;
          margin: var(--ddd-spacing-5);
        }
      button  {
          background-color: var(--ddd-theme-default-creekTeal);
          font-size: 24px;
          padding: var(--ddd-spacing-4);
          margin-left: var(--ddd-spacing-2);
        }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }


 
  render() {
    return html`
<div class="container">
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
    ?fire="${this.characterSettings.fire}"
  </rpg-character>
  <div id =controls>
 
      <input id="input" placeholder="Accessories: 0 - 9" />
      <input id="input" placeholder="base: 1 or 5 (Male 0-4, Female 5-9)" />
      <input id="input" placeholder="face: 0 -5" />
      <input id="input" placeholder="faceitem: 0 - 9" />
      <input id="input" placeholder="hair: 0 - 9" />
      <input id="input" placeholder="pants: 0 - 9" />
      <input id="input" placeholder="shirt: 0 -9" />
      <input id="input" placeholder="skin: 0-9" />
      <input id="input" placeholder="hatcolor: 0-9" />
      
      
         
      <div>
      <input type="checkbox"  id = fire name ="fire"/>
      <label>On Fire?</label>
      </div>
      <div>
      <input type="checkbox"  id = walking name ="walking"/>
      <label>Walking?</label>
      </div>


 <button  @click="${this.clipboardcopy}">Share Link</button>
  </div>
</div>`;
  }

  updateSeed() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
  
    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;
  
    this.requestUpdate(); // Ensure UI updates after applying settings
  }

  
  clipboardcopy(){
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({ seed: this.characterSettings.seed }).toString();
    const share = `${baseUrl}?${params}`;
    navigator.clipboard.writeText(share).then(
      () => this._showNotification("copied")
    );
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


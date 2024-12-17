import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }
//sets up the objects
  constructor() {
    super();
    this.character = {
      seed: "0000000000",
      accessories: 1,
      base: 4,
      leg: 5,
      face: 0,
      faceItem: 6,
      hair: 7,
      pants: 4,
      shirt: 3,
      skin: 2,
      hatColor: 1,
      hat: "none",
      fire: false,
      walking: false,
      circle: false,
    };
    this.updateSeed(); //when an variable is changed the seed is updated to reflect this. Ex: If skin is 5 then the skin section in the seed will be 5
  }
//gets the properties
  static get properties() {
    return {
      ...super.properties,
      character: { type: Object },
    };
  }
//sets up the css
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .container {
          display: flex;
          gap: var(--ddd-spacing-5);
          justify-content: center;
          align-items: start;
          padding: var(--ddd-spacing-5);
        }
        .character-preview {
          flex: 1;
          min-width: 300px;
          text-align: center;
          position: relative;
          width: 50%;
        }
        /* sets up the character preview*/
        .character-preview rpg-character {
          width: 50%;
          transition: height 0.3s ease, width 0.3s ease;
        }
               /* sets up the controls on the left side with the buttons, checkboxes, and sliders*/
        .controls {
          width: 50%;
          margin-top: var(--ddd-spacing-18);
          text-align: left;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-5);
          background-color: gray;
          border-radius: var(--ddd-spacing-1);
          padding: var(--ddd-spacing-5);
        }
        wired-input,
        wired-checkbox,
        wired-slider,
        .genderButtons {
          display: flex;
          margin-bottom: var(--ddd-spacing-4);
          height: 40px;
          max-width: 300px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: var(--ddd-spacing-1);
        }
        button {
          background-color: var(--ddd-theme-default-creekTeal);
          font-size: 24px;
          padding: var(--ddd-spacing-4);
          margin-left: var(--ddd-spacing-2);
        }
      `,
    ];
  }
//sets up html
  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <rpg-character
            accessories="${this.character.accessories}"
            base="${this.character.base}"
            face="${this.character.face}"
            faceItem="${this.character.faceItem}"
            hair="${this.character.hair}"
            pants="${this.character.pants}"
            shirt="${this.character.shirt}"
            skin="${this.character.skin}"
            hatColor="${this.character.hatColor}"
            .fire="${this.character.fire}"
            .walking="${this.character.walking}"
          ></rpg-character>
        </div>
        <div class="controls">
          <!-- Sets up the left side controls mostly copy paste of each other once a slider/button works -->
          <div class="leftSideControls">
            <label for="genderButtons">Gender:</label>
            <div id="genderButtons">
              <button @click="${(e) => this.switchGender(e)}" id="maleButton" >Male</button>
              <button @click="${(e) => this.switchGender(e)}" id="femaleButton" >Female</button>
            </div>

            <label for="accessories">Accessories:</label>
            <wired-slider
              id="accessories"
              value="${this.character.accessories}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("accessories", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="face">Face:</label>
            <wired-slider
              id="face"
              value="${this.character.face}"
              min="0"
              max="5"
              @change="${(e) =>
                this.updateCharacter("face", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="faceItem">Face Item:</label>
            <wired-slider
              id="faceItem"
              value="${this.character.faceItem}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("faceItem", parseInt(e.detail.value))}"
            ></wired-slider>

           
            <div ?checked="${this.character.fire}"
            @change="${(e) => this.updateCharacter("fire", e.target.checked)}">
      <input type="checkbox"  id = fire name ="fire"/>
      <label>On Fire?</label>
      </div>

          </div>
          <!-- Sets up the left side controls mostly copy paste of each other once a slider/button/checkbox works -->
          <div class="rightSideControls">
            <label for="hair">Hair Style:</label>
            <wired-slider
              id="hair"
              value="${this.character.hair}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("hair", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="pants">Pants Style:</label>
            <wired-slider
              id="pants"
              value="${this.character.pants}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("pants", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="shirt">Shirt Style:</label>
            <wired-slider
              id="shirt"
              value="${this.character.shirt}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("shirt", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="skin">Skin Tone:</label>
            <wired-slider
              id="skin"
              value="${this.character.skin}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("skin", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="hatColor">Hat Color:</label>
            <wired-slider
              id="hatColor"
              value="${this.character.hatColor}"
              min="0"
              max="9"
              @change="${(e) =>
                this.updateCharacter("hatColor", parseInt(e.detail.value))}"
            ></wired-slider>

            
            <div ?checked="${this.character.walking}"
              @change="${(e) =>
                this.updateCharacter("walking", e.target.checked)}">
      <input type="checkbox"  id = walking name ="walking"/>
      <label>Walking?</label>
      </div>

          </div>
          <button @click="${this.clipboardcopy}">Share</button>
        </div>
      </div>

    `;
  }
//updates the seed so when copied it pastes the seed correctly
  updateSeed() {
    const seed = this.character.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
    [
      this.character.accessories,
      this.character.base,
      this.character.face,
      this.character.faceItem,
      this.character.hair,
      this.character.pants,
      this.character.shirt,
      this.character.hatColor,
    ] = values;

    this.requestUpdate(); 
  }

  switchGender(e) {
    const maleButton = this.shadowRoot.getElementById("maleButton");
    const femaleButton = this.shadowRoot.getElementById("femaleButton");

    if (e.target.id === "maleButton") {
      maleButton.elevation = 3;
      femaleButton.elevation = 1;
      this.character.base = 0;
    } else {
      maleButton.elevation = 1;
      femaleButton.elevation = 3;
      this.character.base = 1;
    }
    this.requestUpdate();
  }
  makeSeed() {
    const {
      accessories,
      base,
      leg,
      face,
      faceItem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,
    } = this.character;
    this.character.seed = `${accessories}${base}${leg}${face}${faceItem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  updateCharacter(key, value) {
    this.character = { ...this.character, [key]: value };
    this.makeSeed();
    this.requestUpdate();
  }

  clipboardcopy() {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({seed: this.character.seed,}).toString();
    const share = `${baseUrl}?${params}`;
    navigator.clipboard.writeText(share);
  }


  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    if (params.has("seed")) {
      this.character.seed = params.get("seed");
      this.updateSeed(); // updates the seed with the additions
    }

    this.requestUpdate();
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);

import { EventRef, Plugin } from "obsidian";
import { lineNumbersRelative } from "./extension";
import { Extension } from "@codemirror/state";

const SHOW_LINE_NUMBER_KEY = "showLineNumber";

interface VaultConfig {
  getConfig(key: typeof SHOW_LINE_NUMBER_KEY): boolean;
  on(name: "config-changed", callback: () => void, ctx?: unknown): EventRef;
}

export default class RelativeLineNumbers extends Plugin {
  private editorExtension: Extension[] = [];
  enabled = false;

  private get vaultConfig(): VaultConfig {
    return this.app.vault as unknown as VaultConfig;
  }

  onload(): void {
    this.registerEditorExtension(this.editorExtension);
    const showLineNumber = this.vaultConfig.getConfig(SHOW_LINE_NUMBER_KEY);
    if (showLineNumber) {
      this.enable();
    }

    this.setupConfigChangeListener();
    this.addCommand({
      id: "toggle-relative-line-numbers",
      name: "Toggle relative numbering",
      callback: () => {
        if (showLineNumber) {
          if (this.enabled) {
            this.disable();
          } else {
            this.enable();
          }
        }
      },
    });
  }

  onunload(): void {
    this.disable();
  }

  enable(): void {
    this.enabled = true;
    this.editorExtension.length = 0;
    this.editorExtension.push(lineNumbersRelative());
    this.app.workspace.updateOptions();
  }

  disable(): void {
    this.enabled = false;
    this.editorExtension.length = 0;
    this.app.workspace.updateOptions();
  }

  private setupConfigChangeListener(): void {
    this.registerEvent(
      this.vaultConfig.on(
        "config-changed",
        () => {
          const showLineNumber = this.vaultConfig.getConfig(SHOW_LINE_NUMBER_KEY);
          if (showLineNumber && !this.enabled) {
            this.enable();
          } else if (!showLineNumber && this.enabled) {
            this.disable();
          }
        },
        this
      )
    );
  }
}

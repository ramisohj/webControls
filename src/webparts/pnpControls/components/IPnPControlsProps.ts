import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPControlsProps {
  context: WebPartContext;
  description: string;
}

export interface IPnpControlsState {
  webParts: any[];
  components: any[];
  urlPage: string;
  titlePage: string;
  idera: boolean;
  siteHome: string;
}


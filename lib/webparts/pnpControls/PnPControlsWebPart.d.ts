import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IPnPControlsWebPartProps {
    description: string;
}
export default class PnPControlsWebPart extends BaseClientSideWebPart<IPnPControlsWebPartProps> {
    render(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}

/// <reference types="react" />
import * as React from 'react';
import { IPnPControlsProps, IPnpControlsState } from './IPnPControlsProps';
export default class PnPControls extends React.Component<IPnPControlsProps, IPnpControlsState> {
    /**
     * Constructor
     * @param props
     */
    constructor(props: IPnPControlsProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * main method
     */
    private _main();
    /**
     * get full url page
     */
    private _getLinkPage();
    /**
     * get title page
     */
    private _getTitlePage();
    /**
     * getting the 'idera' parameter from the url link 'http://ws19-sp19-sql17:1000/sites/modern/SitePages/Home.aspx?idera=true'
     * if idera=true then show the list
     * if idera=false  show nothing.
     */
    private _idera();
    /**
     * method in order to search all the controllers in the page, saving them one by one.
     * so far there are two types of components saved (webparts and webcomponents)
     */
    private _deepControlSearch();
    /**
     * method in order to show all the controllers founded in the page.{webparts and webcomponents}
     */
    loadingControllers(): JSX.Element;
    /**
     * React render method
     */
    render(): React.ReactElement<IPnPControlsProps>;
}

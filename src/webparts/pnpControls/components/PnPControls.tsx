import * as React from 'react';
import { IPnPControlsProps, IPnpControlsState } from './IPnPControlsProps';
import { SPHttpClient } from '@microsoft/sp-http';

import { ClientSideWebpart } from "@pnp/sp";
import { 
  sp,
  ClientSidePage,
} from "@pnp/sp";

export default class PnPControls extends React.Component<IPnPControlsProps, IPnpControlsState> {

  /**
   * Constructor
   * @param props
   */
  constructor(props: IPnPControlsProps) {
    super(props);

    this.state = {
      webParts: [], //WebPart List
      components: [], //Component List
      urlPage: this._getLinkPage(),  //  --> "http://ws19-sp19-sql17:1000/sites/modern/SitePages/Home.aspx"
      titlePage: this._getTitlePage(), // --> "modern"
      idera: false, 
      siteHome: '/sites/'+this._getTitlePage()+'/SitePages/Home.aspx' // --> "/sites/modern/SitePages/Home.aspx"
    }
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount() {
      this._main();
  }
   
  /**
   * main method
   */
  private async _main(){
    await this._deepControlSearch();
    await this._idera();
  }

  /**
   * get full url page
   */
  private _getLinkPage(){
    let linkPage = this.props.context.pageContext.web.absoluteUrl;
    return linkPage+'/SitePages/Home.aspx';
  }

  /**
   * get title page
   */
  private  _getTitlePage(){
    return this.props.context.pageContext.web.title;
  }
  
  /**
   * getting the 'idera' parameter from the url link 'http://ws19-sp19-sql17:1000/sites/modern/SitePages/Home.aspx?idera=true'
   * if idera=true then show the list 
   * if idera=false  show nothing.
   */
  private _idera(){
    var completeURL = new URLSearchParams(location.search);
    let hasIdera = completeURL.has('idera');
    if (hasIdera){
      let valueIdera = completeURL.get('idera');
      if(valueIdera === 'true'){
        this.setState({
          idera: true
        });
      }
    }
  }

  /**
   * method in order to search all the controllers in the page, saving them one by one.
   * so far there are two types of components saved (webparts and webcomponents)
   */
  private async _deepControlSearch(){   

    const file = sp.web.getFileByServerRelativePath(this.state.siteHome); //ASPX FILE
    const page = await ClientSidePage.fromFile(file); //CLIENT SIDE PAGE
    let partDefs = await sp.web.getClientSideWebParts();//CLIENT SIDE PAGE COMPONENT []  

    page.sections.forEach(section => {//SECTIONS
      let canvasColumn = section.columns;//COLUMNS
      canvasColumn.forEach(column => {
        let controls = column.controls;//CONTROLS        
        controls.forEach(control => {      
          let webPart = control as ClientSideWebpart;//EACH  CONTROL IS A WEB-PART 
          this.setState({ 
            webParts: [...this.state.webParts, webPart] 
          });
        });
       });
    });

    partDefs.forEach(webPart => {//Searching component by component
      this.setState({
        components: [...this.state.components, webPart]
      });
    });
  }  

  /**
   * method in order to show all the controllers founded in the page.{webparts and webcomponents}
   */
  public loadingControllers(){
    const webParts = this.state.webParts.map(wp => 
      <div key={wp.id}> 
        <h3> {wp.title} </h3> 
        <p> WebPartID: {wp.webPartId} </p>
        <p> Description: {wp.description} </p>
      </div>
    );

    const components = this.state.components.map(cp =>
      <div key={cp.id}> 
        <h3> {cp.Name} </h3> 
        <p> Id: {cp.Id} </p>
        <p> Status: {cp.Status} </p>
      </div> 
    );

    if(this.state.idera){
      return (
        <div>
          <h2> WEB PARTS </h2>
            <h3>number # {webParts.length} [webParts]</h3>
            {webParts}
          <h2> COMPONENTS </h2>
            <h3>number # {components.length} [components]</h3>
            {components}
        </div>
      )
    }
  }

  /**
   * React render method
   */
  public render(): React.ReactElement<IPnPControlsProps> {
    return(
      <div>
        <h2>TITLE: {this.state.titlePage}</h2>
        <h2>URL : {this.state.urlPage}</h2>
        { this.loadingControllers() }
      </div>
    );
  }
}

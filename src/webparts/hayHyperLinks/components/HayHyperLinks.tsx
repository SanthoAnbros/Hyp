import * as React from 'react';
import styles from './HayHyperLinks.module.scss';
import { IHayHyperLinksProps, SiteLink, IHayHyperLinksState } from './IHayHyperLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import './custom.css'
import * as pnp from 'sp-pnp-js';
import { Web, PermissionKind } from 'sp-pnp-js';

export default class HayHyperLinks extends React.Component<SiteLink, IHayHyperLinksState> {
  
  constructor(props:SiteLink, state:IHayHyperLinksState){
    super(props);

    this.state = {
      SiteLinks:[
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:false},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:true},
        // {url:"https://acnltd.sharepoint.com/sites/IntranetUAT/", hasAccess:true}
      ]
    }
  }

  getSiteLinks = () => {
    let lst : SiteLink[];
    pnp.sp.web.lists.getByTitle('SiteLinks').items.get().then((items)=>{
      items.map((item)=>{
        //CheckWhetherUserHasPermission = (weburl) : boolean => {
          const web = new Web(item.Title);
            web.getCurrentUserEffectivePermissions().then(perms => { //WINDOWS POPUP HERE//
                 if (web.hasPermissions(perms, PermissionKind.AddListItems)
                     && web.hasPermissions(perms, PermissionKind.EditListItems)) {
                     let Accessible = {url:item.Title, hasAccess:true}
                     this.setState({
                      SiteLinks : [...this.state.SiteLinks, Accessible]
                    })
                 }
            });
      });
    }).catch((ex)=>{
        console.log(ex);
    });
  }

  componentWillMount(){
    debugger;
    this.getSiteLinks();
  }

  
  


  public render(): React.ReactElement<IHayHyperLinksProps> {

    
    const SetofHyperLinks = this.state.SiteLinks.map((Site):JSX.Element=>{
      if(Site){
        if(Site.hasAccess){
              return(
                <a className="col-md-3 box" target="_blank" href={Site.url}>
                  <div className="Title">{Site.url} : {String(Site.hasAccess)}</div>
                </a>
          )
        }
      }
    });

    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');

    return (
      <div className="container">
        <div className="row">
            {SetofHyperLinks}
        </div>
      </div>
    );
  }
}

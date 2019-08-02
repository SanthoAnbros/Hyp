export interface IHayHyperLinksProps {
  description ?: string;
}

export interface SiteLink{
  url : string;
  hasAccess : boolean;
}

export interface IHayHyperLinksState{
  SiteLinks : SiteLink[];
}

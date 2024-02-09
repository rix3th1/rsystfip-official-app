export interface IResourceBase {
  id: string;
}

export interface IResourceCategory extends IResourceBase {
  category_name: string;
}

export interface IResourceFacultie extends IResourceBase {
  faculty_name: string;
}

export interface IResourceDocument extends IResourceBase {
  document_name: string;
  document_description: string;
}

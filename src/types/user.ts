export interface User {
  issuer:          string;
  inResponseTo:    string;
  sessionIndex:    string;
  nameID:          string;
  nameIDFormat:    string;
  spNameQualifier: string;
  uCorreo:         string;
  uNombre:         string;
  uDependencia:    string;
  uCuenta:         string;
  uTipo:           string;
  cn:              string;
  sn:              string;
  displayName:     string;
  TipoCuenta:      string;
  UO:              string;
  ImmutableID:     string;
  attributes:      Attributes;
}

export interface Attributes {
  uCorreo:      string;
  uNombre:      string;
  uDependencia: string;
  uCuenta:      string;
  uTipo:        string;
  cn:           string;
  sn:           string;
  displayName:  string;
  TipoCuenta:   string;
  UO:           string;
  ImmutableID:  string;
}

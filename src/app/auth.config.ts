import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/snacks',
  loginUrl: 'http://localhost:8080/auth/realms/snacks/protocol/openid-connect/auth',
  logoutUrl: 'http://localhost:8080/auth/realms/snacks/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:8080/realms/snacks/protocol/openid-connect/token',
  sessionCheckIFrameUrl: 'http://localhost:8080/realms/snacks/protocol/openid-connect/login-status-iframe.html',
  userinfoEndpoint: 'http://localhost:8080/realms/snacks/protocol/openid-connect/userinfo',
  clientId: 'snacks-client',
  redirectUri: window.location.origin + '/index.html',
  responseType: 'code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'profile email',
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
};

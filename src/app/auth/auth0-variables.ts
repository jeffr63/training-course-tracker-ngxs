interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'fB0JH6qD2rXu8nsF4BaBQl4B277HUtAe',
  domain: 'jeffr63.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};

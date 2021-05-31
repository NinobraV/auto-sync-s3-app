export const SESSION_CONFIG = {
  key: 'koa.sess', 
  maxAge: 86400000,
  autoCommit: true, 
  overwrite: true, 
  httpOnly: true, 
  signed: true,
  rolling: false, 
  renew: false, 
  secure: false, 
}